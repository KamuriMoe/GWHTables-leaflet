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
    useGrouping: false
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
map.pm.setLang('zh');
// map.on('pm:create', e => {
//     console.log(e);
//     if (e.shape === 'Polygon' || e.shape === 'Line') {
//         var layer = e.layer;
//         var ll = layer._latlngs[0];
//         var lll = e.shape === 'Polygon' ? ll.length : ll.length - 1
//         var mainmap = layer._map;
//         //line
//         for (var i = 0; i < lll; i++) {
//             var line = new L.Polyline([ll[i], ll[(i + 1) % ll.length]]).addTo(map);
//
//             line._path.onmouseover = function () {
//                 mainmap.dragging.disable();
//                 mainmap.doubleClickZoom.disable();
//             };
//             line._path.onmouseout = function () {
//                 mainmap.dragging.enable();
//                 mainmap.doubleClickZoom.enable();
//             };
//             line._path.dblclick = function () {
//
//             };
//         }
//         //polygon
//
//
//     }
// });

// map.on('click',e=>{
//     unselect()
// })
// // function unselect() {
// //     // $('path').attr('stroke', '#3388ff');
// //     // $('path').filter("[fill-rule]").attr('fill', '#3388ff');
// // }

function show3d() {
            $("#dialog").dialog({
                   autoOpen:false,  //设置对话框打开的方式 不是自动打开
                   show:"blind",    //打开时的动画效果
                   hide:"blind",    //关闭是的动画效果
                   modal:false,          //true代表运用遮罩效果
//buttons:{"确定":function (){$(this).dialog("close");},"取消":function (){$(this).dialog("close");}},
//                     buttons:[
//                         {
//                             text:"Ok",
//                             click:function (){
//                                 $(this).dialog("close");//关闭对话框
//                             }
//                         },
//                             {
//                             text:"取消",
//                             click:function (){
//                                 $(this).dialog("close");//关闭对话框
//                             }
//                         }],
                    draggable:true,   //是否可以拖动的效果  true可以拖动  默认值是true    ，false代表不可以拖动
                    //closeOnEscape:false,   //是否采用esc键退出对话框，如果为false则不采用 ，true则采用
                    title:"3d模型展示",    //对话框的标题
                    position:{my:'center',at:'center',of:window} ,         //对话框打开的位置，默认center，有top、left、right、center、bottom
                    width:700,      //设置对话框的宽度
                    height:500,     //设置对话框的高度
                    resizable:true,   //是否可以改变对话框的尺寸的操作，默认true
                // 层叠效果
                    drag:function(event,ui){
                            //可以测试出 对话框当前的坐标位置
                        },
                    create: function( event, ui ) {
                         $("#dialog").parents('[tabindex]').css('z-index','1000')
                    }
                });
            //触发连接的事件   当你点击 连接  打开一个对话框
                $("#dialog").dialog("open");  //open参数  作用  打开对话框

            //我怎么获取 我设置的options中的参数值
            //var modalValue = $("#luoyue2").find('.filename').dialog("option","modal");
            //window.console.log(modalValue);

            //我怎么设置options中的参数值
            //$("#luoyue2").find('.filename').dialog("option","modal",false);
}

