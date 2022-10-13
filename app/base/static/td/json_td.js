L.TimeDimension.Layer.Ohl = L.TimeDimension.Layer.extend({

    updateTimeDimension: true,
    waitForReady: true,

    initialize: function(options) {
        
        var layerCfg = this._getHeatmapOptions(options.heatmatOptions || {});
        var layer = new L.GeoJSON();
        // var layer = new HeatmapOverlay()
        layer.setStyle(layerCfg.style);
        L.TimeDimension.Layer.prototype.initialize.call(this, layer, options);
        this._currentLoadedTime = -1;
        this._currentTimeData = {
            max: 0,
            min:84,
            data: []
        };
        this._baseURL = this.options.baseURL || null;
        this._period = this.options.period || "P1M";
    },


    _getHeatmapOptions: function(options) {
    
        var config = {};
        var defaultConfig = {
            radius: 0.11,
            
            scaleRadius: true,
            // gradient: { '0.25': "#330acc", '0.55': "#661499", '0.75': "#991f66", '1': "#cc2933"},
            useLocalExtrema: false,
            latField: 'lat',
            lngField: 'lng',
            valueField: 't2m',
            style: {
                weight: 2,
                opacity: 1,
                color: 'blue',
                dashArray: '3',
                fillOpacity: 0.7,
            }
        };
        for (var attrname in defaultConfig) {
            config[attrname] = defaultConfig[attrname]; 
        }
        for (var attrname in options) {
            config[attrname] = options[attrname]; 
        }
        return config;
    },

    onAdd: function(map) {
        console.log(this._timeDimension)
        L.TimeDimension.Layer.prototype.onAdd.call(this, map);
        map.addLayer(this._baseLayer);
        console.log(this._timeDimension._availableTimes)
        if (this._timeDimension) {
            this._getDataForTime(this._timeDimension.getCurrentTime());
        }
    },


    _onNewTimeLoading: function(ev) {
        this._getDataForTime(ev.time);
        return;
    },

    isReady: function(time) {
        return (this._currentLoadedTime == time);
    },

    _update: function() {
        console.log('TAJM data',this._currentTimeData)
        console.log('bejslejer',this._baseLayer)
        // this._baseLayer.addData(this._currentTimeData);
        
        return true;
    },

    _getDataForTime: function(time) {
        if (!this._baseURL || !this._map) {
            return;
        }
        var d = new Date(time);
        console.log(d)
        url0=this.options.base_url

        if (url0.substring(url0.length-4)=='oad/') {
            var url = url0+ d.format("yyyy-mm-dd'T'HH.MM.00", true) + '.geojson';
            console.log(url);
        }

        console.log(url);

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", (function(xhr) {
            var response = xhr.currentTarget.response;
            var data = JSON.parse(response);
            console.log(data.features.length);
            delete this._currentTimeData.data;
            this._currentTimeData.data = [];
            // this._currentTimeData.data.push(data)

            for (var i = 0; i < data.features.length; i++) {

                if (url0.substring(url0.length-4)=='oad/') {
                    // console.log('DATA',data)
                    
                    this._currentTimeData.data.push({
                        coordinates: [data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]],
                        // lng: ,                         
                        lpc: data.features[i].properties.loading_percent
                        
                })
                
                }

            }
            this._currentLoadedTime = time;
            if (this._timeDimension && time == this._timeDimension.getCurrentTime() && !this._timeDimension.isLoading()) {
                this._update();
            }
            this.fire('timeload', {
                time: time
            });
        }).bind(this));
        oReq.open("GET", url);
        oReq.send();
    },
});