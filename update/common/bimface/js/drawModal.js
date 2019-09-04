var positionPATH = "https://www.inteagle.com.cn/Inteagle_java/";
var viewToken = "";

//获取viewToken
$.ajax({
	url: positionPATH + "bim/getViewToken",
	type: "post",
	async: false,
	data: {
		fileId: "1676303313388992"
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

//基坑内圈模型对象ID数组
var foundation_obejct_id_array = ["nd5f4a8ac2-3164-4d10-a417-5ef18773ecb5", "nd66a950a4-99ee-4587-8351-93e9ec1c9f2b",
	"nd22cbee7d-57ab-4364-969d-64704abafdf8", "nd4062c6f7-1a63-4da2-a0e7-793d45e9160f",
	"nd4402d36e-16f1-4e76-87c0-10fd267ed10c", "nd5b3ae791-ef7a-4f4b-8b9c-c7f30cf236f4",
	"nd3b4db4c2-4173-4472-b046-1a84a1522971", "ndd11d03a6-49c6-4a7f-b86e-87bb93bd7eb3",
	"nd15e1bf6e-96ae-4dbb-b18b-9be81eb43a68", "nd7e3eead9-da50-43d3-9a9d-5cdabede4c1c",
	"nd1391bc12-8a54-4680-9b94-c5cdeab9590e", "nd1c078e2a-1e3d-454a-bf25-252ace5508b6",
	"nd66b282af-d17d-495b-b0e0-2c004d1c58b0", "nddca8a2dc-7568-435a-b698-1fed2184a0ba",
	"nd56236851-22b7-4026-9b05-a77282885310", "ndae63c5e1-864d-44ce-b0bc-208b91ae6730",
	"ndc7697ff8-91dc-49f7-ab4c-897eba37caa6", "nda9472191-4c13-4ff1-b654-a9f5fb87894a",
	"nd497b571e-bd94-4d33-a410-2ce1465cd8f0"
];

//房子模型对象ID数组
var house_object_id_array = ["nd97c70b83-2b26-4ea7-a325-5d808035ec6a", "nde4a4c681-d965-4eb2-8420-ff415ccbbf01",
	"ndbffec4f7-3461-4dd0-9840-8245b3a4e676"
];

var viewer, animationId, viewAdded = false;
var BimfaceLoaderConfig = new BimfaceSDKLoaderConfig();
BimfaceLoaderConfig.viewToken = viewToken;
BimfaceSDKLoader.load(BimfaceLoaderConfig, onSDKLoadSucceeded, onSDKLoadFailed);

// 加载成功回调函数
function onSDKLoadSucceeded(viewMetaData) {
	loadScript("https://static.bimface.com/attach/341bb8bde7bf4a5898ecdf58c2a476fb_TDSLoader.js");
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
		//结束页面加载图标
		$(".loading").fadeOut();
		//显示内容
		$(".foundation").css("visibility", "visible");

		// //更改背景色
		// solidBackgroundColor(viewer);
		// //构件着色
		// var id_array=["nd16aa0a21-5f91-45d9-8336-8bccbbbd1951"];
		// overrideComponents(viewer,id_array,"#38D5BE");

		// 更改初始视角
		changeViewSite(viewer);
		//加载小球
		load();
	});

	//鼠标单击事件
	viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, function(objectData) {
		console.log("当前点击模型对象-------", objectData);
		var current_object_id = objectData.objectId;
		if (foundation_obejct_id_array.includes(current_object_id)) {
			//基坑内圈模型对象
			//更改颜色
			overrideComponents(viewer, foundation_obejct_id_array, "#38D5BE");
		} else if (house_object_id_array.includes(current_object_id)) {
			//房子模型对象
			//更改颜色
			overrideComponents(viewer, house_object_id_array, "#7CAD7A");
		}
	});
}
/**
 * @param {Object} viewer3D
 * @param {Object} objectName
 * @param {Object} externalObject
 * 添加外部three.js对象
 */
function addExternalObject(viewer3D, objectName, externalObject) {
	viewer3D.addExternalObject(objectName, externalObject);
}
/**
 * @param {Object} viewer3D
 * @param {Object} objectName
 * 删除外部three.js对象
 */
function removeExternalObject(viewer3D, objectName) {
	viewer3D.removeExternalObjectByName(objectName);
}
/**
 * @param {Object} viewer3D
 * 更改背景色、渐变
 */
function gradientBackgroundColor(viewer3D) {
	var color1 = new Glodon.Web.Graphics.Color("#BFEFFF", 0.8);
	var color2 = new Glodon.Web.Graphics.Color("#949494", 0.8);
	viewer3D.setBackgroundColor(color1, color2);
	viewer3D.render();
}
/**
 * @param {Object} viewer3D
 * 更改背景色、纯色
 */
function solidBackgroundColor(viewer3D) {
	var solidColor = new Glodon.Web.Graphics.Color("#01347A", 0.8);
	viewer3D.setBackgroundColor(solidColor);
	viewer3D.render();
}

/**
 * 根据ID来给构件着色
 * @param {Object} viewer3D
 * @param {Object} idArray ID数组
 */
function overrideComponents(viewer3D, idArray, choose_color) {
	var color = new Glodon.Web.Graphics.Color(choose_color, 0.8);
	viewer3D.overrideComponentsColorById(idArray, color);
	viewer3D.render();
}

/**
 * 设置构件闪烁
 * @param {Object} viewer3D
 * @param {Object} obejctIdArray 模型对象ID数组
 * @param {Object} blink_color 闪烁颜色
 * @param {Object} blink_time 闪烁频率 ms
 */
function setBlinkColor(viewer3D,obejctIdArray,blink_color,blink_time) {
	viewer3D.enableBlinkComponents(true)
	viewer3D.addBlinkComponentsById(obejctIdArray);
	viewer3D.setBlinkColor(new Glodon.Web.Graphics.Color(blink_color, 0.8))
	viewer3D.setBlinkIntervalTime(blink_time)
	viewer3D.render();
}
/**
 * @param {Object} viewer3D
 * 清除构件闪烁
 */
function clearAllBlinkComponents(viewer3D) {
	viewer3D.clearAllBlinkComponents();
	viewer3D.render();
}

//加载外部构件
function load(x, y, z) {
	//目前仅支持3ds外部构件
	//https://www.inteagle.com.cn/update/common/bimface/3ds/smallBall.3ds
	//http://127.0.0.1:8848/Inteagle_outside/update/common/bimface/3ds/smallBall.3ds
	loadExternalComponent("http://127.0.0.1:8848/Inteagle_outside/update/common/bimface/3ds/smallBall.3ds", function(
		object) {
		// 添加外部构件，命名为"ball_1"和"ball_2"
		addExternalObject(viewer, "ball_1", object);
		addExternalObject(viewer, "ball_2", object.clone());
		// 调整构件位置
		var tempQuaternion = new THREE.Quaternion();
		tempQuaternion.setFromAxisAngle(new THREE.Vector3(0.0, 0.0, 1.0), 4.6);
		setTransform("ball_1", new THREE.Vector3(x, y, z), new THREE.Vector3(1, 1, 1), tempQuaternion);
		setTransform("ball_2", new THREE.Vector3(120, 200, 20), new THREE.Vector3(1, 1, 1));
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
function animation(x, y, z) {
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

// 对外部构件进行平移、缩放和旋转
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
