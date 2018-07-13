/**
 * [ 百度地图二次封装 ]
 * @Author   mayingwu
 * @Email    516378746@qq.com
 * @DateTime 2018-07-02       
 * @备注 	 依赖百度地图基础插件
 */

const hbmap = {

	/**************************** 基础实例对象 *******************************/
		
	/**
	 * 点 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-02
     * @version  [version]
	 * @param    {[lng]}			   		经度		       必填
	 * @param    {[lat]}			   		纬度		       必填
     * @return   {[object]}        	    	[点实例化对象]
	 * 
	 */
	Point (lng, lat){

		return new BMap.Point(lng, lat)

	},
	/**
	 * 线 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-12
     * @version  [version]
	 * @param    {[PointArr]}			   	点 实例 数组		       必填
	 * @param    {[stockStyle]}			   	线具体的样式		       必填
     * @return   {[object]}        	    	[线实例化对象]
	 * 
	 */
	Polyline ( PointArr, stockStyle ){

		let stockStyle_def = {
			strokeColor:"blue", 
			strokeWeight:6, 
			strokeOpacity:0.5,
			...stockStyle
		}

		return new BMap.Polyline(PointArr, stockStyle_def);

	},
	/**
	 * 标识物 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-12
     * @version  [version]
	 * @param    {[Object]}			   	PointArr			点 实例 数组		       必填
	 * @param    {[Object]}				markerJson			标识物其他配置
     * @return   {[Object]}        	    					[线实例化对象]
	 * 
	 */
	Marker ( Point, markerJson ){

		return markerJson ? new BMap.Marker( Point, markerJson ) : new BMap.Marker( Point )

	},
	/**
	 * 圆 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-12
     * @version  [version]
	 * @param    {[Point]}			   		点(圆心)实例化对象		       必填
	 * @param    {[stockStyle]}			   	圆具体的样式		       必填
     * @return   {[object]}        	    	[圆实例化对象]
	 * 
	 */
	Circle ( Point, radius, stockStyle ){

		let newStockStyle = {
			strokeColor:"blue", 
			strokeWeight:2, 
			strokeOpacity:0.5,
			...stockStyle
		}

		return new BMap.Circle( Point, radius, newStockStyle )

	},
	/**
	 * 面 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-12
     * @version  [version]
	 * @param    {[String]}			   	points			=> 116.404, 39.915; 116.504, 40.015;		       必填
	 * @param    {[stockStyle]}			   				面具体的样式		       必填
     * @return   {[object]}        	    				[面实例化对象]
	 * 
	 */
	Polygon ( points, stockStyle ){

		return new BMap.Polygon( points, stockStyle );

	},
	/**
	 * 图标 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
	 * @param    {[String]}			iconUrl 		ICON 图标地址链接		       必填
	 * @param    {[Object]}			size			尺寸实例化对象		       	   必填
     * @return   {[Object]}          	    		[ICON 实例化对象]
	 * 
	 */
	Icon (iconUrl, size){

		return new BMap.Icon( iconUrl, size )

	},
	/**
	 * 尺寸 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
	 * @param    {[String]}			iconUrl 		ICON 图标地址链接		       必填
	 * @param    {[Object]}			size			尺寸实例化对象		       	   必填
     * @return   {[Object]}          	    		[ICON 实例化对象]
	 * 
	 */
	Size ( num1, num2 ){

		return new BMap.Size(num1, num2)

	},
	/**
	 * 标注 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
	 * @param    {[String]}			iconUrl 		ICON 图标地址链接		       必填
	 * @param    {[Object]}			size			尺寸实例化对象		       	   必填
     * @return   {[Object]}          	    		[ICON 实例化对象]
	 * 
	 */
	Label (text, opts){

		return new BMap.Label(text, opts);

	},
	/**
	 * 范围 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
	 * @param    {[String]}			iconUrl 		ICON 图标地址链接		       必填
	 * @param    {[Object]}			size			尺寸实例化对象		       	   必填
     * @return   {[Object]}          	    		[ICON 实例化对象]
	 * 
	 */
	Boundary (){

		return new BMap.Boundary()

	},
	/**
	 * 信息窗口 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
	 * @param    {[String]}			text 			信息窗口所显示的文字		       必填
	 * @param    {[Object]}			opts			信息窗口样式			       	   必填
     * @return   {[Object]}          	    		[ICON 实例化对象]
	 * 
	 */
	InfoWindow (text, opts){

		return new BMap.InfoWindow(text, opts)

	},
	/**
	 * 右键菜单 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
     * @return   {[Object]}          	    		[ICON 实例化对象]
	 * 
	 */
	ContextMenu (){

		return new BMap.ContextMenu()

	},
	/**
	 * 右键菜单项 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
     * @return   {[Object]}          	    		[ICON 实例化对象]
	 * 
	 */
	ContextMenuItem (text, callback){

		return new BMap.MenuItem(text, callback)

	},
	/**
	 * 地址解析器 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
     * @return   {[Object]}          	    		[ICON 实例化对象]
	 * 
	 */
	Geocoder (){

		return new BMap.Geocoder()

	},
	/**
	 * 坐标转换器 实例
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
     * @return   {[Object]}          	    		[ICON 实例化对象]
	 * 
	 */
	Convertor (){

		return new new BMap.Convertor()

	},

	

	/**
	 * 清除所有覆盖物
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-27
     * @version  [version]
	 * @param    {[mapObj]}			    地图实例化对象		       必填
     * @return   {[type]}          	    [description]
	 * 
	 */
	Remove (mapObj){

		mapObj.clearOverlays();

	},
	

	/**
     * 初始化地图
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-26
     * @version  [version]
	 * @param    {[String]}			ele    			[地图容器]		必填 	选择器必须为 ID 选择器
	 * @param    {[Number]}			lng	   			[经度]			
	 * @param    {[Number]}			lat				[纬度]
	 * @param    {[Number]}			level			[级别]
	 * @param    {[Boolean]}		isScale			[是否缩放]
	 * @param    {[Boolean]}		isDrag			[是否拖拽]
	 * @param    {[Number]}			minScale		[缩放最小级别]
	 * @param    {[Number]}			maxScale		[缩放最大级别]
     * @return   {[Object]}        	    			[地图实例化对象]
     */
	MapInit (mapOpt){

		let newMapOpt = {
			ele : "hmap",
			lng : "116.4035",
			lat : "39.915",
			level : 8,
			isScale : true,
			isDrag : true,
			minScale : 4,
			maxScale : 28,
			...mapOpt,
		}

		let map = new BMap.Map(newMapOpt.ele, { minZoom: newMapOpt.minScale,maxZoom: newMapOpt.maxScale });

		map.centerAndZoom( this.Point(newMapOpt.lng, newMapOpt.lat), newMapOpt.level);

		// 拖拽
		if( newMapOpt.isDrag ){
			// 开启拖拽
			map.enableDragging();
		}else{
			// 禁止拖拽
			map.disableDragging();
		}
		// 缩放
		if( newMapOpt.isScale ){

			map.enableScrollWheelZoom(true)

		}

		return map

	},
	/**
	 * 移动地图
     * 
     * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-26
     * @version  [version]
	 * @param    {[Object]}		mapObj	    	[地图实例化对象]		必填
	 * @param    {[Number]}		lng				[经度]			   必填
	 * @param    {[Number]}		lat				[纬度]			   必填
     * @return   {[type]}          	    		[undefined]
	 */
	MapMove (mapObj, lng, lat){

		mapObj.panTo( this.Point(lng, lat) )

	},
	/**
	 * 画两点之间的线并且获取该两点间距离
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-26
     * @version  [version]
	 * @param    {[Object]}		mapObj			    [地图实例化对象]		       必填
	 * @param    {[Array]}		lnglat_start		[开始点的经纬度]			   必填
	 * @param    {[Array]}		lnglat_end			[结束点的经纬度]			   必填
     * @return   {[Number]}			          	    [两点之间的距离]
	 */
	MapDotToDot ( mapObj, lnglat_start, lnglat_end ){

		let startPointer = this.Point( ...lnglat_start );

		let endPointer = this.Point( ...lnglat_end );

		let dir = mapObj.getDistance( startPointer, endPointer ).toFixed(2);

		let stockStyle = {
			strokeColor:"blue", 
			strokeWeight:6, 
			strokeOpacity:0.5
		}

		var polyline = this.Polyline([startPointer, endPointer], stockStyle);  //定义折线
		
		mapObj.addOverlay(polyline);     //添加折线到地图上

		return dir;

	},
	/**
	 * 增加/删除工具条，比例尺控件
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-27
     * @version  [version]
	 * @param    {[Object]}			mapObj			    [地图实例化对象]		       必填
	 * @param    {[Boolean]}		isAdd				[是否添加控件]
	 * @param    {[Boolean]}		isSimple			[是否添加精简版]
     * @return   {[type]}          	    				[undefined]
	 * 
	 * 备注：isAdd 为 true 后 isSimple 才可以使用
	 */
	MapSwitchControl (mapObj, isAdd = true, isSimple = false){
		// 左上角，添加比例尺
		let top_left_control = new BMap.ScaleControl({
			anchor : BMAP_ANCHOR_TOP_LEFT
		})
		// 左少角，添加默认缩放平移控件
		let top_left_navigation = new BMap.NavigationControl();
		// 右上角，仅包含平移和缩放按钮
		let top_right_navigation = new BMap.NavigationControl({
			anchor : BMAP_ANCHOR_TOP_RIGHT,
			type : BMAP_NAVIGATION_CONTROL_SMALL
		})
		/*
			缩放控件type有四种类型:
			BMAP//_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮
		*/
		//添加控件和比例尺
		let add_control = () => {
			if( isSimple ){
				mapObj.addControl(top_right_navigation)
			}else{
				mapObj.addControl(top_left_control);        
				mapObj.addControl(top_left_navigation); 
			}
		}
		//移除控件和比例尺
		let delete_control = () => {
			mapObj.removeControl(top_left_control);     
			mapObj.removeControl(top_left_navigation);  
			mapObj.removeControl(top_right_navigation); 
		}

		isAdd ? add_control() : delete_control();

	},
	/**
	 * 添加定位控件
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-27
     * @version  [version]
	 * @param    {[Object]}			mapObj			    	[地图实例化对象]		       必填
     * @return   {[Object]}          						[Promise实例对象]
	 * 备注：promise 成功回调函数    =>    返回具体定位到的地址
	 * 				失败回调函数    =>	   返回错误信息
	 */
	MapCurPos (mapObj){

		// 添加定位控件
		let geolocationControl = new BMap.GeolocationControl();

		mapObj.addControl(geolocationControl);

		return new Promise( (resolve, reject) => {

			geolocationControl.addEventListener("locationSuccess", function(e){
				// 定位成功事件
				let address = `${e.addressComponent.province}${e.addressComponent.city}${e.addressComponent.district}${e.addressComponent.street}${e.addressComponent.streetNumber}`
		
				resolve(address);
	
			});

			geolocationControl.addEventListener("locationError",function(e){
				// 定位失败事件
				reject(e.message);
			});

		} )

	},
	/**
	 * 添加标识物
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-27
     * @version  [version]
	 * @param    {[Object]}			  mapObj 			 [地图实例化对象]		       			必填
	 * @param    {[Number]}			  lng 	             [经度]		       
	 * @param    {[Number]}			  lat   			 [纬度]	
	 * @param    {[Boolean]}		  isAnimate   		 [是否跳动]
	 * @param    {[Boolean]}		  isDrag   		 	 [是否拖拽]
	 * @param    {[Boolean/Object]}	  markerStyle   	 [自定义标识物样式]						true -> 默认的样式 / JSON -> 自定义样式		       
     * @return   {[Object]}          	    			 [标识物实例对象]
	 */
	MapAddMarker (mapObj, lng = 116.404, lat = 39.915, isAnimate = false, isDrag = false, markerStyle){
		// 创建标识物
		let marker = null;

		if( markerStyle ){						// 自定义标识物样式
				
			let newMarkerStyle = {
				icon : "http://lbsyun.baidu.com/jsdemo/img/fox.gif", 
				width : 300, 
				height : 157,
				...markerStyle
			}
			let myIcon = this.Icon( newMarkerStyle.icon, this.Size( newMarkerStyle.width, newMarkerStyle.height ) );

			marker = this.Marker( this.Point( lng, lat ), { icon: myIcon } );

		}else{									// 默认标识物
			marker = this.Marker( this.Point( lng, lat ) )
		}
		
		// 标识物是否跳动
		isAnimate ? marker.setAnimation( BMAP_ANIMATION_BOUNCE ) : "";
		// 标识物是否拖拽
		isDrag ? marker.enableDragging() : marker.disableDragging();

		// 添加标识物
		mapObj.addOverlay( marker )

		return marker

	},
	/**
	 * 添加圆
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-27
     * @version  [version]
	 * @param    {[Object]}			   mapObj   		 [地图实例化对象]				       必填
	 * @param    {[Number]}			   lng				 [经度]
	 * @param    {[Number]}			   lat 				 [纬度]
	 * @param    {[Number]}			   radius 			 [半径]		       
     * @return   {[type]}          	    				 [圆实例对象]
	 */
	MapAddCircle (mapObj, lng = 116.404, lat = 39.915, radius = 50000, stockStyle){
		
		let mapCircle = this.Circle( this.Point( lng, lat ), radius, stockStyle );
		// 增加圆
		mapObj.addOverlay(mapCircle);		

		return mapCircle

	},
	/**
	 * 添加多边形					？？？？？
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-27
     * @version  [version]
	 * @param    {[Object]}				 	mapObj		    地图实例化对象		       必填
	 * @param    {[Array]}					pointArr		多边形角对应点集合		    必填
     * @return   {[type]}          	    [description]
	 * 
	 * 备注： pointArr => 116.404, 39.915; 116.504, 40.015;
	 */
	MapAddPolygon (mapObj, points, stockStyle, isEdit = false){

		var newStockStyle = {

			strokeColor:"blue", 
			strokeWeight:2, 
			strokeOpacity:0.5,
			...stockStyle
		}

		let polygon = this.Polygon( points, newStockStyle );
		// 是否编辑
		isEdit ? polygon.enableEditing() : polygon.disableEditing()
		// 增加面
		mapObj.addOverlay(polygon);

		return polygon

	},
	/**
	 * 设置地图放大 / 缩小
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-27
     * @version  [version]
	 * @param    {[Object]}			mapObj			    地图实例化对象		           必填
	 * @param    {[Number]}			num				    地图放大/缩放级别		       必填
     * @return   {[type]}          	    				[description]
	 * 
	 */
	MapSetScale (mapObj, num){

		mapObj.setZoom(num);

	},
	/**
	 * 标识物显示 / 隐藏
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-27
     * @version  [version]
	 * @param    {[Object]}			markerObj			标识物实例对象		       必填
     * @return   {[type]}          	    				[description]
	 * 
	 */
	MapMarkerIsShow (markerObj, isShow){

		isShow ? markerObj.show() : markerObj.hide();

	},
	/**
	 * 标识物是否拖拽
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
	 * @param    {[Object]}			markerObj			标识物实例对象		       必填
     * @return   {[type]}          	    				[description]
	 * 
	 */
	MapMarkerIsDrag (markerObj, isDrag){

		isDrag ? markerObj.enableDragging() : markerObj.disableDragging();

	},
	/**
	 * 标识物是否跳动
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-13
     * @version  [version]
	 * @param    {[Object]}			markerObj			标识物实例对象		       必填
     * @return   {[type]}          	    				[description]
	 * 
	 */
	MapMarkerIsAnimate (markerObj, isAnimate){

		isAnimate ? markerObj.setAnimation( BMAP_ANIMATION_BOUNCE ) : "";

	},
	/**
	 * 添加文字标签
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-27
     * @version  [version]
	 * @param    {[Object]}			markerObj		   	标识物实例对象		       		必填
	 * @param    {[String]}			text		    	经度					       必填
	 * @param    {[Number]}			lng			    	经度					       
	 * @param    {[Number]}			lat			    	纬度		    			   
	 * @param    {[Object]}			labelStyle		    label 样式
	 * @param    {[Boolean]}		isShow		    	label 是否显示			
     * @return   {[type]}          	    				[undefined]
	 * 
	 * 备注 ： isShow => "block" / "none"
	 */
	MapAddTextLabel (markerObj, text, lng = 116.417854, lat = 39.921988, labelStyle, isShow = "block" ){

		let lStyle = {
			left : 30,
			top : -30,
			color : "red",
			fontSize : "12px",
			height : "20px",
			lineHeight : "20px",
			fontFamily:"微软雅黑",

			...labelStyle
		}

		let opts = {
			// 指定文本标注所在的地理位置
			position : this.Point(lng, lat),
			//设置文本偏移量					
			offset   : this.Size(lStyle.left, lStyle.top)    	
		}
		
		// 创建文本标注对象
		let label = this.Label(text, opts);  

		label.setStyle({
			"display" : isShow,
			...lStyle
		});

		markerObj.setLabel(label);   

	},
	/**
	 * 根据标注文字删除特定点
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-27
     * @version  [version]
	 * @param    {[Object]}			mapObj		   		地图实例对象	 		        必填
	 * @param    {[String]}			labelText		    label 文字内容
     * @return   {[type]}          	    				[undefined]
	 * 
	 */
	MapDeletePoint (mapObj, labelText){

		var allOverlay = mapObj.getOverlays();

		for (var i = 0; i < allOverlay.length -1; i++){

			if(allOverlay[i].getLabel().content == labelText){

				mapObj.removeOverlay(allOverlay[i]);

				return false;

			}

		}

	},
	/**
	 * 获取标识物信息
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-28
     * @version  [version]
	 * @param    {[Object]}			markerObj		   	遮罩层实例对象		       必填
     * @return   {[type]}          	    				[undefined]
	 * 
	 */
	MapMarkerLngLat (markerObj){

		return markerObj.getPosition()

	},
	/**
	 * 移除标识物信息
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-02
     * @version  [version]
	 * @param    {[Object]}			mapObj		   		地图实例对象		       必填
	 * @param    {[Object]}			markerObj		   	遮罩层实例对象		       必填
     * @return   {[type]}          	    				[undefined]
	 * 
	 */
	MapMarkerRemove (mapObj, markerObj){

		mapObj.removeOverlay(markerObj);

	},
	/**
	 * 添加行政区划
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-06-28
     * @version  [version]
	 * @param    {[Object]}			mapObj		   		地图实例对象		       必填
	 * @param	 {[String]}			boundary			行政区					   必填		
     * @return   {[type]}          	    				[undefined]
	 * 
	 */
	MapAddBoundary (mapObj, boundary){

		let bdary = this.Boundary();
		//获取行政区域
		bdary.get(boundary, (rs) => {       
			//清除地图覆盖物
			this.Remove(mapObj);         
			//行政区域的点有多少个
			let count = rs.boundaries.length;

			if (count === 0) {
				alert('未能获取当前输入行政区域');
				return ;
			};
			
			let pointArray = [];

			let pointsStr = '';
			  
			for (let i = 0; i < count; i++) {
				//建立多边形覆盖物
				let ply = this.Polygon(rs.boundaries[i]);

				pointsStr += rs.boundaries[i]

				pointArray = pointArray.concat(ply.getPath());
				

			}
			//添加多边形覆盖物
			this.MapAddPolygon(mapObj, pointsStr);

			mapObj.setViewport(pointArray);    //调整视野            

		});   

	},
	/**
	 * 信息窗口
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-02
     * @version  [version]
	 * @param    {[Object]}			mapObj		   		地图实例对象		       必填
	 * @param    {[Object]}			infoOpt		   		信息窗口样式		       必填
	 * @param    {[Number]}			lng				   	经度				       必填
	 * @param    {[Number]}			lat			   		纬度				       必填
     * @return   {[object]}          	    			[信息窗口实例化对象]
	 * 
	 */
	MapInfoWindow (mapObj, infoOpt, lng, lat){

		let opts = {
			width : 200,     	
			height: 100,     	
			title : "中央5套" , 	
			enableMessage:true, //设置允许信息窗发送短息
			message:"看世界杯吧~~~~",
			content : "地址：北京市东城区王府井大街88号乐天银泰百货八层",
			...infoOpt
		}
		// 创建信息窗口对象 
		let infoWindow = this.InfoWindow( opts.content, opts );  
		//开启信息窗口
		mapObj.openInfoWindow(infoWindow, this.Point(lng, lat)); 

		return infoWindow

	},
	/**
	 * 右键菜单
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-02
     * @version  [version]
	 * @param    {[Object]}			 Obj			   	 地图/覆盖物 实例对象		  必填
	 * @param	 {[Array]}			 menuItem			 菜单项数组  [ {text : "123", callback : function(){alert(1)}} ]
     * @return   {[type]}          	    				 [undefined]
	 * 
	 */
	MapRightMenu (Obj, menuItem){

		let menu = this.ContextMenu();

		let txtMenuItem = [
			...menuItem
		];
		
		for(let i=0; i < txtMenuItem.length; i++){

			menu.addItem( this.ContextMenuItem( txtMenuItem[i].text, txtMenuItem[i].callback, 100 ) );

		}

		Obj.addContextMenu(menu);

	},
	/**
	 * 设置鼠标样式
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-03
     * @version  [version]
	 * @param    {[Object]}			mapObj		   		地图 实例对象		       必填
	 * @param    {[String]}			url			   		鼠标样式图片链接地址       必填
     * @return   {[type]}          	    			[undefined]
	 * 
	 */
	MapSetMouseStyle (mapObj, url){

		mapObj.setDefaultCursor(`url(${url})`);

	},
	/**
	 * 百度地图初始化完成
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-03
     * @version  [version]
	 * @param    {[Object]}			mapObj		   		地图 实例对象		       必填
	 * @param    {[Function]}		fn		   			回调函数			       必填
     * @return   {[type]}          				    [undefined]
	 * 
	 */
	MapReady (mapObj, fn){

		mapObj.addEventListener('tilesloaded', () => {

			fn && fn();

		})

	},
	/**
	 * 注销事件
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-03
     * @version  [version]
	 * @param    {[Object]}			obj			   		地图/覆盖物 实例对象		       必填
	 * @param    {[String]}			eventName		    事件名字						  必填
	 * @param    {[String]}         eventFn				函数名字						  必填
     * @return   {[type]}          	    				[undefined]
	 * 
	 */
	MapRemoveEvent (obj, eventName, eventFn){

		eventFn ? obj.removeEventListener( eventName, eventFn ) : obj.removeEventListener( eventName )

	},
	/**
	 * 地址解析
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-03
     * @version  [version]
	 * @param    {[String]}			addr		   		详细地址		    			   必填
	 * @param    {[String]}			city		   		详细地址对应所在城市		       必填
     * @return   {[type]}          	    				[undefined]
	 * 
	 */
	MapAddrToLngLat (addr, city){

		return new Promise( (resolve, reject) => {

			// 创建地址解析器实例
			let myGeo = this.Geocoder();

			// 将地址解析结果显示在地图上,并调整地图视野
			myGeo.getPoint(addr, (point) => {

				if (point) {

					resolve( point )

				}else{

					reject("您选择地址没有解析到结果!")

				}

			}, city);

		} )

	},
	/**
	 * 逆地址解析
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-03
     * @version  [version]
	 * @param    {[Object]}				point			   		点 实例对象		       必填
	 * 
	 */
	MapLngLatToAddr (point){

		return new Promise( (resolve, reject) => {

			var geoc = this.Geocoder();

			geoc.getLocation(point, function(rs){
				
				resolve(rs)

			});

		} )

	},
	/**
	 * 原始坐标转成百度坐标
	 * 
	 * @Author   mayingwu
     * @Email    516378746@qq.com
     * @DateTime 2018-07-03
     * @version  [version]
	 * @param    {[x]}			   		gps 坐标		       必填
	 * @param    {[y]}			   		gps 坐标		       必填
	 * 
	 */
	MapGpsToB (x, y){

		return new Promise( (resolve, reject) => {

			var ggPoint = this.Point(x,y);

			var convertor = this.Convertor();

			var pointArr = [];

			pointArr.push(ggPoint);

			convertor.translate(pointArr, 1, 5, resolve)

		} )

	},
    
}

export default hbmap