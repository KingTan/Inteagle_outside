"use strict";
var version = "2019-7-3-15-32",
    modules = [];
if (!hostConfig) var hostConfig = {
    APIHost: "https://api.bimface.com",
    resourceHost: "https://m.bimface.com",
    staticHost: "https://static.bimface.com",
    dataEnvType: "BIMFACE"
};
void 0 === Object.assign && (Object.assign = function (e) {
    if (void 0 === e || null === e) throw new TypeError("Cannot convert undefined or null to object");
    for (var t = Object(e), a = 1; a < arguments.length; a++) {
        var i = arguments[a];
        if (void 0 !== i && null !== i)
            for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
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
            a = "/Glodon";
        return e.path ? (t.dataEnvType = BimfaceEnvOption.Local, t.url = t.path, t.staticHost = t.sdkPath ||
                transfromPath(t.path), t.resourcePath = transfromPath(t.path), t.path = transfromPath(t.path), a = t.sdkPath ?
                "" : "/jssdk") : e.resourcePath ? (t.dataEnvType = BimfaceEnvOption.Local, t.url = t.resourcePath, t.resourcePath =
                transfromPath(t.resourcePath)) : t.url = e.APIHost + "/inside/databag?viewToken=" + e.viewToken, t.staticHost +=
            a, e.build != BimfaceConfigrationOption.Debug && t.configuration != BimfaceConfigrationOption.Release || (t
                .configuration = ""), t.configuration = t.configuration ? "-" + t.configuration.toLowerCase() : "", t
    },
    loadResource = function (e, t) {
        var a = e.length,
            i = 0,
            n = function n() {
                i++, i == a ? t() : createResource(e[i], n)
            };
        createResource(e[i], n)
    },
    loaded = [],
    createResource = function (e, t) {
        if (loaded.indexOf(e.split("/").pop()) > -1) return void t();
        var a, i = document.getElementsByTagName("head")[0];
        return e.indexOf(".css") > -1 ? (a = document.createElement("link"), a.setAttribute("href", e), a.setAttribute(
            "rel", "stylesheet")) : (a = document.createElement("script"), a.setAttribute("src", e)), a.url = e, i.appendChild(
            a), a.addEventListener("load", function () {
            loaded.push(this.url.split("/").pop()), t && t({
                message: "success"
            })
        }), a.addEventListener("error", function () {
            t && t({
                element: e,
                message: "error"
            })
        }), a
    },
    ajax = function (e) {
        var t, a = {
                type: "get",
                data: null,
                success: null,
                failure: null
            },
            i = Object.assign(a, e);
        t = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), t.onreadystatechange =
            function () {
                if (4 == t.readyState) {
                    var e = t.status;
                    e >= 200 && e < 300 || 0 == e ? i.success && i.success(t.responseText, t.responseXML) : i.failure &&
                        i.failure(e)
                }
            }, t.open(i.type, i.url, i.async), t.send(i.data)
    },
    transformFullUrl = function (e, t) {
        for (var a = 0; a < t.length; a++) t[a] = e + t[a]
    },
    loader = function (e, t, a, i) {
        ajax({
            url: e.url,
            success: function (i) {
                var n, o, r, s = JSON.parse(i),
                    c = e.configuration;
                if (s = s.data || s, "Debug" == e.build) o = "Application", n = "drawingView" == s.renderType ||
                    e.viewType == BimfaceViewTypeOption.DrawingView ? "Drawing" : "Bimface";
                else if (e.viewType == BimfaceViewTypeOption.DrawingView && "drawingView" != s.renderType) {
                    var f = s.subRenders;
                    if (f && 0 != f.length)
                        for (var u = 0; u < f.length; u++) f[u].renderType == BimfaceViewTypeOption.DrawingView &&
                            (n = f[u].jsSDKVersion, o = f[u].jsSDKVersion)
                } else o = s.jsSDKVersion, n = s.jsSDKVersion;
                r = "drawingView" == s.renderType || e.viewType == BimfaceViewTypeOption.DrawingView ? ["/" +
                        n + "/Drawing.css", "/" + n + "/" + e.language + ".js", "/" + n + "/Drawing" + c +
                        ".js", "/" + o + "/Application" + c + ".js"] : ["/" + n + "/Bimface.css", "/" + n +
                        "/thirdparty.js", "/" + n + "/" + e.language + ".js", "/" + n + "/Bimface" + c +
                        ".js", "/" + o + "/Application" + c + ".js"], r = t.concat(r), transformFullUrl(e.staticHost,
                        r), s.databagId = "" + s.databagId, e.path ? s.path = e.path : e.resourcePath && (s
                        .path = e.resourcePath.replace("viewToken", "")), s.sdkPath = e.sdkPath, 0 == r.length ?
                    a(s) : loadResource(r, function () {
                        a(s)
                    })
            },
            failure: function (e) {
                i && i(e)
            }
        })
    },
    formatData = function (e, t) {
        var a = "bimView" == e.renderType ? "3DView" : e.renderType,
            i = (e.subRenders, {
                dataEnvType: t.dataEnvType,
                viewToken: t.viewToken,
                staticHost: t.staticHost,
                APIHost: t.APIHost,
                viewType: a
            });
        return Object.assign(i, e)
    },
    BimfaceSDKLoader = {
        Version: version,
        load: function (e, t, a) {
            window.BimfaceLoaderConfig = e, e.build = BimfaceConfigrationOption.Release;
            var i = getConfig(e);
            loader(i, modules, function (a) {
                t(formatData(a, e))
            }, a)
        }
    };
window.BimfaceSDKLoader = BimfaceSDKLoader;