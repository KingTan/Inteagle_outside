"use strict";
var version = "2019-9-12-15-52";
if (!hostConfig) var hostConfig = {
    APIHost: "https://api.bimface.com",
    resourceHost: "https://m.bimface.com",
    staticHost: "https://static.bimface.com",
    dataEnvType: "BIMFACE"
};
void 0 === Object.assign && (Object.assign = function (e) {
    if (void 0 === e || null === e) throw new TypeError("Cannot convert undefined or null to object");
    for (var t = Object(e), i = 1; i < arguments.length; i++) {
        var n = arguments[i];
        if (void 0 !== n && null !== n)
            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a])
    }
    return t
});
var BimfaceConfigrationOption$1 = Object.freeze({
        Release: "Release",
        Debug: "Debug"
    }),
    BimfaceViewTypeOption$1 = Object.freeze({
        Normal: "Normal",
        DrawingView: "drawingView"
    }),
    BimfaceEnvOption = Object.freeze({
        BIMFACE: "BIMFACE",
        Local: "Local"
    }),
    BimfaceLanguageOption = Object.freeze({
        zh_CN: "zh_CN",
        en_GB: "en_GB",
        sv_SE: "sv_SE"
    }),
    BimfaceSDKLoaderConfig = function () {
        return {
            staticHost: hostConfig.staticHost + "/api",
            APIHost: hostConfig.APIHost,
            language: "zh_CN",
            viewToken: null,
            configuration: BimfaceConfigrationOption$1.Release,
            dataEnvType: hostConfig.dataEnvType || "BIMFACE",
            viewType: BimfaceViewTypeOption$1.Normal
        }
    };
window.BimfaceConfigrationOption = BimfaceConfigrationOption$1, window.BimfaceViewTypeOption = BimfaceViewTypeOption$1,
    window.BimfaceSDKLoaderConfig = BimfaceSDKLoaderConfig, window.BimfaceEnvOption = BimfaceEnvOption;
var transfromPath = function (e) {
        var t = e.split("/");
        return t.pop(), t.join("/") + "/"
    },
    getConfig = function (e) {
        var t = Object.assign({}, e),
            i = "/Glodon";
        return e.path ? (t.dataEnvType = BimfaceEnvOption.Local, t.url = t.path, t.staticHost = t.sdkPath ||
                transfromPath(t.path), t.resourcePath = transfromPath(t.path), t.path = transfromPath(t.path), i = t.sdkPath ?
                "" : "/jssdk") : e.resourcePath ? (t.dataEnvType = BimfaceEnvOption.Local, t.url = t.resourcePath, t.resourcePath =
                transfromPath(t.resourcePath)) : t.url = e.APIHost + "/inside/databag?viewToken=" + e.viewToken, t.staticHost +=
            i, e.build != BimfaceConfigrationOption.Debug && t.configuration != BimfaceConfigrationOption.Release || (t
                .configuration = ""), t.configuration = t.configuration ? "-" + t.configuration.toLowerCase() : "", t
    },
    loadResource = function (e, t) {
        var i = e.length,
            n = 0,
            a = function a() {
                n++, n == i ? t() : createResource(e[n], a)
            };
        createResource(e[n], a)
    },
    loaded = [],
    createResource = function (e, t) {
        if (loaded.indexOf(e.split("/").pop()) > -1) return void t();
        var i, n = document.getElementsByTagName("head")[0];
        return e.indexOf(".css") > -1 ? (i = document.createElement("link"), i.setAttribute("href", e), i.setAttribute(
            "rel", "stylesheet")) : (i = document.createElement("script"), i.setAttribute("src", e)), i.url = e, n.appendChild(
            i), i.addEventListener("load", function () {
            loaded.push(this.url.split("/").pop()), t && t({
                message: "success"
            })
        }), i.addEventListener("error", function () {
            t && t({
                element: e,
                message: "error"
            })
        }), i
    },
    ajax = function (e) {
        var t, i = {
                type: "get",
                data: null,
                success: null,
                failure: null
            },
            n = Object.assign(i, e);
        t = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), t.onreadystatechange =
            function () {
                if (4 == t.readyState) {
                    var e = t.status;
                    e >= 200 && e < 300 || 0 == e ? n.success && n.success(t.responseText, t.responseXML) : n.failure &&
                        n.failure(e)
                }
            }, t.open(n.type, n.url, n.async), t.send(n.data)
    },
    getMetadata = function (e, t, i) {
        ajax({
            url: e,
            success: function (e) {
                var t = JSON.parse(e);
                t = t.data || t, i && i(t)
            },
            failure: function (e) {
                t && t(e)
            }
        })
    },
    getVersion = function (e, t) {
        var i, n;
        if ("Debug" == t.build) n = "Application", i = "drawingView" == e.renderType || t.viewType ==
            BimfaceViewTypeOption.DrawingView ? "Drawing" : "Bimface";
        else if (t.viewType == BimfaceViewTypeOption.DrawingView && "drawingView" != e.renderType) {
            var a = e.subRenders;
            if (a && 0 != a.length)
                for (var o = 0; o < a.length; o++) a[o].renderType == BimfaceViewTypeOption.DrawingView && (i = a[o].jsSDKVersion,
                    n = a[o].jsSDKVersion)
        } else n = e.jsSDKVersion, i = e.jsSDKVersion;
        return {
            ui: n,
            sdk: i
        }
    },
    loaderPreProcessing = function (e, t, i) {
        getMetadata(e.url, i, function (i) {
            var n = getVersion(i, e);
            window.bimfaceStaticHost = e.staticHost + "/" + n.sdk;
            var a = {
                    metadata: i,
                    options: e,
                    successCb: t,
                    sdkVersion: n.sdk,
                    uiVersion: n.ui
                },
                o = bimfaceStaticHost + "/bimface.index.js";
            loadResource([o], function () {
                postProcessing(a)
            })
        })
    },
    formatData = function (e, t) {
        var i = "bimView" == e.renderType ? "3DView" : e.renderType,
            n = (e.subRenders, {
                dataEnvType: t.dataEnvType,
                viewToken: t.viewToken,
                staticHost: t.staticHost,
                APIHost: t.APIHost,
                viewType: i
            });
        return Object.assign(n, e)
    },
    BimfaceSDKLoader = {
        Version: version,
        load: function (e, t, i) {
            window.BimfaceLoaderConfig = e, void 0 == e.build && (e.build = BimfaceConfigrationOption.Release);
            var n = getConfig(e);
            loaderPreProcessing(n, function (i) {
                t(formatData(i, e))
            }, i)
        }
    };
window.BimfaceSDKLoader = BimfaceSDKLoader;