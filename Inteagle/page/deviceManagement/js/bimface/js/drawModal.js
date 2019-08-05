var positionPATH = "https://www.inteagle.com.cn/Inteagle_java/";
var viewToken = "";

//获取viewToken
$.ajax({
	url: positionPATH + "bim/getViewToken",
	type: "post",
	async: false,
	data: {
		//1660625452746048
		fileId: "1660625452746048"
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

var BimfaceLoaderConfig = new BimfaceSDKLoaderConfig();
BimfaceLoaderConfig.viewToken = viewToken;
BimfaceSDKLoader.load(BimfaceLoaderConfig, onSDKLoadSucceeded, onSDKLoadFailed);

function addExternalObject(viewer3D, objectName, externalObject) {
	// 添加外部three.js对象
	viewer3D.addExternalObject(objectName, externalObject);
}

function removeExternalObject(viewer3D, objectName) {
	// 删除外部three.js对象
	viewer3D.removeExternalObjectByName(objectName);
}

// 加载成功回调函数
function onSDKLoadSucceeded(viewMetaData) {
	
	//tdsLoader.js
	//http://static.bimface.com/attach/341bb8bde7bf4a5898ecdf58c2a476fb_TDSLoader.js
	loadScript("http://static.bimface.com/attach/341bb8bde7bf4a5898ecdf58c2a476fb_TDSLoader.js");
	var dom4Show = document.getElementById('view');
	var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
	webAppConfig.domElement = dom4Show;

	var app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
	app.addView(viewToken);

	viewer = app.getViewer();
	
	viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function() {
		viewAdded = true;
		//自适应屏幕大小
		window.onresize = function() {
			viewer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40);
		}
		
		// 更改初始视角
		changeViewSite(viewer);
	});
	
	//鼠标单击事件
	viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, function(objectData) {
		console.log("点击模型");
		console.log(viewer.getCameraStatus());
	});
}

//加载外部构件
function load(x,y,z) {
	//目前仅支持3ds外部构件
	loadExternalComponent("js/bimface/3ds/smallBall.3ds", function(object) {
		// 添加外部构件，命名为"ball_1"和"ball_2"
		addExternalObject(viewer, "ball_1", object);

		addExternalObject(viewer, "ball_2", object.clone());

		// 调整构件位置
		var tempQuaternion = new THREE.Quaternion();
		tempQuaternion.setFromAxisAngle(new THREE.Vector3(0.0, 0.0, 1.0), 4.6);

		setTransform("ball_1", new THREE.Vector3(x, y, z), new THREE.Vector3(2, 2, 2), tempQuaternion);
		
		setTransform("ball_2", new THREE.Vector3(120, 200, 20), new THREE.Vector3(2, 2, 2));
		
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
		'{"name":"persp","position":{"x":672.5828752473132,"y":-1669.7722783428717,"z":1380.4133900769662},"target":{"x":-124.84475810259246,"y":1672.0462026503512,"z":-2355.0520550522974},"up":{"x":0,"y":-0.00000367320528273156,"z":0.9999999999932538},"version":1}';
	//设置视角
	viewer3D.setCameraStatus(JSON.parse(camera));
	console.log("更换初始视角");
}