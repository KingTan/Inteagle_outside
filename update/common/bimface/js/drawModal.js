var positionPATH = "https://www.inteagle.com.cn/Inteagle_java/";
var viewToken = "";

//获取viewToken
$.ajax({
	url: positionPATH + "bim/getViewToken",
	type: "post",
	async: false,
	data: {
		fileId: "1694602135356896"
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
var foundation_obejct_id_array = ["nd8e12f19d-04fb-4896-b91f-a89d2d613338", "nd0661f425-1761-42ae-88b0-9b465da7f9e6",
	"nd7c51acdf-ea1f-40a3-a7ec-fac8d79dd21e"
];

//房子模型对象ID数组
var house_object_id_array = ["nd8fca4ef6-c14b-40e9-a7f0-dc16d2247d7d", "ndd41922a6-839d-4e83-ab9e-81c568d07c71",
	"nd8223ca3d-bc1c-4cfd-aca7-fa4692fb073a"
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
	loadExternalComponent("https://www.inteagle.com.cn/update/common/bimface/3ds/smallBall.3ds", function(
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
	
		var test_array=["ball_1","ndf1393f5c-c81c-4286-8a68-eeb2ee2961f7"];
		//构件闪烁
		setBlinkColor(viewer, test_array, "#DC143C", 200);
		
		// 更新相机视角
		viewer.render();
	});
}

// 加载失败回调函数
function onSDKLoadFailed(error) {
	console.log(error);
}

// 轨迹模拟
function animation(x, y, z, id) {
	var position = new THREE.Vector3(x, y, z);
	var obejct_id;
	if (viewAdded) {
		if (id == "a") {
			obejct_id = "ball_1";
		} else if (id == "b") {
			obejct_id = "ball_2";
		}
		setTransform(obejct_id, position);
		viewer.render();
	}
	var bink_array = [];
	for (var i = 0; i < foundation_obejct_id_array.length; i++) {
		//计算控件之间的最小距离
		var distance_ball_a = viewer.getMinimumComponentDistanceById("ball_1", foundation_obejct_id_array[i]);
		var distance_ball_b = viewer.getMinimumComponentDistanceById("ball_2", foundation_obejct_id_array[i]);
		if (distance_ball_a.minDistance == 0 || distance_ball_b.minDistance == 0) {
			bink_array.push(foundation_obejct_id_array[i]);
		}
	}
	if (bink_array.length != 0) {
		//构件闪烁
		setBlinkColor(viewer, bink_array, "#DC143C", 200);
	} else {
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
