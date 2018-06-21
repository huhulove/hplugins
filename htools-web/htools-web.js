/**
 * 作者：mayingwu
 * 时间：2018-01-31
 * 内容：JS 编程中常用的工具函数
 * 备注：使用环境 --> 浏览器直接调用该JS
 */

var htools_web = {

    //--------------------------Other------------------------------
    /**
     * h5 页面信息提示
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-02-27
     * @version  [version]
     * @param    {[String]}         str      [description]
     * @param    {[String]}         bgColor  [description]
     * @param    {[String]}         txtColor [description]
	 * 备注：此方法依赖 jQuery 插件
     */
    Toast : function( str, bgColor, txtColor ){

    	$("#toast").remove();

    	var ele = $("<div id='toast'><span>"+ str +"</span></div>").css({
    		"text-align" : "center",
		    "position": "fixed",
		    "left": "0",
		    "right": "0",
		    "z-index": "1111",
		    "margin": "0 auto",
		    "bottom": 60,
		    "max-width" : "90%",
		    "opacity" : 0
    	})

    	ele.find("span").css({
    		"background": bgColor || "rgba(0,0,0,.6)",
		    "color": txtColor || "#fff",
		    "padding": "10px 20px",
		    "border-radius": "20px",
		    "font-size": "14px",
		    "max-width" : "88%",
		    "display" : "inline-block"
    	})

    	$("body").append(ele);

    	$("#toast").animate({
    		bottom : 100,
    		opacity : 1
    	})

    	setTimeout(function(){

    		$("#toast").fadeOut(function(){

    			$("#toast").remove();	

    		});

    	}, 1500)

    },

    /**
     * 代替 eval 方法
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-02-26
     * @version  [version]
     * @param    {Function}       fn [description]
     */
    Evil : function(fn) {

		var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错

		return new Fn('return ' + fn)();

	},

    /**
     * 解决javascript浮点数四则运算( + - * / )运算BUG
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-02-26
     * @version  [version]
     * @param    {[Number]}         num1 [description]
     * @param    {[Number]}         num2 [description]
     * @param    {[String]}         runType [运算符号]
	 * 
	 * 备注：该方法只适应于 参数1 和 参数2小数点后 3位 之内(含3)的计算  不支持除法
	 * 
     */
    FloatRun : function(num1, num2, runType){

        var sq1, sq2, m;

        try {

            sq1 = num1.toString().split(".")[1].length;

        } catch (e) {

            sq1 = 0;

        }

        try {

            sq2 = num2.toString().split(".")[1].length;

        } catch (e) {

            sq2 = 0;

        }

        m = Math.pow(10, Math.max(sq1, sq2));

        switch( runType ){

        	case "+":

        		return (num1 * m + num2 * m) / m;

        		break;

        	case "-":

        		return (num1 * m - num2 * m) / m;;

        		break;

        	case "*":

        		return ( (num1 * m) * (num2*m) ) / m*m

        		break;

        }

    },

    /**
     * 获取网址参数
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-02-09
     * @version  [version]
     * @param    {[type]}         name [description]
     * @return   {[type]}              [description]
     */
	UrlSingleParams : function(name){
		
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");

	    var r = decodeURI(window.location.search).substr(1).match(reg);

	    if(r!=null) return  r[2]; return null;

	},
	/**
	 * 获取全部url参数,并转换成json对象
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[type]}         url [description]
	 * @return   {[type]}             [description]
	 */
	UrlAllParams : function(url) {

	    var url = url ? url : window.location.href;

	    var _pa = url.substring(url.indexOf('?') + 1),

	        _arrS = _pa.split('&'),

	        _rs = {};

	    for (var i = 0, _len = _arrS.length; i < _len; i++) {

	        var pos = _arrS[i].indexOf('=');

	        if (pos == -1) {

	            continue;

	        }

	        var name = _arrS[i].substring(0, pos),

	            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));

	        _rs[name] = value;

	    }

	    return _rs;

	},
	/**
	 * 删除url指定参数，返回url
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[type]}         url  [description]
	 * @param    {[type]}         name [description]
	 * @return   {[type]}              [description]
	 */
	UrlDelParams : function(url, name){

	    var baseUrl = url.split('?')[0] + '?';

	    var query = url.split('?')[1];

	    if (query.indexOf(name)>-1) {

	        var obj = {}

	        var arr = query.split("&");

	        for (var i = 0; i < arr.length; i++) {

	            arr[i] = arr[i].split("=");

	            obj[arr[i][0]] = arr[i][1];

	        };

	        delete obj[name];

	        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");

	        return url

	    }else{

	        return url;

	    }

	},
	
	/**
	 * 判断当前容器是 Android / IOS / Mobile
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 */
	Versions : function(){

		var u = navigator.userAgent;

        var app = navigator.appVersion;

        return {
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
            iPhone: u.indexOf("iPhone") > -1,
            iPad: u.indexOf("iPad") > -1,
            weixin: /MicroMessenger/i.test(u),
            weibo: /WeiBo/i.test(u),
        };

	},
	/**
	 * 浏览器中 JS 调用 ios 客户端APP
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[type]}         callAppUrl     [调用APP的地址 / 下载APP地址 / 在一些不能调用APP的浏览器中出现的提示层函数]
	 * @param    {[type]}         downloadAppUrl [description]
	 * @param    {[type]}         mask           [description]
	 */
	JsCallApp : function(callAppUrl, downloadAppUrl, mask){

		if( $.fn.htools.Versions().weixin ){

			mask && mask();

		}else{

			if( callAppUrl ){

				window.location.href = callAppUrl;

			}

	        setTimeout(function () {

	            window.location.href = downloadAppUrl;

	        }, 1000);

		}

	},
	
	/**
	 * 判断浏览器
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-10
	 * @version  [version]
	 */
	BrowserType : function(){

	    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

	    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器

	    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器

	    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器

	    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器

	    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器

	    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

	    if (isIE) {

	        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");

	        reIE.test(userAgent);

	        var fIEVersion = parseFloat(RegExp["$1"]);

	        if(fIEVersion == 7) return "IE7"

	        else if(fIEVersion == 8) return "IE8";

	        else if(fIEVersion == 9) return "IE9";

	        else if(fIEVersion == 10) return "IE10";

	        else if(fIEVersion == 11) return "IE11";

	        else return "IE7以下"//IE版本过低

	    }

	    if (isFF) return "FF";

	    if (isOpera) return "Opera";

	    if (isEdge) return "Edge";

	    if (isSafari) return "Safari";

	    if (isChrome) return "Chrome";

	},	

	// -------------------- DATE ------------------------------
	
	/**
	 * 格式化时间;
	 * 
	 * @param  {time} 时间
	 * @param  {cFormat} 格式
	 * @return {String} 字符串
	 *
	 * @example FormatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
	 *          			
	 *          FormatTime('5060809070', '{y}/{m}/{d} {h}:{m}:{s} {a}') // -> 2130/05/16 12:05:50 二	5060809070 => 秒
	 */
	FormatTime : function(time, cFormat) {

	    if (arguments.length === 0) return null

	    if ((time + '').length === 10) {

	        time = +time * 1000

	    }

	    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}', date

	    if (typeof time === 'object') {

	        date = time

	    } else {

	        date = new Date(time)

	    }

	    var formatObj = {

	        y: date.getFullYear(),

	        m: date.getMonth() + 1,

	        d: date.getDate(),

	        h: date.getHours(),

	        i: date.getMinutes(),

	        s: date.getSeconds(),

	        a: date.getDay()

	    }

	    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function(result, key){

	        var value = formatObj[key]

	        if (key === 'a') return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][value - 1]

	        if (result.length > 0 && value < 10) {

	            value = '0' + value

	        }

	        return value || 0

	    })

	    return time_str

	},

	/**
	 * 返回指定长度的月份集合
	 * 
	 * @param  {time} 时间
	 * @param  {len} 长度
	 * @param  {direction} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
	 * @return {Array} 数组
	 * 
	 * @example   GetMonths('2018-1-29', 6, 1)  // ->  ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
	 * 
	 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
	 * 
	 */
	GetMonths : function(time, len, direction) {

		var _this = this;

	    var mm = new Date(time).getMonth(),

	        yy = new Date(time).getFullYear(),

	        direction = isNaN(direction) ? 3 : direction,

	        index = mm,

	        monthArr = [];

	    var FormatNext = function(){

	    	var _arrn = [];

	    	for( var i=0; i < len; i++ ){

	    		index++;

	    		_arrn.push( index );
	    		
	    	}

	    	return _arrn;

	    }

	    var FormatPre = function(){

	    	var _arrp = [];

	    	for( var i=1; i <= len; i++ ){

	    		_arrp.push( index - i );

	    	}

			return _this.Sort( _arrp, 1 );

	    }

	    var FormatCurr = function(){

	    	var _arr = [];

	    	_arr = FormatPre();

	    	return _arr.concat( [ mm ] ).concat( FormatNext() );

	    }

	    var YearMonth = function(year, month){

	    	if( month < 0 ){

	    		var miy = Math.floor( month / 12 );

	    		var year = year + miy;

	    		var month = Math.abs(miy) * 12 + month;

	    	}

	    	if( month >= 12 ){

	    		var may = Math.floor( month / 12 );

	    		var year = year + may;

	    		var month = month % 12;

	    	}

	    	return year + "-" + ( month + 1 );

	    }

	    var ReturnMonth = function( marr ){

	    	var _arr = [];

	    	for( var i=0, len = marr.length; i < len; i++ ){

	    		_arr.push( YearMonth(yy, marr[i]) );

	    	}

	    	return _arr;

	    }

	    switch( direction ){

	    	case 1:

	    		monthArr = FormatPre();

	    		return ReturnMonth(monthArr);

	    		break;

	    	case 2:

	    		monthArr = FormatNext();

	    		return ReturnMonth( monthArr );

	    		break;

	    	case 3:

	    		monthArr = FormatCurr();

	    		return ReturnMonth( monthArr );

	    		break;

	    }

	},

	/**
	 * 返回指定长度的天数集合
	 * 
	 * @param  {time} 时间
	 * @param  {len} 长度
	 * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
	 * @return {Array} 数组
	 *
	 * @example date.GetDates('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
	 * 
	 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
	 * 
	 */
	GetDates : function(time, len, diretion) {

	    var tt = new Date(time);

	    var getDay = function(day) {

	        var t = new Date(time)

	        t.setDate(t.getDate() + day)

	        var m = t.getMonth()+1

	        return t.getFullYear()+'-'+m+'-'+t.getDate()

	    }

	    var arr = []

	    if (diretion === 1) {

	        for (var i = 1; i <= len; i++) {

	            arr.unshift(getDay(-i))

	        }

	    }else if(diretion === 2) {

	        for (var i = 1; i <= len; i++) {

	            arr.push(getDay(i))

	        }

	    }else {

	        for (var i = 1; i <= len; i++) {

	            arr.unshift(getDay(-i))

	        }

	        arr.push(tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate())

	        for (var i = 1; i <= len; i++) {

	            arr.push(getDay(i))

	        }

	    }

	    // return diretion === 1 ? arr.concat([tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate()]) : diretion === 2 ? [tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate()].concat(arr) : arr
	    return arr

	},

	/**
	 * 秒数转换为时分秒字符串
	 * 
	 * @param  {s} 秒数
	 * @return {String} 字符串 
	 *
	 * @example formatHMS(3610) // -> 1h0m10s
	 * 
	 *          formatHMS(3610, "h")  // -> 1h
	 */
	FormatHMS : function(s, type) {

		var h = parseInt(s/3600);

		var m = parseInt( ( s - h*3600 )/60 );

		var s = s - h*3600 - m*60;

		switch( type ){

			case "h":

				return h + "h";

				break;

			case "m":

				return m + "m";

				break;

			case "s":

				return s + "s";

				break;

			default :

				return h + "h" + m + "m" + s + "s"

		}

	},

	/**
	 * 获取某月有多少天
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-06
	 * @param    time 				[ "2018-2" ]
	 * @return   Number
	 * @explame getMonthOfDay( "2018-2" )  => 28
	 * 
	 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
	 * 
	 */
	GetDatesOfMonth : function(time) {

	    var date = new Date(time);

	    var year = date.getFullYear();

	    var mouth = date.getMonth() + 1;

	    var days;

	    //当月份为二月时，根据闰年还是非闰年判断天数
	    if (mouth == 2) {

	    	days = ( year%4==0 && year%100!=0 ) || year%400==0 ? 29 : 28;

	    } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {

	        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
	        days = 31

	    } else {

	        //其他月份，天数为：30.
	        days = 30

	    }

	    return days

	},

	/**
	 * 获取某年有多少天
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-06
	 * @param    time 					[ "2018" => ( String ) / 946684800000 => ( Number ) ]
	 * @return   Number
	 * @example  $.fn.htools.GetDatesOfYear( "2018" / 946684800000 ) => 365 / 366
	 */
	GetDatesOfYear : function(time) {

	    var firstDayYear = this.GetFirstDateOfYear(time);

	    var lastDayYear = this.GetLastDateOfYear(time);

	    var numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime())/1000;

	    return Math.ceil(numSecond/(24*3600));

	},

	/**
	 * 获取某年的第一天
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-06
	 * @param    time 				[ "2018" => ( String ) / 1517903434628 => ( Number ) ]
	 * @return   String
	 * @example  GetFirstDateOfYear( "2018" / 946684800000 ) => "2018-01-01 00:00:00" / "2000-01-01 00:00:00";
	 */
	GetFirstDateOfYear : function(time) {

	    var year = new Date(time).getFullYear();

	    return year + "-01-01 00:00:00";

	},

	/**
	 * 获取某年最后一天
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-06
	 * @param    time 				[ "2018" => ( String ) / 1517903434628 => ( Number ) ]
	 * @return   String
	 * @example  GetLastDateOfYear( "2018" / 946684800000 ) => "2018-12-31 23:59:59" / "2000-12-31 23:59:59";
	 */
	GetLastDateOfYear : function(time) {

	    var year = new Date(time).getFullYear();

	    var dateString = year + "-12-01 00:00:00";

	    var endDay = this.GetDatesOfMonth(dateString);

	    return year + "-12-" + endDay + " 23:59:59";

	},

	/**
	 * 获取某个日期是当年中的第几天
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-06
	 * @param    time 				[ "2018" => ( String ) / 1518192000000 => ( Number ) ]
	 * @return   Number
	 * @example  GetDateIndexOfYear( "2018-2-10" / 1518192000000 )   => 41 / 41  
	 * 
	 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
	 *           
	 */
	GetDateIndexOfYear : function(time) {

	    var firstDayYear = this.GetFirstDateOfYear(time);

	    var numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime())/1000;
		
	    return Math.ceil(numSecond/(24*3600)) + 1;

	},

	/**
	 * 获取某个日期在这一年的第几周
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-06
	 * @param    time 				[ "2018" => ( String ) / 1518192000000 => ( Number ) ]
	 * @return   Number             
	 * @example  GetDayOfYearWeek( "2018-2-10" / 1518192000000 )   => 6 / 6 
	 * 
	 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
	 * 
	 */
	GetWeekIndexOfYear : function(time) {

	    var numdays = this.GetDateIndexOfYear(time);

	    var y = new Date(time).getFullYear();

	    var firstDateDay = new Date(y, 0, 1).getDay();
		
	    if( firstDateDay != 1 ){

	    	return Math.ceil( ( numdays + ( firstDateDay == 0 ? 7 : firstDateDay - 1 ) ) / 7 );

	    }else{

	    	return Math.ceil(numdays / 7);

	    }	    

	},

	// ---------------------- Array -----------------------------
	
	/**
	 * 数组进行简单排序
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-07
	 * @param    arr  			[ [1,3,2,4,2,5,6] ]
	 * @param    type 			[ 1 => 从小到大   2 => 从大到小   3 => 随机 ]
	 * @example  $.fn.htools.Sort( [1,3,2,4,2,5,6], 2 ) = > [6, 5, 4, 3, 2, 2, 1]
	 */
	Sort : function(arr, type) {

	    return arr.sort( function(a, b){

	        switch(type) {

	            case 1:

	                return a - b;

	            case 2:

	                return b - a;

	            case 3:

	                return Math.random() - 0.5;

	            default:

	                return arr;

	        }

	    })

	},

	/**
	 * 数组每一项都进行回调并且可以指定 this 指向
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-07
	 * @param    {[Array]}         arr     [description]
	 * @param    {Function}        fn      [回调函数]
	 * @param    {[Object]}        thisObj [this 指向]
	 * @return   {[Array]}                 [回调函数返回值集合]
	 * 备注：    函数体如果是异步的情况下，返回值是 []
	 */
	Map : function(arr, fn, thisObj){

		var scope = thiObj || window;

		var a = [];

		var l = arr.length;

		for( var i=0; i<l; i++){

			var res = fn.call( thisObj, arr[i], i );

			res && a.push(res)

		}

		return a

	},

	/**
	 * 数组去重
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-07
	 * @param    {[Array]}          arr  []
	 * @param    {[Number]}         type [ 1 => 严格去重 "2" / 2 数据类型不一样 不在去重范围内; !1 => 非严格去重 "2" / 2 数据类型不一样 在去重范围内; ]
	 * @example  Unique([1,2,2,3,4,6,"2"], 1)  => [1, 2, 3, 4, 6, "2"]
	 *           Unique([1,2,2,3,4,6,"2"])  => [1, 2, 3, 4, 6]
	 */
	Unique : function(arr, type) {

	    var r = [], 
	    	NaNBol = true

    	for(var i=0; i < arr.length; i++) {

    		if( type != 1 ){

    			for(var j = i+1; j < arr.length; j++){ 

					if(arr[i]==arr[j]){ 

						arr.splice(j,1); //console.log(arr[j]); 

						j--; 

					} 

				}

				r = arr

    		}

            if (arr[i] !== arr[i]) {

                if (NaNBol && r.indexOf(arr[i]) === -1) {

                    r.push(arr[i])

                    NaNBol = false

                }

            }else{

                if(r.indexOf(arr[i]) === -1) r.push(arr[i])

            }

        }

        return r

	},
	/**
	 * 求两个集合的并集
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-07
	 * @version  [version]
	 * @param    {[Array]}         a [description]
	 * @param    {[Array]}         b [description]
	 * @return   {[Array]}           [description]
	 * @example  Union([12,34,56], [65,12,34]) => [12, 34, 56, 65]
	 */
	Union : function(a, b) {

	    var newArr = a.concat(b);

	    return this.Unique(newArr);

	},
	/**
	 * 求两个集合的交集
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-07
	 * @param    {[Array]}         a [description]
	 * @param    {[Array]}         b [description]
	 * @return   {[Array]}           [description]
	 * @example  Intersect([2,3,4,3,5], [1,5,4,3,2,67]) => [2, 3, 4, 5]
	 */
	Intersect : function(a, b) {

	    var a = this.Unique(a);

	    return $.fn.htools.Map(a, function(o) {

	    	return b.indexOf(o) != -1 ? o : null

	    });

	},
	/**
	 * 删除其中一个元素
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-07
	 * @version  [version]
	 * @param    {[Array]}                 arr [description]
	 * @param    {[Number/String]}         ele [description]
	 * @return   {[Array]}                     [description]
	 * @example  $.fn.htools.Remove([1,2,3,4,56,7], 1) => [2, 3, 4, 56, 7]
	 */
	Remove : function(arr, ele) {

	    var index = arr.indexOf(ele);

	    if(index > -1) {

	        arr.splice(index, 1);

	    }

	    return arr;

	},
	/**
	 * 数组中最大值
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-07
	 * @param    {[Array]}         			arr [ 数字集合 ]
	 * @return   {[Number]}              		[description]
	 */
	Max : function(arr) {

	    return Math.max.apply(null, arr);

	},
	/**
	 * 数组中最小值
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-07
	 * @param    {[Array]}         arr [description]
	 * @return   {[Number]}            [description]
	 */
	Min : function(arr) {

	    return Math.min.apply(null, arr);

	},
	/**
	 * 数组求和
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-07
	 * @param    {[Array]}          arr [数字集合]
	 * @return   {[Number]}             [description]
	 */
	Sum : function(arr) {

	    return arr.reduce( function(pre, cur){

	        return pre + cur

	    })
	},
	/**
	 * 数组平均值
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-07
	 * @param    {[Array]}         arr [数字集合]
	 * @return   {[Number]}            [description]
	 */
	Average : function(arr) {

	    return this.Sum(arr)/arr.length

	},

	//---------------------- String ----------------------
	/**
	 * 检验字符串
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[type]}         str  [description]
	 * @param    {[type]}         type [description]
	 */
	CheckStr : function(str, type) {

	    switch (type) {

	        case 'phone':   //手机号码

	            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);

	        case 'tel':     //座机

	            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);

	        case 'card':    //身份证

	            return /^\d{15}|\d{18}$/.test(str);

	        case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线

	            return /^[a-zA-Z]\w{5,17}$/.test(str)

	        case 'postal':  //邮政编码

	            return /[1-9]\d{5}(?!\d)/.test(str);

	        case 'QQ':      //QQ号

	            return /^[1-9][0-9]{4,9}$/.test(str);

	        case 'email':   //邮箱

	            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);

	        case 'money':   //金额(小数点2位)

	            return /^\d*(?:\.\d{0,2})?$/.test(str);

	        case 'URL':     //网址

	            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)

	        case 'IP':      //IP

	            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);

	        case 'date':    //日期时间

	            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)

	        case 'number':  //数字

	            return /^[0-9]$/.test(str);

	        case 'english': //英文

	            return /^[a-zA-Z]+$/.test(str);

	        case 'chinese': //中文

	            return /^[\u4E00-\u9FA5]+$/.test(str);

	        case 'lower':   //小写

	            return /^[a-z]+$/.test(str);

	        case 'upper':   //大写

	            return /^[A-Z]+$/.test(str);

	        case 'HTML':    //HTML标记

	            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);

	        default:

	            return true;

	    }

	},

	/**
	 * 字符串去除空格
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[String]}         str  [description]
	 * @param    {[Number]}         type [ 1-所有空格  2-前后空格  3-前空格 4-后空格 ]
	 * @return   {[String]}              [description]
	 */
	Trim : function(str, type) {

	    type = type || 1;

	    switch (type) {

	        case 1:

	            return str.replace(/\s+/g, "");

	        case 2:

	            return str.replace(/(^\s*)|(\s*$)/g, "");

	        case 3:

	            return str.replace(/(^\s*)/g, "");

	        case 4:

	            return str.replace(/(\s*$)/g, "");

	        default:

	            return str;

	    }
	},
	/**
	 * 字符串大小写转换
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[String]}         str  [description]
	 * @param    {[Number]}         type [ 1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写 ]
	 */
	ChangeCase : function(str, type) {

	    type = type || 4;

	    switch (type) {

	        case 1:

	            return str.replace(/\b\w+\b/g, function (word) {

	                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

	            });

	        case 2:

	            return str.replace(/\b\w+\b/g, function (word) {

	                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();

	            });

	        case 3:

	            return str.split('').map( function(word){

	                if (/[a-z]/.test(word)) {

	                    return word.toUpperCase();

	                }else{

	                    return word.toLowerCase()

	                }

	            }).join('')

	        case 4:

	            return str.toUpperCase();

	        case 5:

	            return str.toLowerCase();

	        default:

	            return str;

	    }

	},

	/**
	 * 字符串检测密码强度
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[String]}         str [description]
	 * @return   {[Number]}             [description]
	 */
	CheckPwd : function(str) {

	    var Lv = 0;

	    if (str.length < 6) {

	        return Lv;

	    }

	    if (/[0-9]/.test(str)) {

	        Lv++;

	    }

	    if (/[a-z]/.test(str)) {

	        Lv++;

	    }

	    if (/[A-Z]/.test(str)) {

	        Lv++;

	    }

	    if (/[\.|-|_]/.test(str)) {

	        Lv++;

	    }

	    return Lv;

	},

	/**
	 * 过滤html代码(把<>转换)
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[String]}         str [description]
	 */
	FilterTag : function(str) {

	    str = str.replace(/&/ig, "&amp;");

	    str = str.replace(/</ig, "&lt;");

	    str = str.replace(/>/ig, "&gt;");

	    str = str.replace(" ", "&nbsp;");

	    return str;

	},

	//----------------------------Number-------------------------

	/**
	 * 随机数范围
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @param    {[Number]}         min [description]
	 * @param    {[Number]}         max [description]
	 * @return   {[Number]}             [description]
	 */
	Random : function(min, max){

	    if (arguments.length === 2) {

	        return Math.floor(min + Math.random() * ( (max+1) - min ))

	    }else{

	        return null;

	    }
	    
	},
	/**
	 * 将阿拉伯数字翻译成中文的大写数字
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[Number]}         num [description]
	 */
	NumberToChinese : function(num) {

	    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");

	    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");

	    var a = ("" + num).replace(/(^0*)/g, "").split("."),

	        k = 0,

	        re = "";

	    for(var i = a[0].length - 1; i >= 0; i--) {

	        switch(k) {

	            case 0:

	                re = BB[7] + re;

	                break;

	            case 4:

	                if(!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")

	                    .test(a[0]))

	                    re = BB[4] + re;

	                break;

	            case 8:

	                re = BB[5] + re;

	                BB[7] = BB[5];

	                k = 0;

	                break;
	        }

	        if(k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)

	            re = AA[0] + re;

	        if(a[0].charAt(i) != 0)

	            re = AA[a[0].charAt(i)] + BB[k % 4] + re;

	        k++;

	    }

 		// 加上小数部分(如果有小数部分)
	    if(a.length > 1){

	        re += BB[6];

	        for(var i = 0; i < a[1].length; i++)

	            re += AA[a[1].charAt(i)];

	    }

	    if(re == '一十')

	        re = "十";

	    if(re.match(/^一/) && re.length == 3)

	        re = re.replace("一", "");

	    return re;

	},
	/**
	 * 将数字转换为大写金额
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[Numer]}         Num [description]
	 * @return   {[type]}             [description]
	 */
	ChangeToChinese : function(Num) {
        //判断如果传递进来的不是字符的话转换为字符
        if(typeof Num == "number") {

            Num = new String(Num);

        };

        Num = Num.replace(/,/g, "") //替换tomoney()中的“,”

        Num = Num.replace(/ /g, "") //替换tomoney()中的空格

        Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符

        if(isNaN(Num)) { //验证输入的字符是否为数字

            //alert("请检查小写金额是否正确");
            
            return "";

        };

        //字符处理完毕后开始转换，采用前后两部分分别转换
        var part = String(Num).split(".");

		var newchar = "";
		
		var lowerCaseNumArr = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"]

        //小数点前进行转化
        for(var i = part[0].length - 1; i >= 0; i--) {

            if(part[0].length > 10) {

                return "";

                //若数量超过拾亿单位，提示
            }

            var tmpnewchar = ""

			var perchar = part[0].charAt(i);
			
			tmpnewchar = lowerCaseNumArr[parseInt(perchar)] + tmpnewchar;

            switch(part[0].length - i - 1) {

                case 0:

                    tmpnewchar = tmpnewchar + "元";

                    break;

                case 1:

                    if(perchar != 0) tmpnewchar = tmpnewchar + "拾";

                    break;

                case 2:

                    if(perchar != 0) tmpnewchar = tmpnewchar + "佰";

                    break;

                case 3:

                    if(perchar != 0) tmpnewchar = tmpnewchar + "仟";

                    break;

                case 4:

                    tmpnewchar = tmpnewchar + "万";

                    break;

                case 5:

                    if(perchar != 0) tmpnewchar = tmpnewchar + "拾";

                    break;

                case 6:

                    if(perchar != 0) tmpnewchar = tmpnewchar + "佰";

                    break;

                case 7:

                    if(perchar != 0) tmpnewchar = tmpnewchar + "仟";

                    break;

                case 8:

                    tmpnewchar = tmpnewchar + "亿";

                    break;

                case 9:

                    tmpnewchar = tmpnewchar + "拾";

                    break;

            }

            var newchar = tmpnewchar + newchar;

        }

        //小数点之后进行转化
        if(Num.indexOf(".") != -1) {

            if(part[1].length > 2) {

                // alert("小数点之后只能保留两位,系统将自动截断");
                part[1] = part[1].substr(0, 2)

            }

            for(i = 0; i < part[1].length; i++) {

                tmpnewchar = "";

				perchar = part[1].charAt(i);
				
				tmpnewchar = lowerCaseNumArr[parseInt(perchar)] + tmpnewchar;

                if(i == 0) tmpnewchar = tmpnewchar + "角";

                if(i == 1) tmpnewchar = tmpnewchar + "分";

                newchar = newchar + tmpnewchar;

            }

        }
        //替换所有无用汉字
        while(newchar.search("零零") != -1)

            newchar = newchar.replace("零零", "零");

        newchar = newchar.replace("零亿", "亿");

        newchar = newchar.replace("亿万", "亿");

        newchar = newchar.replace("零万", "万");

        newchar = newchar.replace("零元", "元");

        newchar = newchar.replace("零角", "");

        newchar = newchar.replace("零分", "");

        if(newchar.charAt(newchar.length - 1) == "元") {

            newchar = newchar + "整"

        }

        return newchar;

    },

    //------------------------ Storage --------------------------

    // localStorage
    /**
     * 设置localStorage
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-02-09
     * @version  [version]
     * @param    {[type]}         key [description]
     * @param    {[type]}         val [description]
     */
    SetLocal : function(key, val) {

        window.localStorage.setItem(key, JSON.stringify(val))
        
    },
    /**
     * 获取localStorage
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-02-09
     * @version  [version]
     * @param    {[type]}         key [description]
     * @return   {[type]}             [description]
     */
    GetLocal : function(key) {

        if (key) return JSON.parse(window.localStorage.getItem(key))

        return null;
        
    },
    /**
     * 移除localStorage
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-02-09
     * @version  [version]
     * @param    {[type]}         key [description]
     * @return   {[type]}             [description]
     */
    RemoveLocal : function(key) {

        window.localStorage.removeItem(key)

    },
    /**
     * 移除所有localStorage
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-02-09
     * @version  [version]
     * @return   {[type]}         [description]
     */
    ClearLocal : function() {

        window.localStorage.clear()

    }
}
