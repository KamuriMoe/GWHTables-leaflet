class Tables {
    Attrs={

    };
    constructor(id) {
        this.eleattrs = this.Attrs
        this.tabl = '<table class="attributetable" id="table_" cellspacing="10" align="center"><tbody><tr id="vname" align="center"><td>名称</td><td><button onclick="">隐藏</button></td></tr><tr id="values" align="center" ><td></td><td><button onclick="">修改</button></td></tr></tbody>'
    this.tabl += '<tbody id="ats" hidden="hidden"><tr align="center" style="height: 20px"><td colspan="10">属性编辑</td></tr><tr align="center"><td class="_colspan">对象类型</td><td><select><option value="well">井</option><option value="area">区域</option><option value="boundary">边界</option></select></td></tr><tr><td colspan="10"><form id="atsc"></form></td></tr></tbody></table>'
        $('body').append('<div id="' + id + '"><div id="tabs"><ul><li><a href="#tabs-1">展示页</a></li><li><a href="#tabs-2">修改页</a></li></ul><div id="tabs-1">'+this.tabl+'</div><div id="tabs-2"></div></div></div>')

        //$('#'+id+'>div').css({'border':'dashed 3px black','height':'100%','width':'45%','float':'left'})
        this.main = $('#' + id);
        this.tabs = $('#tabs');
        this.tabs.css('height','-webkit-fill-available')
        this.init();
    }
    init() {
        this.main.dialog({
            autoOpen: false,  //设置对话框打开的方式 不是自动打开
            show: 'blind',    //打开时的动画效果
            hide: 'blind',    //关闭是的动画效果
            modal: false,          //true代表运用遮罩效果
            buttons: {
                '修改': function () {
                }
            },
            draggable: true,   //是否可以拖动的效果  true可以拖动  默认值是true    ，false代表不可以拖动
            //closeOnEscape:false,   //是否采用esc键退出对话框，如果为false则不采用 ，true则采用
            title: '属性值增添与编辑',    //对话框的标题
            position: {my: 'center', at: 'center', of: window},         //对话框打开的位置，默认center，有top、left、right、center、bottom
            width: 1000,      //设置对话框的宽度
            height: 600,     //设置对话框的高度
            resizable: true,   //是否可以改变对话框的尺寸的操作，默认true
            create: function (event, ui) {
                console.log(event, ui)
                $(event.target).parents('[tabindex]').css('z-index', '1000');
            }
        });
    }
    showmain() {
        this.main.dialog("open");
        this.tabs.tabs({})
    }
    setAttrs(name){

    }
    getAttrs(){
        return this.eleattrs
    }

}
//属性输入输出

function save() {

}
function read() {

}


//init
var numsimulation = (function () {
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
//属性表格实例化
    var tables = new Tables('Table')
//扩展 线特征属性
    L.Polyline.include({
        tables: {
            shape: 'Polyline',
        },
        _drawBoundary: function () {
            var ll = this._latlngs[0];
            var lll = this.tables.shape === 'Polygon' ? ll.length : ll.length - 1
            for (var i = 0; i < lll; i++) {
                var lines = new L.Polyline([ll[i], ll[(i + 1) % lll]]).addTo(map);
                lines._path.setAttribute('stroke-width', '6')
                lines._disableMapEvent()
            }
        },
        _disableMapEvent: function () {
            this._path.onmouseover = function () {
                map.doubleClickZoom.disable();
            };
            this._path.onmouseout = function () {
                map.doubleClickZoom.enable();
            };

            if (this.tables.shape === 'Polygon') {
                this._path.setAttribute('stroke-opacity', 0.0);
                this._path.setAttribute('stroke-width', '0')
            }
        },
        _clearSelected: function () {
            var bro = $(this._path).siblings();
            bro.attr('stroke', '#3388ff');
            bro.filter('[fill-rule]').attr('fill', '#3388ff');
        },
        _selected: function () {
            this.on('click', e => {
                this._clearSelected();
                $(e.target._path).not('[stroke-dasharray]').attr('stroke', '#e74c3c');
            })
        },
        _tableShow:function () {
            this.on('dblclick', e => {
                tables.showmain()
            });
        },
        _GWH: function () {
            this._selected();
            this._tableShow();
            //if(this.pm._shape) {console.log(this);this._drawBoundary()};
        }
    });
    L.Polyline.addInitHook('_GWH');

//扩展 多边形特征属性
    L.Polygon.include({
        tables: {
            shape: 'Polygon'
        },
        _selectedPolygon: function () {
            this.on('click', e => {
                this._clearSelected();
                e.target._path.setAttribute('fill', '#e74c3c');
            })
        },

        _GWHPolygon: function () {
            this._selectedPolygon();
            this._tableShow();
            this._drawBoundary();
        }
    });
    L.Polygon.addInitHook('_GWHPolygon');


//添加图层组控件
    L.control.layers(baseLayers).addTo(map);
    // var styleEditor = L.control.styleEditor({
    //     useGrouping: false
    // });
    // map.addControl(styleEditor);
    map.pm.addControls({
        drawMarker: false,
        drawRectangle: false,
        drawPolygon: true,
        editPolygon: true,
        splitMode: true,
        deleteLayer: false,
    });
    map.pm.setLang('zh');

    map.on('pm:create', e => {
        e.layer._disableMapEvent()
        console.log(e)
        // e.layer._path.ondblclick = function () {
        //     tables.showmain()
        // }
    });
    //文件夹

return [map,tables.Attrs]
})();

