/**
 * [ JS 编程中常用的工具函数 ]
 * @Author   mayingwu
 * @Email    516378746@qq.com
 * @DateTime 2018-06-14       
 */

const hTools = {

	//--------------------------Other------------------------------

	/**
     * h5 页面信息提示
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-03-12
     * @version  [version]
     * @param    {[String]}         str      [description]
     * @param    {[String]}         bgColor  [description]
     * @param    {[String]}         txtColor [description]
    */
	Toast ( str, bgColor = "rgba(0,0,0,.6)", txtColor = "#fff", callback ){

		let oToast = document.querySelector("#toast");

		oToast && oToast.remove();

		let oToastDiv = document.createElement('div');

		oToastDiv.setAttribute("id", "toast");

		let oToastCon = document.createElement("span");

		oToastCon.innerHTML = str;

		oToastCon.setAttribute("style", `background:${bgColor};color:${txtColor};padding:10px 20px;border-radius:20px;font-size:14px;max-width:88%;display:inline-block`)

		oToastDiv.appendChild( oToastCon )

		oToastDiv.setAttribute("style", `text-align:center;position:fixed;left:0;right:0;z-index:1111;margin:0 auto;bottom:60px;max-width:90%;opacity:1`)

		let oBody = document.querySelectorAll("body")[0];

		oBody.appendChild(oToastDiv);

		setTimeout(function(){

			oToastDiv.remove();	

			callback && callback();

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
	Evil (fn){

		let Fn = Function; //一个变量指向Function，防止有些前端编译工具报错

		return new Fn('return ' + fn)();

	},

	/**
     * 解决javascript浮点数四则运算( + - * )运算BUG
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-02-26
     * @version  [version]
     * @param    {[String_Number]}         num1 [description]
     * @param    {[String_Number]}         num2 [description]
     * @param    {[String]}         	   runType [运算符号]
	 * 
	 * 备注：该方法只适应于 参数1 和 参数2小数点后 3位 之内(含3)的计算  不支持除法
	 * 		
     */
    FloatRun (num1, num2, runType){

		let sq1 = 0;
		let sq2 = 0;
		let m = 0;

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

        		return ( (num1 * m) * (num2*m) ) / (m*m)

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
	UrlSingleParams (name){

	    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");

	    let r = decodeURI(window.location.search).substr(1).match(reg);

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
	UrlAllParams (url) {

	    let newUrl = url ? url : window.location.href;

	    let _pa = newUrl.substring(newUrl.indexOf('?') + 1),

	        _arrS = _pa.split('&'),

	        _rs = {};

	    for (let i = 0, _len = _arrS.length; i < _len; i++) {

	        let pos = _arrS[i].indexOf('=');

	        if (pos == -1) {

	            continue;

	        }

	        let name = _arrS[i].substring(0, pos);

	        let value = window.decodeURIComponent(_arrS[i].substring(pos + 1));

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
	DelParamsUrl : function(url, name){

	    let baseUrl = url.split('?')[0] + '?';

	    let query = url.split('?')[1];

	    if (query.indexOf(name)>-1) {

	        let obj = {}

	        let arr = query.split("&");

	        for (let i = 0; i < arr.length; i++) {

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
	 * @DateTime 2018-06-19
	 * @version  [version]
	 */
	Versions (){

		let u = navigator.userAgent;

        let app = navigator.appVersion;

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
	 * 浏览器中 JS 调用客户端 APP
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-06-19
	 * @version  [version]
	 * @param    {[type]}         callAppUrl     [调用APP的地址 / 下载APP地址 / 在一些不能调用APP的浏览器中出现的提示层函数]
	 * @param    {[type]}         downloadAppUrl [description]
	 * @param    {[type]}         mask           [description]
	 */
	JsCallApp (callAppUrl, downloadAppUrl, mask){

		if( $.fn.htools.Versions().weixin ){

			mask && mask();

		}else{

			if( callAppUrl ){

				window.location.href = callAppUrl;

			}

	        setTimeout(function () {

				if( downloadAppUrl ){

					window.location.href = downloadAppUrl;
	
				}

	        }, 1000);

		}

	},

	/**
	 * 判断 WEB浏览器类型以及IE浏览器版本
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-10
	 * @version  [version]
	 */
	BrowserType (){

	    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

	    let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器

	    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器

	    let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器

	    let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器

	    let isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器

	    let isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

	    if (isIE) {

	        let reIE = new RegExp("MSIE (\\d+\\.\\d+);");

	        reIE.test(userAgent);

	        let fIEVersion = parseFloat(RegExp["$1"]);

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
	 * 
	 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
	 * 
	 */
	FormatTime (time, cFormat) {

	    if ( arguments.length === 0 ) return null;

	    if ((time + '').length === 10) {

	        time = +time * 1000

	    }

		let format = cFormat || '{y}-{m}-{d} {h}:{i}:{s} {a}';

		let date = "";

	    if (typeof time === 'object') {

	        date = time

	    } else {

	        date = new Date(time)

	    }

	    let formatObj = {

	        y: date.getFullYear(),

	        m: date.getMonth() + 1,

	        d: date.getDate(),

	        h: date.getHours(),

	        i: date.getMinutes(),

	        s: date.getSeconds(),

	        a: date.getDay()

	    }

	    let time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function(result, key){

	        let value = formatObj[key]

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
	GetMonths (time, len, dir) {

	    let mm = new Date(time).getMonth();

	    let yy = new Date(time).getFullYear();

		let direction = isNaN(dir) ? 3 : dir;
		
	    let index = mm;

	    let monthArr = [];

	    let FormatNext = () => {

	    	let _arrn = [];

	    	for( let i=0; i < len; i++ ){

	    		index++;

	    		_arrn.push( index );
	    		
	    	}

	    	return _arrn;

	    }

	    let FormatPre = () => {

	    	let _arrp = [];

	    	for( let i=1; i <= len; i++ ){
				
	    		_arrp.push( index - i );

	    	}

	    	return this.Sort( _arrp, 1 );

	    }

	    let FormatCurr = () => {

	    	let _arr = [];

	    	_arr = FormatPre();

	    	return _arr.concat( [ mm ] ).concat( FormatNext() );

	    }

	    let YearMonth = (year, month) => {

			let miy = "";

			let nyear = "";

			let nmonth = "";
			
	    	if( month < 0 ){

	    		miy = Math.floor( month / 12 );

	    		nyear = year + miy;

	    		nmonth = Math.abs(miy) * 12 + month;

	    	}
			
	    	if( month >= 12 ){

	    		miy = Math.floor( month / 12 );

	    		nyear = year + miy;

	    		nmonth = month % 12;

			}
			
			if( month >=0 && month < 12 ){

				miy = Math.floor( month / 12 );

	    		nyear = year + miy;

				nmonth = month

			}

			console.log( nmonth );

	    	return nyear + "-" + (nmonth + 1) ;

	    }

	    let ReturnMonth = ( marr ) => {

	    	let _arr = [];

	    	for( let i=0, len = marr.length; i < len; i++ ){

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
	 * @example GetDates('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
	 * 
	 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
	 * 
	 */
	GetDates (time, len, diretion) {

	    let tt = new Date(time);

	    let getDay = (day) => {

	        let t = new Date(time)

	        t.setDate(t.getDate() + day)

	        let m = t.getMonth()+1

	        return t.getFullYear()+'-'+m+'-'+t.getDate()

	    }

	    let arr = []

	    if (diretion === 1) {

	        for (let i = 1; i <= len; i++) {

	            arr.unshift(getDay(-i))

	        }

	    }else if(diretion === 2) {

	        for (let i = 1; i <= len; i++) {

	            arr.push(getDay(i))

	        }

	    }else {

	        for (let i = 1; i <= len; i++) {

	            arr.unshift(getDay(-i))

	        }

	        arr.push(tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate())

	        for (let i = 1; i <= len; i++) {

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
	FormatHMS (s, type) {

		let h = parseInt(s/3600);

		let m = parseInt( ( s - h*3600 )/60 );

		let ss = s - h*3600 - m*60;

		switch( type ){

			case "h":

				return h + "h";

				break;

			case "m":

				return m + "m";

				break;

			case "s":

				return ss + "s";

				break;

			default :

				return h + "h" + m + "m" + ss + "s"

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
	 * @explame  GetDatesOfMonth( "2018-2" )  => 28
	 * 
	 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
	 *  
	 */
	GetDatesOfMonth (time) {

	    let date = new Date(time);

	    let year = date.getFullYear();

	    let mouth = date.getMonth() + 1;

	    let days;

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
	 * @example  GetDatesOfYear( "2018" / 946684800000 ) => 365 / 366
	 */
	GetDatesOfYear (time) {

	    let firstDayYear = this.GetFirstDateOfYear(time);

	    let lastDayYear = this.GetLastDayOfYear(time);

	    let numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime())/1000;

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
	GetFirstDateOfYear (time) {

	    let year = new Date(time).getFullYear();

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
	GetLastDateOfYear (time) {

	    let year = new Date(time).getFullYear();

	    let dateString = year + "-12-01 00:00:00";

	    let endDay = this.GetMonthOfDay(dateString);

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
	GetDateIndexOfYear (time) {

	    let firstDayYear = this.GetFirstDayOfYear(time);

	    let numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime())/1000;

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
	 * @example  GetWeekIndexOfYear( "2018-2-10" / 1518192000000 )   => 6 / 6 
	 * 
	 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
	 *  
	 */
	GetWeekIndexOfYear (time) {

	    let numdays = this.GetDateIndexOfYear(time);

	    let y = new Date(time).getFullYear();

		let firstDateDay = new Date(y, 0, 1).getDay();
		
	    if( firstDateDay != 1 ){

			return Math.ceil( ( numdays + ( firstDateDay == 0 ? 7 : firstDateDay - 1 ) ) / 7 )

	    }else{

	    	return Math.ceil( numdays / 7 );

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
	 * @example  Sort( [1,3,2,4,2,5,6], 2 ) = > [6, 5, 4, 3, 2, 2, 1]
	 */
	Sort (arr, type) {

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
	Unique (arr, type) {

		let r = [];
		
	    let NaNBol = true

    	for(var i=0; i < arr.length; i++) {

    		if( type != 1 ){

    			for(var j = i+1; j < arr.length; j++){ 

					if(arr[i]==arr[j]){ 

						arr.splice(j,1);

						j--; 

					} 

				}

				r = arr

    		}
			// 检测 NaN
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
	Union (a, b) {

	    let newArr = a.concat(b);

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
	Intersect (a, b) {

	    let va = this.Unique(a);

	    return va.map(function(item) {

	    	return b.indexOf(item) != -1 ? item : null

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
	 * @example  Remove([1,2,3,4,56,7], 1) => [2, 3, 4, 56, 7]
	 */
	Remove (arr, ele) {

		let narr = this.Unique(arr, 1);

	    let index = narr.indexOf(ele);

	    if(index > -1) {

	        narr.splice(index, 1);

	    }

	    return narr;

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
	Max (arr) {

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
	Min (arr) {

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
	Sum (arr) {

		let narr = arr.map( (item) => {

			if( typeof item == "string" ){

				return 0;

			}

			return item;

		} )
		console.log( narr );
	    return narr.reduce( function(pre, cur){

	        return (pre + cur)

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
	Average (arr) {

	    return this.Sum(arr)/arr.length

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
	Random (min, max){

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
	NumberToChinese (num) {

	    let AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");

	    let BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");

	    let a = ("" + num).replace(/(^0*)/g, "").split(".");

	    let k = 0;

	    let re = "";

	    for(let i = a[0].length - 1; i >= 0; i--) {

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
	ChangeToChinese (Num) {
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
        let part = String(Num).split(".");

		let newchar = "";
		
		let lowerCaseNum = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];

        //小数点前进行转化
        for(let i = part[0].length - 1; i >= 0; i--) {

            if(part[0].length > 10) {

                return "超过10亿了";

                //若数量超过拾亿单位，提示
            }

            let tmpnewchar = ""

			let perchar = part[0].charAt(i);
			
			tmpnewchar = lowerCaseNum[parseInt(perchar)] + tmpnewchar;

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

            newchar = tmpnewchar + newchar;

        }

        //小数点之后进行转化
        if(Num.indexOf(".") != -1) {

            if(part[1].length > 2) {

                // alert("小数点之后只能保留两位,系统将自动截断");
                part[1] = part[1].substr(0, 2)

            }

            for(let i = 0; i < part[1].length; i++) {

                let tmpnewchar = "";

				let perchar = part[1].charAt(i);
				
				tmpnewchar = lowerCaseNum[parseInt(perchar)] + tmpnewchar;

                if(i == 0) tmpnewchar = tmpnewchar + "角";

                if(i == 1) tmpnewchar = tmpnewchar + "分";

                newchar = newchar + tmpnewchar;

            }

		}
		
        //替换所有无用汉字
        while(newchar.search("零零") != -1){

			newchar = newchar.replace("零零", "零");
		}

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
	CheckStr (str, type) {

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
	 * @param    {[Number]}         type [ 1-所有空格  2-前后空格  3-前空格 4-后空格 默认 1 ]
	 * @return   {[String]}              [description]
	 */
	Trim (str, type) {

		let ntype = type || 1;
		
		let regArr = [/\s+/g, /(^\s*)|(\s*$)/g, /(^\s*)/g, /(\s*$)/g ]
		
		return str.replace(regArr[ntype-1], "");

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
	ChangeCase (str, type) {

	    let ntype = type || 4;

	    switch (ntype) {

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
	CheckPwd (str) {

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
	 * 过滤html代码标签(把<>转换)
	 * 
	 * @Author   mayingwu
	 * @Email    516378746@qq.com
	 * @DateTime 2018-02-09
	 * @version  [version]
	 * @param    {[String]}         str [description]
	 */
	FilterTag (str) {

		let nstr = ""

	    nstr = str.replace(/&/ig, "&amp;");

	    nstr = nstr.replace(/</ig, "&lt;");

	    nstr = nstr.replace(/>/ig, "&gt;");

	    nstr = nstr.replace(" ", "&nbsp;");

	    return nstr;

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
    SetLocal (key, val) {

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
    GetLocal (key) {

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
    RemoveLocal (key) {

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
    ClearLocal () {

        window.localStorage.clear()

    }

}

export default hTools



