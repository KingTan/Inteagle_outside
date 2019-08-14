var viewToken = "";
var foundationPATH = "https://www.inteagle.com.cn/Inteagle_java/";
//获取viewToken
$.ajax({
	url: foundationPATH + "bim/getViewToken",
	type: "post",
	async: false,
	data: {
		fileId: "1668283549107520"
	},
	success: function(res) {
		console.log("res", res);
		if (res.state == 200) {
			viewToken = res.data;
		}
	},
	error: function(badRes) {
		console.log("获取viewToken失败...");
	}
});

var viewer, animationId, viewAdded = false;
//标签对象
var marker;
var BimfaceLoaderConfig = new BimfaceSDKLoaderConfig();
BimfaceLoaderConfig.viewToken = viewToken;
BimfaceSDKLoader.load(BimfaceLoaderConfig, onSDKLoadSucceeded, onSDKLoadFailed);

//添加外部构件
function addExternalObject(viewer3D, objectName, externalObject) {
	// 添加外部three.js对象
	viewer3D.addExternalObject(objectName, externalObject);
}

//删除外部构件
function removeExternalObject(viewer3D, objectName) {
	// 删除外部three.js对象
	viewer3D.removeExternalObjectByName(objectName);
}

//标签位置数组
// 测斜仪
var tag_position_array=[{"id":"001","x":-257.44981245633204,"y":-196.44978038620582,"z":-38.52860306932509},
						{"id":"002","x":-273.0616244862076,"y":-158.02285976763122,"z":-38.52860306933048},
						{"id":"003","x":-286.41009066661917,"y":-120.93518719210668,"z":-38.52860306933555},
						{"id":"004","x":-297.0015016344963,"y": -85.29851647185981,"z":-38.528603069340484},
						{"id":"005","x":-309.2965885919856,"y":-51.67545281290954,"z":-38.52860306934509},
						{"id":"006","x":-318.93908980097785,"y":-17.78013377096835,"z":-38.5286030693499},
						{"id":"007","x":-332.0509974343703,"y":15.875042249428146,"z":-38.52860306935449},
						{"id":"008","x":-220.53932145135417,"y":-207.8777059792655,"z":-38.528603069323545},
						{"id":"009","x":-160.95531154730966,"y":-179.84936941183392,"z":-38.528603069327424},
						{"id":"010","x":-98.0091395455241,"y":-164.03009612115738,"z":-38.52860306932962},
						{"id":"011","x":-27.997177970771656,"y":-127.68156821895849,"z":-38.52860306933463},
						{"id":"012","x":24.385622339933654,"y":-93.81400839900103,"z":-38.52860306933931},
						{"id":"013","x":89.10953941410088,"y":-54.0386324252785,"z":-38.528603069344825},
						{"id":"014","x":141.98670528048885,"y":-18.689495565068466,"z":-38.52860306934971},
						{"id":"015","x":184.21611311166063,"y":7.592906807875044,"z":-38.52860306935332},
						{"id":"016","x":226.62565697745848,"y":34.20082605239544,"z":-38.528603069357004},
						{"id":"017","x":270.8081988416531,"y":62.157738847168496,"z":-38.52860306936088},
						{"id":"018","x":282.9015899093011,"y":99.76569219819464,"z":-38.52860306932509},
						{"id":"019","x":266.97915784563634,"y":146.89113526390173,"z":-38.52860306932509},
						{"id":"020","x":249.75167525826703,"y":193.57989507979545,"z":-38.52860306932509},
						{"id":"021","x":223.5991410202013,"y":227.3572183812224,"z":-37.55680129973532},
						{"id":"022","x":172.2571772347553,"y":218.84472457755416,"z":-37.55680129973411},
						{"id":"023","x":124.19133578722715,"y":211.18865702012653,"z":-37.556801299732996},
						{"id":"024","x":80.2320099171863,"y":202.1033811325909,"z":-37.556801299731795},
						{"id":"025","x":23.42107158670675,"y":187.39649950748168,"z":-37.55680129972976},
						{"id":"026","x":-36.25333320093556,"y":169.6077697209532,"z":-37.55680129972738},
						{"id":"027","x":-97.61562714234371,"y":144.9294401200403,"z":-28.384098300729313},
						{"id":"028","x":-159.0271362021524,"y":128.9261992724951,"z":-37.5568012997217},
						{"id":"029","x":-210.83010847642464,"y":105.6167105090641,"z":-28.035174832557484},
						{"id":"030","x":-281.7007333933955,"y":87.40120061544742,"z":-37.55680129971595},
						{"id":"031","x":-327.1014266055793,"y":60.85344023308755,"z":-37.556801299712326}
						];
//位移管
var wy_tag_array=[{"id":"001","x":-297.34731479680676,"y":-206.49832561822862,"z":-4.092032072036778},
				  {"id":"002","x":-315.85217200148674,"y":-164.6930552808293,"z":-4.620763078710005},
				  {"id":"003","x":-332.38767488834156,"y":-128.09384093035194,"z":-4.7788989124224175},
				  {"id":"004","x":-364.1243363019679,"y":-55.45647745299199,"z":-6.075785387675795},
				  {"id":"005","x":-381.46863675151394,"y":-15.697683473212741,"z":-6.810279912789602},
				  {"id":"006","x":-397.3443240775134,"y":24.844531943426563,"z":-6.950096523545197},
				  {"id":"007","x":-247.21606979023005,"y":-247.9967194287643,"z":-5.944048767529343},
				  {"id":"008","x":-140.10813833750558,"y":-234.00975112550915,"z":-6.7998873874999815},
				  {"id":"009","x":-63.686019881192095,"y":-208.21494004497063,"z":-11.39054336880539},
				  {"id":"010","x":4.859820212186985,"y":-164.5112056328875,"z":-10.821160921466165},
				  {"id":"011","x":57.40831577094987,"y":-132.8098535841999,"z":-8.669309472625631},
				  {"id":"012","x":114.31183889255281,"y":-93.68548664247825,"z":-8.921479106915838},
				  {"id":"013","x":169.31620317974728,"y":-55.58092397408599,"z":-9.347063473113112},
				  {"id":"014","x":209.57149289359648,"y":-26.64188170958875,"z":-10.327409714354555},
				  {"id":"015","x":255.3692258308499,"y":4.245373577442995,"z":-10.148066173823231},
				  {"id":"016","x":300.3761016272349,"y":33.490865888144555,"z":-9.267073748751907},
				  {"id":"017","x":329.9105947654093,"y":106.05910068064092,"z":-9.436267220974377},
				  {"id":"018","x":307.45430123010357,"y":161.6253658521871,"z":-9.83752112745278},
				  {"id":"019","x":289.2970780080569,"y":211.519815181056,"z":-8.57026229474277},
				  {"id":"020","x":229.09686063483565,"y":281.33553116656025,"z":-6.068588889161158},
				  {"id":"021","x":173.10934767724788,"y":274.33049161136796,"z":-6.288253502768023},
				  {"id":"022","x":113.6850526351957,"y":266.41250038537316,"z":-6.5950956827566065},
				  {"id":"023","x":58.193643741344864,"y":262.60408641171256,"z":-4.715441485329408},
				  {"id":"024","x":-1.205390634433649,"y":248.22897479804197,"z":-3.3463979591624184},
				  {"id":"025","x":-58.0820032558563,"y":230.21213634588642,"z":-4.276745166821084},
				  {"id":"026","x":-122.01153919679683,"y":213.55954201500919,"z":-3.259516635233439},
				  {"id":"027","x":-180.49971651861944,"y":192.01722779664698,"z":-4.50501022269941},
				  {"id":"028","x":-236.08084511581367,"y":172.85738245978277,"z":-2.9864425491328457},
				  {"id":"029","x":-307.78139466012436,"y":145.72952867741662,"z":-2.345553430067342},
				  {"id":"030","x":-367.2181101587511,"y":97.23479732293424,"z":-3.19182103746696},
				  {"id":"031","x":-390.2181101587511,"y":67.23479732293424,"z":-3.19182103746696}
				  ];



// 加载成功回调函数
function onSDKLoadSucceeded(viewMetaData) {

	//tdsLoader.js
	loadScript("https://static.bimface.com/attach/341bb8bde7bf4a5898ecdf58c2a476fb_TDSLoader.js");
	var dom4Show = document.getElementById('view');
	var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
	webAppConfig.domElement = dom4Show;

	var app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
	app.addView(viewToken);
	viewer = app.getViewer();

	//三维标签的配置类
	var markerConfig = new Glodon.Bimface.Plugins.Marker3D.Marker3DContainerConfig();
	markerConfig.viewer = viewer;
	marker = new Glodon.Bimface.Plugins.Marker3D.Marker3DContainer(markerConfig);

	viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function() {
		viewAdded = true;
		//自适应屏幕大小
		window.onresize = function() {
			viewer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40);
		}
		
		//测斜仪点位
		//http://127.0.0.1:8848/Inteagle_outside/Inteagle/page/deviceManagement/js/bimface/img/tag/cexie_normal.png
		//https://www.inteagle.com.cn/tag/cexie_normal.png
		var pic_path="http://127.0.0.1:8848/Inteagle_outside/Inteagle/page/deviceManagement/js/bimface/img/tag/cexie_normal.png";
		var tag_type="测斜仪点位";
		
		//位移管
		//http://127.0.0.1:8848/Inteagle_outside/Inteagle/page/deviceManagement/js/bimface/img/tag/weiyi_normal.png";
		//https://www.inteagle.com.cn/tag/weiyi_normal.png
		var wy_pic_path="http://127.0.0.1:8848/Inteagle_outside/Inteagle/page/deviceManagement/js/bimface/img/tag/weiyi_normal.png";
		var wy_tag_type="位移管点位";
		
		for(var i=0;i<tag_position_array.length;i++){
			//添加标签(测斜仪)
			add3DMarker(tag_position_array[i],pic_path,tag_type);
			
			//添加标签(位移管)
			add3DMarker(wy_tag_array[i],wy_pic_path,wy_tag_type);
		}

		// 更改初始视角
		changeViewSite(viewer);

	});
	
	var add_array=[];
	
	var add_id=0;
	
	//鼠标单击事件
	viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, function(objectData) {
		// console.log("点击模型");
		// console.log("objectData----", objectData);
		console.log("相机视野对象", viewer.getCameraStatus());
		// console.log("objectData.worldPosition-------------------",objectData.worldPosition);
		
		add_id++;
		var singleObj={"id":add_id,"x":objectData.worldPosition.x,"y":objectData.worldPosition.y,"z":objectData.worldPosition.z};
		add_array.push(singleObj);
		
		console.log("add_array--------------------",add_array);
		
		var pic_path="http://127.0.0.1:8848/Inteagle_outside/Inteagle/page/deviceManagement/js/bimface/img/tag/cexie_normal.png";
		var tag_type="测斜仪点位";
		//点击添加标签
		add3DMarker(objectData.worldPosition,pic_path,tag_type);
		
		var objectId = objectData.objectId;
		if (objectId == "nd76a5a636-207e-4295-8be9-3fce014fd69d") {
			//跳转到对应圆点的 图表  页面
			window.location.href = "charts.html?id=" + objectId + "&router=foundation";
		}
	});
	
	

}


//加载外部构件
function load(x, y, z) {
	//目前仅支持3ds外部构件
	loadExternalComponent("js/bimface/3ds/smallBall.3ds", function(object) {
		// 添加外部构件，命名为"ball_1"和"ball_2"
		addExternalObject(viewer, "ball_1", object);

		addExternalObject(viewer, "ball_2", object.clone());

		// 调整构件位置
		var tempQuaternion = new THREE.Quaternion();
		tempQuaternion.setFromAxisAngle(new THREE.Vector3(0.0, 0.0, 1.0), 4.6);

		setTransform("ball_1", new THREE.Vector3(-135.60315730639525, -94.53001443728878, -54.178654376890556), new THREE.Vector3(
			0.05, 0.05, 0.05), tempQuaternion);

		setTransform("ball_2", new THREE.Vector3(120, 200, 20), new THREE.Vector3(0.2, 0.2, 0.2));

		console.log("加载外部构件...");

		// 更新相机视角
		viewer.render();
	});
}

// 加载失败回调函数
function onSDKLoadFailed(error) {
	console.log(error);
}

// 轨迹模拟
function animation() {

	if (viewAdded) {
		var position1 = new THREE.Vector3(x, y, z);
		setTransform("ball_1", position1);
		viewer.render();
	}
}


// 加载外部构件
function loadExternalComponent(url, callback) {
	var loader = new THREE.TDSLoader();
	loader.load(url, function(object) {
		callback && callback(object);
	});
};

// 加载js文件
function loadScript(url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.onload = function() {
		callback && callback();
	}
	script.src = url;
	document.head.appendChild(script);
}

// 调整构件位置、大小、角度
function setTransform(name, position, scale, rotation) {
	var group = viewer.getExternalObjectByName(name);
	if (!group)
		return;
	// 调整构件位置
	position = position || (group.position);
	group.position.x = position.x;
	group.position.y = position.y;
	group.position.z = position.z;
	// 调整构件大小
	scale = scale || (group.scale);
	group.scale.x = scale.x;
	group.scale.y = scale.y;
	group.scale.z = scale.z;
	// 调整构件角度
	rotation = rotation || group.quaternion;
	group.setRotationFromQuaternion(rotation);
	group.updateMatrixWorld();
}


//更改视角
function changeViewSite(viewer3D) {
	//获取自己想要的视角信息
	var camera =
		'{"name":"persp","position":{"x":-231.07335244703435,"y":-584.7453692522213,"z":539.0331695950133},"target":{"x":513.6810291459312,"y":1767.89874492815,"z":-1680.0924886488187},"up":{"x":0,"y":-0.0000036732050794449643,"z":0.9999999999932538},"version":1}';

	//设置视角
	viewer3D.setCameraStatus(JSON.parse(camera));
	console.log("更换初始视角");
}

//根据构件ID 使构件透明
function transparentComponents() {
	//构件ID数组
	viewer.transparentComponentsById(["nd7141f0cc-9766-4714-bb1d-fbf35928b060","ndc472e81c-71a0-4569-9dc9-1d798ca8e0cc","nd5461bd9a-9fda-4a7b-ae7c-438e6c220978"]);
	viewer.render();
}

//根据构件ID 还原透明构件
function opaqueComponents() {
	//构件ID数组
	viewer.opaqueComponentsById(["nd7141f0cc-9766-4714-bb1d-fbf35928b060","ndc472e81c-71a0-4569-9dc9-1d798ca8e0cc","nd5461bd9a-9fda-4a7b-ae7c-438e6c220978"]);
	viewer.render();
}


//增加三维标签的方法
function add3DMarker(position,pic_path,tag_type) {
	var marker3dConfig = new Glodon.Bimface.Plugins.Marker3D.Marker3DConfig();
	
	//http://static.bimface.com/resources/3DMarker/warner/warner_red.png
	// http://127.0.0.1:8848/Inteagle_outside/Inteagle/page/deviceManagement/js/bimface/img/tag/cexie_normal.png
	marker3dConfig.src = pic_path;
	marker3dConfig.worldPosition = position;
	marker3dConfig.size=15;
	
	
	//测斜仪点位
	//三维标签的提示
	marker3dConfig.tooltip = tag_type+":"+position.id;
	
	var marker3d = new Glodon.Bimface.Plugins.Marker3D.Marker3D(marker3dConfig);
	marker3d.onClick(function(item) {
		
		//当前选中标签的ID
		var check_tag_id=item.position.id;
		
		//跳转到对应圆点的 图表  页面
		window.location.href = "charts.html?id=" + check_tag_id + "&router=foundation";
		//缩放到该boundingbox
		// viewer.zoomToBoundingBox(boundingbox);
		
		// 点击设置标签
		//获取点击图片的postion
		// var m = item.position;
		// //自己设置一个boundingbox的对象
		// var num = 1.1;
		// var max = m.x * num;
		// var may = m.y * num;
		// var maz = m.z * num;
		// var mix = m.x / num;
		// var miy = m.y / num;
		// var miz = m.z / num;
		// var maxp = new Object();
		// maxp = {
		// 	x: max,
		// 	y: may,
		// 	z: maz
		// };
		// var minp = new Object();
		// minp = {
		// 	x: mix,
		// 	y: miy,
		// 	z: miz
		// };
		// var boundingbox = new Object();
		// boundingbox = {
		// 	max: maxp,
		// 	min: minp
		// };
	})
	marker.addItem(marker3d);
	viewer.render();
}


//模型上显示 图片标签
	// 	viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ComponentsSelectionChanged, function(componentData) {
	// 		if (componentData && componentData.objectId) {
	// 			// 首先创建DrawableContainer
	// 			var drawaleContainerConfig = new Glodon.Bimface.Plugins.Drawable.DrawableContainerConfig();
	// 			drawaleContainerConfig.viewer = viewer;
	// 			var drawableContainer = new Glodon.Bimface.Plugins.Drawable.DrawableContainer(drawaleContainerConfig);
	// 			var imageConfig = new Glodon.Bimface.Plugins.Drawable.ImageConfig();
	// 
	// 			imageConfig.width = 50;
	// 			imageConfig.height = 50;
	// 			// 设置自己的imageUrl
	// 			imageConfig.src = "img/low_bat.png";
	// 			// 通过selection change可以得到构件ID和坐标
	// 			imageConfig.worldPosition = componentData.worldPosition;
	// 			var image = new Glodon.Bimface.Plugins.Drawable.Image(imageConfig);
	// 
	// 			//图片的点击事件
	// 			image.onClick(function() {
	// 				var id = image.id;
	// 				alert(id);
	// 			});
	// 
	// 			//添加image
	// 			drawableContainer.addItem(image);
	// 
	// 			console.log("加载图片标签....");
	// 		}
	// 	});