L.Polyline.include({
    _drawBoundary: function () {
        this._map = map;
        this._map.on('pm:create', e => {
            var layer = e.layer
            var ll = layer._latlngs[0];
            var lll = e.shape === 'Polygon' ? ll.length : ll.length - 1
            for (var i = 0; i < lll; i++) {
                var lines = new L.Polyline([ll[i], ll[(i + 1) % lll]]).addTo(map);
                lines._path.setAttribute('stroke-width', '4')
                lines._disableMapEvent()
            }
            layer._disableMapEvent()

        })
    },
    _disableMapEvent: function () {
        var mainmap = this._map
        this._path.onmouseover = function () {
            mainmap.doubleClickZoom.disable();
        };
        this._path.onmouseout = function () {
            mainmap.doubleClickZoom.enable();
        };
        if (this.shape === 'Polygon') this._path.setAttribute('stroke-opacity', 0.0);
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
    _GWH: function () {
        this._selected();
        console.log(this)
        //if(this.pm._shape) this._drawBoundary();
    }

});
L.Polyline.addInitHook('_GWH');


L.Polygon.include({

    _selectedPolygon: function () {
        this.on('click', e => {
            this._clearSelected();
            e.target._path.setAttribute('fill', '#e74c3c');
        })
    },
    _GWHPolygon: function () {
        this._drawBoundary();
        this._selectedPolygon();
    }

});
L.Polygon.addInitHook('_GWHPolygon');

