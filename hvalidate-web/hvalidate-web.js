/**
 * [hvalidate 表单控件验证以及显示提示]
 * @Author   mayingwu
 * @Email    516378746@qq.com
 * @DateTime 2017-12-05
 * @return   void
 * @version  []
 * @param    {[数组对象]}         options [需要验证的控件 规则]
 * @param    {[type]}             parent  [某一个 div 容器]
 * 备注 ： 
 * 		1. options eg:
 * 			[
 * 				{
 * 					isUse : true/false,							// 是否继续使用提示信息而不删除
 * 					ele : "#element",							// 被验证的控件ID
 * 					trigger : "blur/change/...",				// 触发验证的方法
 * 					rules : {									// 规则JSON对象
 * 						required : true,						// 必填
 * 						email : true,							// 邮箱
 * 						phone : true,							// 验证手机号
 * 						IDNum : true, 							// 验证身份证号
 * 						noLegal : true,							// 非法字符
 * 						serverKey : true,						// 服务器关键字
 * 						htmlTag : true, 						// HTML标签
 * 						number : true,							// 正整数以及保留一位或者两位的小数
 * 						int : true,								// 正整数
 * 						validate : [fn1, fn2, ...]				// 自定义验证方法
 * 					},
 * 					messages : {
 * 						required : true,						// 必填 -> 信息提示
 * 						email : true,							// 邮箱 -> 信息提示
 * 						phone : true,							// 验证手机号 -> 信息提示
 * 						IDNum : true, 							// 验证身份证号 -> 信息提示
 * 						noLegal : true,							// 非法字符 -> 信息提示
 * 						serverKey : true,						// 服务器关键字 -> 信息提示
 * 						htmlTag : true, 						// HTML标签 -> 信息提示
 * 						number : true,							// 正整数以及保留一位或者两位的小数 -> 信息提示
 * 						int : true,								// 正整数 -> 信息提示
 * 						validate : ["msg1", "msg2", ...]		// 自定义验证方法 -> 信息提示
 * 					}
 * 				}
 * 			]
 *
 * 			注意：rules 中 validate 数组中的每一项都需要和 messages 数据中的每一项对应上
 * 			
 *    	2. parent eg: "#container"
 *    	
 *    	3. 对外公共方法
 *    	
 *    		3.1  $.fn.hvalidate.setMsg  => 动态设置提示内容
 *    		3.2  $.fn.hvalidate.remove  => 动态移除提示信息
 *    		3.3  $.fn.hvalidate.run     => 动态验证所有控件
 * 
 * 		4. 依赖 jQuery 基础插件
 * 		5. 验证提示信息样式依赖 bootstrap.css 基础样式表
 * 	
 */

(function($){

	var defaults = []

	var eventQueue = [];

	var validra = [];
	
	$.fn.extend({

		hvalidate : function( options, parent ){

			var opts = $.extend( [], defaults, options );

			opts = attrRequired( opts, parent );

			if( !isValid(opts) ) return this;

			for( var i=0; i < opts.length; i++ ){

				(function(i){
					
					//$(opts[i].ele).unbind([opts[i].trigger]);

					$(opts[i].ele)[opts[i].trigger](function(){
						
						var r = valid( opts[i] );

						validra.push( !r ? 0 : 1 );

					})

					eventQueue.push( opts[i] )

				})(i);

			}

		}

	})

	//---------------------------公共方法，用户可以通过覆盖该方法达到不同的效果------------------------------
	/**
	 * 用户自定义信息提示内容
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-11
	 * @version  [version]
	 * @param    {[type]}         attr [description]
	 * @param    {[type]}         msg  [description]
	 * @param    {[type]}         type  ["warning" \ "error"  default "error"]
	 */
	$.fn.hvalidate.setMsg = function(attr, msg, type){

		if( $("#" + attr + "-error").length == 0 && $("#" + attr + "-warning").length == 0 ){

			var type = getType({
				type : type || ""
			})
	
			var oLabel = $('<label id="'+ attr +'-' + type + '" class="' + type + '" for="'+ attr +'">'+ msg +'</label>')
	
			$("#" + attr).addClass( type ).after( oLabel );

		}else{

			$("#" + attr + "-error").html(msg);

			$("#" + attr + "-warning").html(msg);

		}

	}
	/**
	 * 用户手动移除信息提示内容
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-11
	 * @version  [version]
	 * @param    {[type]}         attr [description]
	 * @return   {[type]}              [description]
	 */
	$.fn.hvalidate.remove = function(attr){

		$("#" + attr + "-error").prev().removeClass("error").end().remove();
		$("#" + attr + "-warning").prev().removeClass("warning").end().remove();

	}
	/**
	 * 用户手动触发所有验证
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-11
	 * @version  [version]
	 * @param    {[type]}         parent [description]
	 * @return   {[type]}                [description]
	 */
	$.fn.hvalidate.run = function( parent ){

		validra.length = 0;

		$(parent).find("input").trigger("blur");

		$(parent).find("textarea").trigger("blur");

		$(parent).find("select").trigger("change");

		$(parent).find("input[type=checkbox]").trigger("change");

		$(parent).find("input[type=radio]").trigger("change");

		for( var j = 0; j < validra.length; j++ ){

			if( !validra[j] ){

				return false

			}

		}

		return true

	}
	/**
	 * 验证控件方法集合
	 * 
	 * @type {Object}
	 */
	$.fn.hvalidate.hfn = {
		/**
		 * 验证 email
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-11
		 * @version  [version]
		 * @param    {[type]}         obj [description]
		 * @return   {[type]}             [description]
		 */
		email : function( obj ){

			var str = $( obj ).val();

			var reg = /^(\w-*.*)+@(\w-?)+(.\w{2,})+$/;

			return reg.test( str );

		},
		/**
		 * 验证 必填
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-11
		 * @version  [version]
		 * @param    {[type]}         obj [description]
		 * @return   {[type]}             [description]
		 */
		required : function( obj ){

			if( $( obj ).prop("value") != undefined ){

				var str = $( obj ).val();

				if( $( obj )[0].tagName == "SELECT" &&  $.trim(str) == 0 ){

					return false

				}else if( $.trim(str).length == 0 ){

					return false;

				}

				return true;
				
			}else{

				var inputArr = $( obj ).find("input");

				var r = false;

				inputArr.each(function(index, ele){

					if( $(ele).prop("checked") ){

						r = true;

						return false

					}

				})

				return r;

			}

		},
		/**
		 * 验证 手机号
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-11
		 * @version  [version]
		 * @param    {[type]}         obj [description]
		 * @return   {[type]}             [description]
		 */
		phone : function( obj ){

			var str = $( obj ).val();

			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

			return reg.test( str );

		},
		/**
		 * 验证 身份证号
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-11
		 * @version  [version]
		 * @param    {[type]}         obj [description]
		 */
		IDNum : function( obj ){

			var str = $( obj ).val();

			var reg15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;

			var reg18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

			return ( reg15.test( str ) || reg18.test( str ) );

		},
		/**
		 * 验证 非法字符
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-11
		 * @version  [version]
		 * @param    {[type]}         obj [description]
		 * @return   {[type]}             [description]
		 */
		noLegal : function( obj ){

			var str = $( obj ).val();

			var reg = /[`~!！@#$%^&*()_+<>?:"{},.\/;'[\]]/im;

			return !reg.test( str )

		},
		/**
		 * 验证 服务器关键字
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-11
		 * @version  [version]
		 * @param    {[type]}         obj [description]
		 * @return   {[type]}             [description]
		 */
		serverKey : function( obj ){

			var arr = ["insert", "delete", "update", "script"];

			var str = $( obj ).val();

			for( var i = 0; i < arr.length; i++ ){

				if( str.indexOf( arr[i] ) > -1 ){

					return false

				}

			}

			return true;

		},
		/**
		 * 验证 html标签
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-11
		 * @version  [version]
		 * @param    {[type]}         obj [description]
		 * @return   {[type]}             [description]
		 */
		htmlTag : function( obj ){

			var str = $( obj ).val();

			var reg = /<[^>]*>/ig;

			return !reg.test( str )

		},
		/**
		 * 验证 正整数以及保留一位或者两位的小数
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-13
		 * @version  [version]
		 * @param    {[type]}         obj [description]
		 * @return   {[type]}             [description]
		 */
		number : function( obj ){

			var str = $( obj ).val();

			var reg = /^\d+(\.\d{1,2})?$/g;

			return reg.test( str )

		},
		/**
		 * 验证 正整数
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-13
		 * @version  [version]
		 * @param    {[type]}         obj [description]
		 * @return   {[type]}             [description]
		 */
		positiveInt : function( obj ){

			var str = $( obj ).val();

			var reg = /^[1-9]\d*$/g

			return reg.test( str )

		},
		/**
		 * 验证 浮点数
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-26
		 * @version  [version]
		 * @param    {[type]}         obj [description]
		 * @return   {[type]}             [description]
		 */
		float : function(obj){

			var str = $( obj ).val();

			var reg = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/g;

			return reg.test( str )

		},
		/**
		 * 验证 整数
		 * 
		 * @Author   mayingwu
		 * @Email    516378746@qq.com
		 * @DateTime 2018-02-26
		 * @version  [version]
		 * @return   {[type]}         [description]
		 */
		int : function(obj){

			var str = $( obj ).val();

			var reg = /^(\-|\+)?\d+$/g;

			return reg.test( str )

		}
		
	}

/*** ------------------------------------------------------------- ***/
	/**
	 * 创建提示信息
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-11
	 * @version  [version]
	 * @param    {[type]}         json [description]
	 * @param    {[type]}         attr [description]
	 * @param    {[type]}         i    [description]
	 * @return   {[type]}              [description]
	 */
	function create(json, attr, i){

		var idfor = json.ele.substring(1);

		var type = getType( json );

		if( !json.isUse ){

			remove(json, attr);

		}

		if( attr == "validate" ){

			var msg = json.messages[attr] == undefined ? "" : json.messages[attr][i];

		}else{

			var msg = json.messages[attr] == undefined ? "" : json.messages[attr];

		}		

		if( $("#" + idfor + "-" + type).length ){

			$("#" + idfor + "-" + type).html( msg );

			return ;

		}

		var oLabel = $('<label id="'+ idfor +'-' + type + '" class="' + type + '" for="'+ idfor +'">'+ msg +'</label>')

		$(json.ele).addClass( type ).after( oLabel );

	}
	/**
	 * 移除提示信息
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-11
	 * @version  [version]
	 * @param    {[type]}         json [description]
	 * @param    {[type]}         attr [description]
	 * @return   {[type]}              [description]
	 */
	function remove( json, attr ){

		var idfor = json.ele.substring(1);

		var type = getType( json );

		if( !json.isUse ){

			$(json.ele).removeClass( type ).siblings( "#" + idfor + "-" + type ).remove();

		}

	}
	/**
	 * 提示信息类型
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-11
	 * @version  [version]
	 * @param    {[type]}         json [description]
	 * @return   {[type]}              [description]
	 */
	function getType(json){

		return json.type == "warning" ? "warning" : "error";

	}
	/**
	 * 验证传入的对象参数是否符合要求
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-11
	 * @version  [version]
	 * @param    {[type]}         options [description]
	 * @return   {Boolean}                [description]
	 */
	function isValid( options ){

		if( options.length == 1 && options[0].ele == "" && $.isEmptyObject( options[0].rules ) && $.isEmptyObject( options[0].messages ) ){

			console.warn("没有需要验证的控件")

			return false;

		}

		for( var i =0; i < options.length; i++ ){

			if( options[i].ele == "" ){

				console.error("请填写需要验证jQuery DOM对象")

				return false
			}

			if( $.isEmptyObject( options[i].rules ) ){

				console.error("请填写需要进行验证的规则")

				return false

			}

			if( $.isEmptyObject( options[i].messages ) ){

				console.error("请填写需要进行显示的提示信息")

				return false

			}

		}

		return true

	}

	/**
	 * 验证方法
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-11
	 * @version  [version]
	 * @param    {[type]}         json [description]
	 * @return   {[type]}              [description]
	 */
	function valid(json){

		for( var attr in json.rules ){

			if( attr != "validate" ){

				var r = $.fn.hvalidate.hfn[attr]( json.ele );
				
				callback( r );

				if( !r ) return r;

			}

			// 用户自定义验证方法调用
			if( attr == "validate" && !(json.rules[attr] instanceof Array) ){

				console.error("自定义验证方法值类型必须为Array");

				return false;

			}

			if( attr == "validate" && json.rules[attr] instanceof Array ){

				var fnArr = json.rules[attr];

				for( var i=0; i<fnArr.length; i++ ){

					var r = fnArr[i](json);

					callback( r, i );

					if( !r ) return r;

				}

			}

		}

		function callback(r, i){

			if( r ){

				remove( json, attr )

			}else{

				create( json, attr, i );

			}

		}

		return true

	}
	/**
	 * required 属性验证
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-11
	 * @version  [version]
	 * @param    {[type]}         options [description]
	 * @param    {[type]}         parent  [description]
	 * @return   {[type]}                 [description]
	 */
	function attrRequired( options, parent ){

		var totalEle = $(parent).find("*");

		var requiredEleArr = [];

		var realCheckEleArr = [];

		var newOpts = {};

		var r = 1;

		// 获取 body 下边所有自定义属性为 required 的元素
		for( var i = 0; i < totalEle.length; i++ ){
				
			if( $(totalEle[i]).attr("required") ){

				requiredEleArr.push( $(totalEle[i]) )

			}

		}

		for( var j = 0; j < requiredEleArr.length; j++ ){

			// 包含 required 自定义属性的元素标签名称不是 input / select / textarea
			if( !requiredEleArr[j].is("input") && !requiredEleArr[j].is("select") && !requiredEleArr[j].is("textarea") && requiredEleArr[j].find("input[type=checkbox]").length == 0 && requiredEleArr[j].find("input[type=radio]").length == 0 ){

				r = 0

			}else{

				r = 1;

				realCheckEleArr.push({

					ele : "#" + requiredEleArr[j].prop("id"),

					trigger : ( requiredEleArr[j].is("select") || requiredEleArr[j].find("input").prop("type") == "checkbox" || requiredEleArr[j].find("input").prop("type") == "radio" ) ? "change" : "blur",

					rules : {

						required : true,

					},
					messages : {

						required : "这是一个必填项"

					}

				});

			};

		}

		
		for( var g = 0; g < realCheckEleArr.length; g++  ){

			var keyr = false;

			for( var gg = 0; gg < options.length; gg++ ){

				if( realCheckEleArr[g].ele == options[gg].ele ){

					keyr = true;

					if( !options[gg].trigger ){

						options[gg].trigger = realCheckEleArr[g].trigger;

					}

					if( !options[gg].rules ){

						options[gg].rules = realCheckEleArr[g].rules;

					}else{
						
						options[gg].rules = $.extend( realCheckEleArr[g].rules, options[gg].rules);

					}

					if( !options[gg].messages  ){

						options[gg].messages = realCheckEleArr[g].messages;

					}else{
						
						options[gg].messages = $.extend( realCheckEleArr[g].messages, options[gg].messages);

					}

				}

			}

			if( !keyr ){

				options.unshift( realCheckEleArr[g] )

			}

		}

		return options;

	}

})(window.jQuery)