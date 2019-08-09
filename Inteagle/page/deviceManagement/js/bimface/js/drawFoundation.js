var viewToken = "";
var foundationPATH = "https://www.inteagle.com.cn/Inteagle_java/";
//获取viewToken
$.ajax({
	url: foundationPATH + "bim/getViewToken",
	type: "post",
	async: false,
	data: {
		fileId: "1667797368513696"
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

//设置标签初始位置
var position_tag1 = new Object();
position_tag1 = {
	"x": -257.44981245633204,
	"y": -196.44978038620582,
	"z": -38.52860306932509
};

//标签位置数组
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
						{"id":"021","x":225.27226892646772,"y":226.4214854318168,"z":-38.528603069383585},
						{"id":"022","x":175.9506328196174,"y":217.99000970379512,"z":-38.52860306932509},
						{"id":"023","x":116.56786675980456,"y":206.9759131528266,"z":-38.52860306932509},
						{"id":"024","x":67.5844802826965,"y":199.03250831011349,"z":-38.52860306932509},
						{"id":"025","x":21.309374957859983,"y":188.13713131825736,"z":-38.52860306932509},
						{"id":"026","x":-26.994481976173915,"y":172.43706446274408,"z":-38.52860306932509},
						{"id":"027","x":-85.05591287851936,"y":154.2517381306073,"z":-38.52860306932509},
						{"id":"028","x":-134.91857139563294,"y":137.44478973347603,"z":-38.52860306932509},
						{"id":"029","x":-229.06098535030162,"y":106.46912977632302,"z":-38.52860306932509},
						{"id":"030","x":-277.2304743611268,"y":86.89191117752623,"z":-38.52860306932509}]



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
		
		for(var i=0;i<tag_position_array.length;i++){
			//添加标签
			add3DMarker(tag_position_array[i]);
		}
		

		// 更改初始视角
		changeViewSite(viewer);

	});

	//鼠标单击事件
	viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, function(objectData) {
		console.log("点击模型");
		console.log("objectData----", objectData);
		console.log("相机视野对象", viewer.getCameraStatus());
		
		// console.log("objectData.worldPosition-------------------",objectData.worldPosition);
		//点击添加标签
		// add3DMarker(objectData.worldPosition);
		
		var objectId = objectData.objectId;
		if (objectId == "nd76a5a636-207e-4295-8be9-3fce014fd69d") {
			//跳转到对应圆点的 图表  页面
			window.location.href = "charts.html?id=" + objectId + "&router=foundation";
		}

	});

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
function add3DMarker(position) {
	var marker3dConfig = new Glodon.Bimface.Plugins.Marker3D.Marker3DConfig();
	marker3dConfig.src = "http://static.bimface.com/resources/3DMarker/warner/warner_red.png";
	marker3dConfig.worldPosition = position;
	
	//三维标签的提示
	marker3dConfig.tooltip = "测斜仪点位:"+position.id;
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
