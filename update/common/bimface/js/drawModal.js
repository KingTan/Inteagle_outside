var positionPATH = "https://www.inteagle.com.cn/Inteagle_java/";
var viewToken = "";

//获取viewToken
$.ajax({
	url: positionPATH + "bim/getViewToken",
	type: "post",
	async: false,
	data: {
		fileId: "1686740782613984"
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
var foundation_obejct_id_array = ["nd79c15f88-3894-40da-a2a9-0b0b1bcf93a3", "nd1a0b571b-5592-4f8b-bbdb-a305cf5494f1",
	"nd5386648f-31cf-4ac1-aea4-ea2d9f7331e4", "nd240da3a0-545e-476b-882a-8b45c8aa41f3",
	"ndd25167cc-fea2-4c2a-8ed6-c45fee6ae168", "nd7e25d779-bcf3-4c67-9d58-709d23043ae0",
	"nd6e4cb6b6-5854-40a4-97d0-13b22f68a2d3", "nd7b207f2a-c0ac-4364-aed6-d3d82b3f3d23",
	"nda1306117-137d-448a-82b6-ce7d5dcf0f20", "ndc354828a-61c6-4c6a-9ac4-58a338bd879c",
	"nda632eb0d-d158-4ffc-9584-00afb8025ab8", "nd5743553f-7ef8-46c3-af78-75267935b6aa",
	"nd230f8372-07c3-4976-9136-74ab72a61a87", "nd425dd224-8806-4d37-8cfc-88b5a25c095a",
	"nd98bb6baa-3121-46d4-9217-3311e5be590e", "nd7d146cd0-60a4-4b10-9377-90baab96968d",
	"nd1027b73f-e681-41ea-a73d-9243ae217d16", "nd53240d52-68bb-4c96-a916-3ab1e13578ec",
	"nd65f77871-e89b-4191-a027-7502e1456133"
];

//房子模型对象ID数组
var house_object_id_array = ["ndbb87e0e7-da76-411f-a456-0ded9d89b6b9", "ndb1190b6e-0381-461a-873e-8ba4533499f5",
	"nd71e0b98d-323b-45a6-b5e0-3d1d58944650"
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

		//更改背景色
		solidBackgroundColor(viewer);
		// 更改初始视角
		changeViewSite(viewer);
		//加载小球
		load();
	});

	//鼠标单击事件
	viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, function(objectData) {

		//当前视口状态
		//viewer.getCameraStatus() 
		console.log("当前点击模型对象-------", objectData);
		var current_object_id = objectData.objectId;

		//全部构件恢复到原来颜色
		viewer.clearOverrideColorComponents();
		if (foundation_obejct_id_array.includes(current_object_id)) {
			//基坑内圈模型对象 更改颜色
			overrideComponents(viewer, foundation_obejct_id_array, "#38D5BE");
		} else if (house_object_id_array.includes(current_object_id)) {
			//清除选中状态
			viewer.clearSelectedComponents();
			//房子模型对象 更改颜色
			overrideComponents(viewer, house_object_id_array, "#DC143C");
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
function setBlinkColor(viewer3D, obejctIdArray, blink_color, blink_time) {
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
function load() {
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
		setTransform("ball_1", new THREE.Vector3(50, 100, -50), new THREE.Vector3(1, 1, 1), tempQuaternion);
		setTransform("ball_2", new THREE.Vector3(120, 200, -50), new THREE.Vector3(1, 1, 1));
		console.log("加载外部构件...");
		// 更新相机视角
		viewer.render();
		
		// var test_array=["ball_1","ndb1190b6e-0381-461a-873e-8ba4533499f5"];
		// //构件闪烁
		// setBlinkColor(viewer, test_array, "#DC143C", 200);
	});
}

// 加载失败回调函数
function onSDKLoadFailed(error) {
	console.log(error);
}

// 轨迹模拟
function animation(x, y, z, id) {
	if (viewAdded) {
		if (id == "a") {
			var position_a = new THREE.Vector3(x, y, z);
			setTransform("ball_1", position_a);
		} else if (id == "b") {
			var position_b = new THREE.Vector3(x, y, z);
			setTransform("ball_2", position_b);
		}
		viewer.render();
	}
	var bink_array = [];
	for (var i = 0; i < foundation_obejct_id_array.length; i++) {
		//计算控件之间的最小距离
		var distance_ball_a = viewer.getMinimumComponentDistanceById("ball_1", foundation_obejct_id_array[i]);
		var distance_ball_b = viewer.getMinimumComponentDistanceById("ball_2", foundation_obejct_id_array[i]);
		if (distance_ball_a.minDistance == 0||distance_ball_b.minDistance == 0) {
			bink_array.push(foundation_obejct_id_array[i]);
		} 
	}
	if (bink_array.length != 0) {
		//构件闪烁
		setBlinkColor(viewer, bink_array, "#DC143C", 200);
	}else{
		//清除闪烁
		clearAllBlinkComponents(viewer);
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
