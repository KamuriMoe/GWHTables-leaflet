// var map;
//     function initMap(){
//         map = L.map('map', {
//         crs: L.CRS.EPSG3857,
//         center: [28.71814, 115.8256],
//         minZoom: 1,
//         maxZoom: 18,
//         zoom: 16,
//     });
//         addBaseLayer();
//     }
//
//     function addBaseLayer(){
//         var option = {
//             maxZoom: 17,
//             minZoom: 1,
//             subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
//             attribution:
//                 "<a target='_blank' href='https://www.tianditu.gov.cn/'>天地图</a> ",
//
//         }
//         L.tileLayer('https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=天地图key', option).addTo(map);
//         L.tileLayer('https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=天地图key', option).addTo(map);
//
//     }
// initMap()
var map = L.map('map', {
    //参考坐标系
    crs: L.CRS.EPSG3857,
    //显示中心
    center: [28.71814, 115.8256],
    //最小显示等级
    minZoom: 1,
    //最大显示等级
    maxZoom: 18,
    //当前显示等级
    zoom: 16,
});
//地图图层
//天地图矢量图层
var vecLayer = L.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610", {noWrap: true});
//天地图矢量注记图层
var cvaLayer = //L.tileLayer("https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}", { noWrap: true });
    L.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610", {noWrap: true});
//天地图影像图层
var imgLayer = L.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610", {noWrap: true});
//天地图影像注记图层
var ciaLayer = L.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610", {noWrap: true});
//矢量图层组
var vecLayerGroup = L.layerGroup([vecLayer, cvaLayer]);
//影像图层组
var imgLayerGroup = L.layerGroup([imgLayer, ciaLayer]);
//谷歌
var newgoogle = L.tileLayer("https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}");
//高德矢量
var gaodevec = L.tileLayer("https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}");//高德影像
var gaodeimg = L.tileLayer("http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}");
var gaodecia = L.tileLayer("http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}");
var gaodeimgGroup = L.layerGroup([gaodeimg, gaodecia])
//展示图层组
var baseLayers = {
    "高德矢量": gaodevec,
    "高德影像": gaodeimgGroup,
    "天地图矢量": vecLayerGroup,
    "天地图影像": imgLayerGroup,
    "google地形": newgoogle
};
//初始时加载矢量图层组
map.addLayer(gaodevec);
//添加图层组控件
L.control.layers(baseLayers).addTo(map);
var styleEditor = L.control.styleEditor({
    position: "topleft",
    useGrouping: false,
    openOnLeafletDraw: true,

});
map.addControl(styleEditor);
map.pm.addControls({
    drawMarker: false,
    drawRectangle: false,
    drawPolygon: true,
    editPolygon: true,
    splitMode: true,
    deleteLayer: false,
});
map.pm.setLang("zh");