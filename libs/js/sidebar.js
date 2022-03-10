//属性可选列表
var _attrs = {
    "well": {
        "R": ["半径", 0],
        "Q": ["流量", 0],
        "Z": ["水位", 0]
    },
    "area": {
        "K": ["渗透系数K", 0],
        "S": ["S", 0],
        "M": ["M", 0],
        "T": ["T", 0],
        "Hs":["边界水头",[]]
    },
    "boundary": {
        "Z": ["水位", 0],
        "H": ["水头",0],
        "class": ["类型", ["隔水", "导水"]]
    }
};
map.addControl(styleEditor);

var jss = [[[0]], []];
var jishu = 1;

function layercreate(dict) {
    var ncheck = '';
    ncheck = (!dict.name)? (prompt('输入名称')):dict.name;
    if (ncheck == null) map.removeLayer(jss[jishu][0]);
    else {
        if (ncheck == '') ncheck = '图形' + jishu;
        //dfd = '<input type="checkbox" checked="checked"><li onclick="drawvisible(' + jishu + ')">' +  "这是" + jishu + "</dd>"
        var dfd = '<li type="radio"><a  class="item-name item-name-last c-f " ><i></i><span class="pull-left"><div class="checkbox c-selected"  id="lay_'
        dfd += jishu + '" onclick="drawvisible(\'#lay_\',' + jishu + ')"><input type="checkbox"></div></span><span class="pull-left filename" ondblclick="tableshow(' + jishu + ')">'
        dfd += ncheck + '</span><i onclick="drawvisible(\'#lay_\',' + jishu + ');this.parentNode.parentNode.remove()"></i></a></li>'
        $('#proj_' + proj).append(dfd)
        jss[jishu][2] = dfd;
        jss[jishu][3] = {"name": ncheck, "type": "well"};
        jss.push([]);
        tableshow(jishu);
        hid(jishu);

        if (dict.type) {
            var table = $("#table_" + jishu);
            table.find("select").val(dict.type);
            table.find("select").change();

            var row_1 = table[0].rows[1];
            var row_2 = table[0].rows[2];
            for (var k in Object.keys(dict)) {
                if (k > 1) {
                    var key = Object.keys(dict)[k];
                    var i = k - 1;
                    //打勾
                    table.find("#atsc").find("[value="+key+"]")[0].click();
                    //补充表格
                    row_1.insertCell(i);
                    row_1.cells[i].innerHTML = _attrs[dict.type][key][0];
                    row_1.cells[i].setAttribute('value', key);
                    row_2.insertCell(i);
                    if (key == "class") {
                        row_2.cells[i].innerHTML = '<select id="boundarycls" type="text" value=""><option value="0">隔水</option><option value="1">导水</option></select>'
                        table.find("#boundarycls").val(dict[key])
                    }else row_2.cells[i].innerHTML = dict[key]
                }
            }
        }
        jishu++
    }
}

//绘制事件
map.on('pm:create', e => {
        //绘制图形添加显示
        jss[0][proj].addLayer(e.layer);
        jss[jishu][0] = e.layer;
        jss[jishu][0].addTo(map);
        jss[jishu][1] = $('path')[jishu - 1];
        layercreate({});
    }
);
//var cliper = L.featureGroup([]).addTo(map);
//图层可见状态
function drawvisible(cata, num) {
    var name = cata + num;
    var $hh = $(name);
    $hh.toggleClass("c-selected");
    h2 = $hh.prop('class');

    if (h2 == 'checkbox') {
        if (cata == '#chly_') {
            jss[0][num].addTo(map);
            jss[0][num].remove();
        } else map.removeLayer(jss[num][0]);
    } else {
        if (cata == '#chly_') jss[0][num].addTo(map);
        else jss[num][0].addTo(map)
    }
}

//表格隐藏
function hid(num) {
    $('#table_' + num)[0].setAttribute('hidden', 'hidden');
}

//

//保存GeoJSON
function saveGeoJson() {
    var geojsons = [];
    var temp = 1;
    for (var i = 1; i < jss[0].length; i++) {
        var fea = jss[0][i].toGeoJSON().features;
        var collection = {
            "type": "FeatureCollection",
            "properties": {},
            "features": []
        };
        for (var j = 0; j < fea.length; j++) {
            fea[j].properties = jss[temp][3];
            temp ++;
            collection.features.push(fea[j])
        }
        collection["name"] = jss[0][0][i];
        geojsons.push(collection);
    }
    //var content = JSON.stringify(geojson);
    var blob = new Blob([JSON.stringify(geojson, null, '\t')], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "save.json");
}

//读取Json
function readJson(e) {
    var file = e.files[0];
    var temp = 1;
    var marks = 0;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {

        var result = eval(this.result);
        for (var i = 0; i < result.length; i++) {
            groupcreate(result[i].properties.name);
            //console.log("读取结果：", result[i].properties.name);
            var fea = result[i].features;
            for (var j = 0; j < fea.length; j++) {
                var p = fea[j].properties;
                var ft = fea[j].geometry.type;
                var layer = L.geoJSON(fea[j]);
                layer.addTo(map);
                jss[0][i + 1].addLayer(layer);
                jss[temp][0] = layer;
                jss[temp][3] = p;
                (ft == "Point") ? (jss[temp][1] = $(".leaflet-marker-pane>img")[marks], marks++) : (jss[temp][1] = $("path")[temp-1])
                layercreate(p);
                temp ++
            }

        }
    }
}
//添加属性复选框选项
function addats(num, e) {
    var _default = _attrs[e]
    var form = $("#table_" + num).find("#atsc")
    form[0].innerHTML = ''
    for (var i in _default) {
        var choice = '<input type="checkbox" value="' + i + '">' + _default[i][0] + '<br>'
        form.append(choice)
    }

}

//清空表格
function tabclear(num) {
    var tabrows = $('#table_' + num)[0].rows
    var tablength = tabrows[1].cells.length - 1
    for (var i = 1; i < tablength; i++) {
        tabrows[1].cells[1].remove()
        tabrows[2].cells[1].remove()
    }
    var ed = jss[num][3]
    jss[num][3] = {"name": ed.name, "type": ed.type}
    $("._colspan")[0].setAttribute("colspan", tabrows[1].cells.length - 1)
}

//表格path
function tableshow(num) {
    var tab = $('#table_' + num)[0]
    if (tab != null) {
        tab.removeAttribute('hidden');
        return 0
    }
    var tabl = '<table class="attributetable" id="table_' + num + '" cellspacing="10" align="center"><tbody><tr class="tablemove" id="movey_' + num + '" align="center" ><td colspan="10">拖拽移动</td></tr><tr id="vname" align="center"><td>名称</td><td><button onclick="hid(' + num + ')">隐藏</button></td></tr><tr id="values" align="center" ><td>' + jss[num][3].name + '</td><td><button onclick="update(this,' + num + ')">修改</button></td></tr></tbody>'
    tabl += '<tbody id="ats" hidden="hidden"><tr align="center" style="height: 20px"><td colspan="10">属性编辑</td></tr><tr align="center"><td class="_colspan">对象类型</td><td><select><option value="well">井</option><option value="area">区域</option><option value="boundary">边界</option></select></td></tr><tr><td colspan="10"><form id="atsc"></form></td></tr></tbody></table>'
    $(".leaflet-overlay-pane").append(tabl)
    var table = $('#table_' + num)
    tab = table[0]
    //默认位置
    table.offset($(jss[num][1]).offset())
    //初始化复选框
    addats(num, 'well')
    var obs = table.find("select")[0]
    obs.onchange = function () {
        addats(num, obs.options[obs.selectedIndex].value)
    }
    //选项选中
    table.find("input").click(function () {
        (!this.getAttribute("checked"))?this.setAttribute("checked", "checked"):this.removeAttribute("checked");
    });

    //禁用地图拖动
    let handan = $('#movey_' + num)[0];
    var disX, disY = 0;
    let _this = this
    setTimeout(() => {
        tab.onmouseover = function () {
            //地图拖拽
            handan.onmouseover = function () {
                _this.map.dragging.disable();
            }
            _this.map.doubleClickZoom.disable();
            _this.map.scrollWheelZoom.disable();
        }
    });
    setTimeout(() => {
        tab.onmouseout = function () {
            handan.onmouseout = function () {
                _this.map.dragging.enable();
            }  // 开启
            _this.map.doubleClickZoom.enable();
            _this.map.scrollWheelZoom.enable();
        }
    });
    //拖动表格
    handan.onmousedown = function (e) {
        var evnt = e || event;
        disX = evnt.clientX - tab.offsetLeft;
        disY = evnt.clientY - tab.offsetTop;
        // 鼠标移动时
        document.onmousemove = function (e) {
            const evnt = e || event;
            var x = evnt.clientX - disX;
            var y = evnt.clientY - disY;
            //var window_width = document.body.scrollWidth - tab.offsetWidth;
            //var window_height = document.body.scrollHeight - tab.offsetHeight;
            //x = (x < 0) ? 0 : x;
            //x = (x > window_width) ? window_width : x;
            //y = (y < 0) ? 0 : y;
            //y = (y > window_height) ? window_height : y;
            tab.style.left = x + "px";
            tab.style.top = y + "px";
        };
        // 鼠标抬起时
        document.onmouseup = function () {

            document.onmousemove = null;
            document.onmouup = null;
        };
        return false;
    }
}

function bdsshow(obj, num, arr) {
    var boundarys = $(".boundaries_"+num);
    if (boundarys[0]) {
        for (var i = 0; i < boundarys.length; i++) {
            boundarys.filter("#"+i)[0].removeAttribute("hidden")
        }
    } else {
        var layer = jss[num][0];
        var path = jss[num][1];
        var _d = $(path)[0].getAttribute("d");
        var MLz = _d.match(/\d+ \d+/g);
        for (var i = 0; i < MLz.length; i++) {
            MLz[i] = MLz[i].split(" ")
        }
        var fea = layer.toGeoJSON();
        var coords = fea.geometry.coordinates[0];
        var ilen = coords.length;
        if (coords[0] == coords[ilen - 1]) ilen--;
        var firstpoint = $(path).offset()
        var atop=firstpoint.top;
        var aleft = firstpoint.left
        for (var i = 0; i < ilen; i++) {
            $(".leaflet-overlay-pane").append('<div class="boundaries_'+num+'" id="'+i+'" ><input /></div>');
            var boundary = $(".boundaries_"+num).filter("#"+i);
            window.console.log(MLz);
            boundary[0].childNodes[0].value = arr[i] ? arr[i] : 0;
            atop += (MLz[(i+1)%ilen][1] + MLz[i][1])/2;
            aleft += (MLz[(i+1)%ilen][0] + MLz[i][0])/2;
            boundary.offset({top: atop, left: aleft});
            window.console.log(boundary);
        }
    }
    obj.innerHTML = "保存";
    obj.onclick = function onclick(event) {
        obj.innerHTML = "编辑";
        boundarys = $(".boundaries_"+num);
        var array = [];
        for (var i = 0; i < boundarys.length; i++) {
            boundarys.filter("#"+i)[0].setAttribute("hidden", "hidden");
            array[i] = boundarys.filter("#"+i)[0].childNodes[0].value;
        }
        jss[num][3]["Hs"] = array;
        window.map.dragging.enable();
        obj.onclick = function onclick(event) {
            bdsshow(obj,num,arr);
        }
    };
}

//修改表格值
function update(obj, num) {
    var table = $("#table_" + num);
    var tab = table[0];
    var ats = tab.childNodes[1];
    $("._colspan")[0].setAttribute("colspan", tab.rows[1].cells.length - 1);
    ats.removeAttribute('hidden');
    for (var i = 0; i < tab.rows[2].cells.length - 1; i++) {
        if(tab.rows[1].cells[i].getAttribute("value") == "class")continue;
        var text = tab.rows[2].cells[i].innerHTML;
        tab.rows[2].cells[i].innerHTML = '<input class="input" id="input_" type="text" value=""/>';
        var input = table.find("#input_");
        input[i].value = text;
        input[i].setAttribute('onclick', '{window.map.dragging.disable();document.onmousemove = null; this.focus();this.select();}')
    }
    obj.innerHTML = "确定";
    obj.onclick = function onclick(event) {
        ats.setAttribute("hidden", "hidden");
        updating(this, num)
    };
}

function updating(obj, num) {
    var table = $("#table_" + num);
    var tab = table[0];
    var obf = table.find("#atsc");
    var obs = table.find("#ats select")[0];
    var svalue = obs.options[obs.selectedIndex].value;
    var obchecked = obf.find('input:checked');

    if (jss[num][3]["type"] != svalue) tabclear(num);
    for (var i = 1; i < obchecked.length+1; i++) {
        var row_1 = tab.rows[1];
        if (row_1.cells[i].getAttribute("value") != obchecked[i - 1].value) {

            var ivalue = obchecked[i - 1].value;
            var row_2 = tab.rows[2];
            row_1.insertCell(i);
            row_1.cells[i].innerHTML = _attrs[svalue][ivalue][0];
            row_1.cells[i].setAttribute('value', ivalue);
            row_2.insertCell(i);
            switch (ivalue) {
                case "class":
                    row_2.cells[i].innerHTML = '<select id="boundarycls" type="text" value=""><option value="0">隔水</option><option value="1">导水</option></select>';
                    break;
                case "Hs":
                    row_2.cells[i].innerHTML ='<button onclick="bdsshow(this,'+num+',[])">编辑</button>';
                    break;
                default:
                    row_2.cells[i].innerHTML = '<input class="input" id="input_" type="text" value=""/>';
                    var input = table.find("#input_");
                    input[i].value = _attrs[svalue][ivalue][1];
            }


        }
    }
    obj.innerHTML = "保存";
    obj.onclick = function onclick(event) {
        update_success(this, num, svalue);
        window.map.dragging.enable();
    };
}

function update_success(obj, num, type) {
    var table = $("#table_" + num)
    var tab = table[0]
    var row = tab.rows
    //把值赋值给表格
    var input = table.find("#input_");
    var len = input.length
    for (var i = 0; i < len; i++) {
        row[2].cells[i].innerHTML = input[i].value;
    }
    //储存
    var arr = {
        "name": row[2].cells[0].innerHTML,
        "type": type
    };

    for (var i = 1; i < len + 1; i++) {
        var key=row[1].cells[i].getAttribute("value")
        if(key=="class"){
            var cls = table.find("#boundarycls")[0]
            arr[key] = cls.options[cls.selectedIndex].value
        }else arr[key] = row[2].cells[i].innerHTML;
    }
    //文件夹重命名
    $('#lay_' + num).parent().parent().find('.filename')[0].innerHTML = arr.name
    jss[num][3] = arr
    //回到原来状态
    obj.innerHTML = "修改";
    obj.onclick = function onclick(event) {
        update(this, num)
    };
}

//重命名
function rename(obj, num) {
    var text = obj.innerHTML;
    obj.innerHTML = '<input class="input" type="text" value=""/>';
    var input = obj.childNodes[0]
    input.value = text
    input.onblur = function () {
        obj.innerHTML = input.value;
        jss[0][0][num] = input.value;
    }
}
