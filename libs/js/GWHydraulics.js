(function (window, document, undefined) {
    L.GWHTable = L.Marker.extend({
        options: {
            minSize: new L.Point(10, 10),
            name: '',
            id: 0,
        },
        statics: {
            TYPE: 'gwhtable',
            TEXTEDIT_EVENTS: ['change']
        },
        attrs: {
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
                "Hs": ["边界水头", []]
            },
            "boundary": {
                "Z": ["水位", 0],
                "H": ["水头", 0],
                "class": ["类型", ["隔水", "导水"]]
            }
        },

        initialize: function (latlng, options, ele) {
            this.options.id = ele._leaflet_id
            var _id = this.options.id
            options.icon = new L.DivIcon({
                className: 'leaflet-illustrate-textbox-container',
                html: '<table class="attributetable" id="'
                    + _id + '" cellspacing="10" align="center"><tbody><tr class="tablemove" align="center" ><td colspan="10">拖拽移动</td></tr><tr id="vname" align="center"><td>名称</td><td><button onclick="hid('
                    + _id + ')">隐藏</button></td></tr><tr id="values" align="center" ><td>'
                    + this.options.name + '</td><td><button onclick="update(this,'
                    + _id + ')">修改</button></td></tr></tbody>'
                    + '<tbody id="ats" hidden="hidden"><tr align="center" style="height: 20px"><td colspan="10">属性编辑</td></tr><tr align="center"><td class="_colspan">对象类型</td><td><select><option value="well">井</option><option value="area">区域</option><option value="boundary">边界</option></select></td></tr><tr><td colspan="10"><form id="atsc"></form></td></tr></tbody></table>',
                iconAnchor: new L.Point(0, 0)
            });
            L.Marker.prototype.initialize.call(this, latlng, options, ele);
            // ele._latlngs
        },
        onAdd: function(map) {
		var textarea, editevent;

		L.Marker.prototype.onAdd.call(this, map);

		//textarea = this.getTextarea();

		//this.setContent(this._textContent);
		this.setLatLng(this._latlng);
		//this._updateSize();

		/* Enable typing, text selection, etc. */
		// this._enableTyping();

		/* Disable the textarea if the textbox content should not be editable. */
		// if (!this.options.textEditable) {
		// 	textarea.setAttribute('readonly', 'readonly');
		// }

		// this._addClasses();

		// for (var i = 0; i < L.Illustrate.Textbox.TEXTEDIT_EVENTS.length; i++) {
		// 	editevent = L.Illustrate.Textbox.TEXTEDIT_EVENTS[i];
		// 	L.DomEvent.on(textarea, editevent, this._showIfEmpty, this);
		// }
        //
		// this._showIfEmpty({ target: textarea });
	},
        addTo: function (map) {
            map.addLayer(this);
            return this;
        },
    //     setContent: function(text) {
	// 	this.getTextarea().innerHTML = text;
	// 	return this;
	// },

    });
    L.gwhtable = function (latlng, options) {
        return new L.GWHTable(latlng, options);
    };
    L.Layer.include({
        _CreateTable: function (e) {
            var layer = e.layer || e.target || e;
            this.Table = new L.GWHTable(e)
        },
        _Tablepath: function () {
            return 0
        },
        // _GWHTable: function (e) {
        //
        //     layer._leaflet_id
        // }
        _TheSelected: function (e) {
            var layer = e.layer || e.target || e;
            layer._path.onmousedown = function () {
                layer.setStyle({color: '#000000'})
            };
        },
    })

}(window, document))
