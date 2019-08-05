var positionPATH = "https://www.inteagle.com.cn/Inteagle_java/";
var viewToken = "";

//获取viewToken
$.ajax({
	url: positionPATH + "bim/getViewToken",
	type: "post",
	async: false,
	data: {
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

//更改视角
function changeViewSite(viewer3D) {
	// viewer3D.addEventListener("ViewAdded", function() {
		//获取自己想要的视角信息
		var camera =
			'{"name":"persp","position":{"x":362,"y":-1094,"z":300},"target":{"x":79,"y":-23,"z":-64},"up":{"x":0,"y":0,"z":9},"version":1}';
		//设置视角
		viewer3D.setCameraStatus(JSON.parse(camera));
		//手动render()
		viewer3D.render();
		console.log("更换初始视角");
	// })
}

function onSDKLoadSucceeded(viewMetaData) {
	//http://static.bimface.com/attach/341bb8bde7bf4a5898ecdf58c2a476fb_TDSLoader.js

	loadScript("js/bimface/js/tdsLoader.js");
	var dom4Show = document.getElementById('view');
	var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
	webAppConfig.domElement = dom4Show;

	var app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
	app.addView(viewToken);
	viewer = app.getViewer();
	//3D模型加载完毕事件
	viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function() {
		viewAdded = true;
		//自适应屏幕大小
		window.onresize = function() {
			viewer3D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40)
		}
		console.log("BimFace SDK加载完成...");
		
		//切换视角
		changeViewSite(viewer);
	});

	//鼠标单击事件
	viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, function(objectData) {
		console.log("点击模型");
		console.log(objectData);
		console.log(objectData.worldPosition)
	});
}

//加载外部构件
function load(x, y, z) {
	console.log("加载外部组件...");
	//http://static.bimface.com/attach/32d6b03412d641bb81a6e23f854e47fe_car.3ds
	//js/bimface/3ds/smallBall.3ds
	//目前仅支持3ds外部构件
	loadExternalComponent("js/bimface/3ds/smallBall.3ds", function(object) {
		addExternalObject(viewer, "car1", object);
		var tempQuaternion = new THREE.Quaternion();
		tempQuaternion.setFromAxisAngle(new THREE.Vector3(0.0, 0.0, 0.0), 4.6);
		setTransform("car1", new THREE.Vector3(x, y, z), new THREE.Vector3(2, 2, 2), tempQuaternion);
		// viewer.setView("Home");
		viewer.render();
		// disableButton("loadBtn");
		// enableButton("animationBtn");
	});
};

//轨迹模拟
function animation(x, y, z) {
	if (viewAdded) {
		var position1 = new THREE.Vector3(x, y, z);
		setTransform("car1", position1);
		viewer.render();
		disableButton("animationBtn");
		enableButton("removeBtn");
	}
}

//删除外部构件
function remove() {
	removeExternalObject(viewer, "car1");
	cancelAnimationFrame(animationId);
	disableButton("removeBtn");
	enableButton("loadBtn");
}

function disableButton(id) {
	var button = document.getElementById(id);
	if (button != null) {
		button.disabled = true;
		button.style = "background: #AAAAAA";
	}
}

function enableButton(id) {
	var button = document.getElementById(id);
	if (button != null) {
		button.disabled = false;
		button.style = "background: #11DAB7";
	}
}

function loadExternalComponent(url, callback) {
	var loader = new THREE.TDSLoader();
	loader.load(url, function(object) {
		callback && callback(object);
	});
};

function loadScript(url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.onload = function() {
		callback && callback();
	}
	script.src = url;
	document.head.appendChild(script);
}

function setTransform(name, position, scale, rotation) {
	var group = viewer.getExternalObjectByName(name);
	if (!group)
		return;
	position = position || (group.position);
	group.position.x = position.x;
	group.position.y = position.y;
	group.position.z = position.z;
	scale = scale || (group.scale);
	group.scale.x = scale.x;
	group.scale.y = scale.y;
	group.scale.z = scale.z;
	rotation = rotation || group.quaternion;
	group.setRotationFromQuaternion(rotation);
	group.updateMatrixWorld();

}

function createCurve1(x, y, z) {
	return new THREE.CatmullRomCurve3([
		new THREE.Vector3(x, y, z),
		// new THREE.Vector3(0, 10, 0),
		// new THREE.Vector3(30, 200, 0)
	]);
}

function onSDKLoadFailed(error) {
	console.log("Bimface SDK载入失败...");
};
