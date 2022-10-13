function baselayers(map, feature_group_Under110kVLines,feature_group_150kVand110kVLines,feature_group_220kVLines,
    feature_group_400kVLines,feature_group_HVDCLines,feature_group_SolarParks,feature_group_Substations,
    feature_group_Zones,t_min,t_max,start_time,stop_time,tp_min,tp_max,v_min,v_max) {
    
	//basemaps
	var standard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a>'
        });
    
    var humanitarian = L.tileLayer('https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a> <a href="https://www.hotosm.org/" target="_blank">Tiles courtesy of Humanitarian OpenStreetMap Team</a>'
        });

    var esri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg", {
        maxZoom: 19, attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    
    var MtbMap = L.tileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
});
    
    var Dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });

    var Thunderforest_TransportDark = L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: 'cb70ab54827f47059b68bbaa61372a4c',
        maxZoom: 22
    });

    var Thunderforest_Landscape = L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: 'cb70ab54827f47059b68bbaa61372a4c',
        maxZoom: 22
    });

    var Thunderforest_Pioneer = L.tileLayer('https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: 'cb70ab54827f47059b68bbaa61372a4c',
        maxZoom: 22
    });

    var Thunderforest_Neighbourhood = L.tileLayer('https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: 'cb70ab54827f47059b68bbaa61372a4c',
        maxZoom: 22
    });

    var Thunderforest_Transport = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: 'cb70ab54827f47059b68bbaa61372a4c',
        maxZoom: 22
    });

    var Thunderforest_MobileAtlas = L.tileLayer('https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: 'cb70ab54827f47059b68bbaa61372a4c',
        maxZoom: 22
    });
    
    //overlayMaps
    var OWM_API_KEY = '5cc309d8d9ec8acaa50d83287ab8a7d5';

    var clouds = L.OWM.clouds({opacity: 0.8, legendImagePath: 'MapJS/NT2.png', appId: OWM_API_KEY});

    // Get your own free OWM API key at https://www.openweathermap.org/appid - please do not re-use mine!
    // You don't need an API key for this to work at the moment, but this will change eventually.
    //var OWM_API_KEY = '06aac0fd4ba239a20d824ef89602f311';
    //  var OWM_API_KEY = 'e4f3e78caf82d6e85501591250a4b9fd';
    var clouds = L.OWM.clouds({opacity: 0.8, legendImagePath: 'MapJS/NT2.png', appId: OWM_API_KEY});
    var precipitationcls = L.OWM.precipitationClassic({opacity: 0.5, appId: OWM_API_KEY});
    var raincls = L.OWM.rainClassic({opacity: 0.5, appId: OWM_API_KEY});
    var snow = L.OWM.snow({opacity: 0.5, appId: OWM_API_KEY});
    var pressure = L.OWM.pressure({opacity: 0.4, appId: OWM_API_KEY});
    var wind = L.OWM.wind({opacity: 0.5, appId: OWM_API_KEY});
    var city = L.OWM.current({intervall: 15, imageLoadingUrl: 'leaflet/owmloading.gif', lang: localLang, minZoom: 5,
            appId: OWM_API_KEY});
    var windrose = L.OWM.current({intervall: 15, imageLoadingUrl: 'leaflet/owmloading.gif', lang: localLang, minZoom: 4,
            appId: OWM_API_KEY, markerFunction: myWindroseMarker, popup: false, clusterSize: 50,
                imageLoadingBgUrl: 'https://openweathermap.org/img/w0/iwind.png' });
    windrose.on('owmlayeradd', windroseAdded, windrose); // Add an event listener to get informed when windrose layer is ready

    var baseMaps = {
        "OSM Standard": standard
        , "OSM Humanitarian": humanitarian
        , "ESRI Aerial": esri
        , "Mtb Map": MtbMap
        , "Thunderforest Pioneer": Thunderforest_Pioneer
        , "Thunderforest Neighbourhood": Thunderforest_Neighbourhood
        , "Thunderforest Transport": Thunderforest_Transport
        , "Thunderforest MobileAtlas": Thunderforest_MobileAtlas
        , "Thunderforest Landscape": Thunderforest_Landscape
        , "Transport Dark": Thunderforest_TransportDark
        , "Dark Background": Dark
    };

    L.TimeDimension.Layer.TileLayer = L.TimeDimension.Layer.extend({});

    L.timeDimension.layer.tileLayer = function(layer, options) {
        return new L.TimeDimension.Layer.TileLayer(layer, options);
    };
    
    L.TimeDimension.Layer.TileLayer.Portus = L.TimeDimension.Layer.TileLayer.extend({
    
        initialize: function(layer, options) {
            L.TimeDimension.Layer.TileLayer.prototype.initialize.call(this, layer, options);
            this._layers = {};
            this._defaultTime = 0;
            this._availableTimes = [];
            this._timeCacheBackward = this.options.cacheBackward || this.options.cache || 0;
            this._timeCacheForward = this.options.cacheForward || this.options.cache || 0;
    
            this._baseLayer.on('load', (function() {
                this._baseLayer.setLoaded(true);
                this.fire('timeload', {
                    time: this._defaultTime
                });
            }).bind(this));
        },
    
        eachLayer: function(method, context) {
            for (var prop in this._layers) {
                if (this._layers.hasOwnProperty(prop)) {
                    method.call(context, this._layers[prop]);
                }
            }
            return L.TimeDimension.Layer.TileLayer.prototype.eachLayer.call(this, method, context);
        },
    
        _onNewTimeLoading: function(ev) {
            var layer = this._getLayerForTime(ev.time);
            if (!this._map.hasLayer(layer)) {
                this._map.addLayer(layer);
            }
        },
    
        isReady: function(time) {
            var layer = this._getLayerForTime(time);
            var currentZoom = this._map.getZoom();
            if (layer.options.minZoom && currentZoom < layer.options.minZoom){
                return true;
            }
            if (layer.options.maxZoom && currentZoom > layer.options.maxZoom){
                return true;
            }
            return layer.isLoaded();
        },
    
        _update: function() {
            if (!this._map)
                return;
            var time = this._timeDimension.getCurrentTime();
            // It will get the layer for this time (create or get)
            // Then, the layer will be loaded if necessary, adding it to the map (and show it after loading).
            // If it already on the map (but probably hidden), it will be shown
            var layer = this._getLayerForTime(time);
            if (this._currentLayer == null) {
                this._currentLayer = layer;
            }
            if (!this._map.hasLayer(layer)) {
                this._map.addLayer(layer);
            } else {
                this._showLayer(layer, time);
            }
        },
    
        setOpacity: function(opacity) {
            L.TimeDimension.Layer.TileLayer.prototype.setOpacity.apply(this, arguments);
            // apply to all preloaded caches
            for (var prop in this._layers) {
                if (this._layers.hasOwnProperty(prop) && this._layers[prop].setOpacity) {
                    this._layers[prop].setOpacity(opacity);
                }
            }
        },
        
        setZIndex: function(zIndex){
            L.TimeDimension.Layer.TileLayer.prototype.setZIndex.apply(this, arguments);
            // apply to all preloaded caches
            for (var prop in this._layers) {
                if (this._layers.hasOwnProperty(prop) && this._layers[prop].setZIndex) {
                    this._layers[prop].setZIndex(zIndex);
                }
            }
        },
    
        _unvalidateCache: function() {
            var time = this._timeDimension.getCurrentTime();
            for (var prop in this._layers) {
                if (time != prop && this._layers.hasOwnProperty(prop)) {
                    this._layers[prop].setLoaded(false); // mark it as unloaded
                    this._layers[prop].redraw();
                }
            }
        },
    
        _evictCachedTimes: function(keepforward, keepbackward) {
            // Cache management
            var times = this._getLoadedTimes();
            var strTime = String(this._currentTime);
            var index = times.indexOf(strTime);
            var remove = [];
            // remove times before current time
            if (keepbackward > -1) {
                var objectsToRemove = index - keepbackward;
                if (objectsToRemove > 0) {
                    remove = times.splice(0, objectsToRemove);
                    this._removeLayers(remove);
                }
            }
            if (keepforward > -1) {
                index = times.indexOf(strTime);
                var objectsToRemove = times.length - index - keepforward - 1;
                if (objectsToRemove > 0) {
                    remove = times.splice(index + keepforward + 1, objectsToRemove);
                    this._removeLayers(remove);
                }
            }
        },
    
        _showLayer: function(layer, time) {
            if (this._currentLayer && this._currentLayer !== layer) {
                this._currentLayer.hide();
            }
            layer.show();
            if (this._currentLayer && this._currentLayer === layer) {
                return;
            }
            this._currentLayer = layer;
            this._currentTime = time;
            console.log('Show layer with time: ' + new Date(time).toISOString());
    
            this._evictCachedTimes(this._timeCacheForward, this._timeCacheBackward);
        },
    
        _getLayerForTime: function(time) {
            if (time == 0 || time == this._defaultTime || time == null) {
                return this._baseLayer;
            }
            if (this._layers.hasOwnProperty(time)) {
                return this._layers[time];
            }
            var nearestTime = this._getNearestTime(time);
            if (this._layers.hasOwnProperty(nearestTime)) {
                return this._layers[nearestTime];
            }
    
            var newLayer = this._createLayerForTime(nearestTime);
           
            this._layers[time] = newLayer;
    
            newLayer.on('load', (function(layer, time) {
                layer.setLoaded(true);
                // this time entry should exists inside _layers
                // but it might be deleted by cache management
                if (!this._layers[time]) {
                    this._layers[time] = layer;
                }
                if (this._timeDimension && time == this._timeDimension.getCurrentTime() && !this._timeDimension.isLoading()) {
                    this._showLayer(layer, time);
                }
                // console.log('Loaded layer ' + layer.wmsParams.layers + ' with time: ' + new Date(time).toISOString());
                this.fire('timeload', {
                    time: time
                });
            }).bind(this, newLayer, time));
    
            // Hack to hide the layer when added to the map.
            // It will be shown when timeload event is fired from the map (after all layers are loaded)
            newLayer.onAdd = (function(map) {
                Object.getPrototypeOf(this).onAdd.call(this, map);
                this.hide();
            }).bind(newLayer);
            return newLayer;
        },
        
        _createLayerForTime:function(time){
            var options = this._baseLayer.options;
            var url = this._baseLayer.getURL();
    
            var startDate = new Date();
            startDate.setUTCHours(0, 0, 0, 0);
            var startDateFormatted = startDate.toISOString().substring(0,10).replace(/-/g, '');
            url = url.replace('{d}', startDateFormatted);
    
            var hours = new Date(time).getUTCHours();
            hours = "00" + hours;
            hours = hours.substring(hours.length - 2, hours.length);
            url = url.replace('{h}', hours);
            return new this._baseLayer.constructor(url, this._baseLayer.options);
        },
    
        _getLoadedTimes: function() {
            var result = [];
            for (var prop in this._layers) {
                if (this._layers.hasOwnProperty(prop)) {
                    result.push(prop);
                }
            }
            return result.sort(function(a, b) {
                return a - b;
            });
        },
    
        _removeLayers: function(times) {
            for (var i = 0, l = times.length; i < l; i++) {
                if (this._map)
                    this._map.removeLayer(this._layers[times[i]]);
                delete this._layers[times[i]];
            }
        },
    
        setMinimumForwardCache: function(value) {
            if (value > this._timeCacheForward) {
                this._timeCacheForward = value;
            }
        },
    
        _getNearestTime: function(time) {
            if (this._layers.hasOwnProperty(time)) {
                return time;
            }
            if (this._availableTimes.length == 0) {
                return time;
            }
            var index = 0;
            var len = this._availableTimes.length;
            for (; index < len; index++) {
                if (time < this._availableTimes[index]) {
                    break;
                }
            }
            // We've found the first index greater than the time. Get the previous
            if (index > 0) {
                index--;
            }
            if (time != this._availableTimes[index]) {
                console.log('Search layer time: ' + new Date(time).toISOString());
                console.log('Return layer time: ' + new Date(this._availableTimes[index]).toISOString());
            }
            return this._availableTimes[index];
        },
    
    });
    
    L.timeDimension.layer.tileLayer.portus = function(layer, options) {
        return new L.TimeDimension.Layer.TileLayer.Portus(layer, options);
    };


    var lLejer=L.tileLayer('https://farcross.weather2umbrella.com/europan/w_jsons/png/{d}/{h}/tmp2m/{z}/{x}/{y}.png', {
    });
    var portusTimeLayer = L.timeDimension.layer.tileLayer.portus(lLejer, {});
    console.log(portusTimeLayer)
    portusTimeLayer.addTo(map);


    //CUSTOM METEO DATA - W2U
    L.TimeDimension.Layer.W2Utemp = L.TimeDimension.Layer.extend({

        updateTimeDimension: true,
        waitForReady: true,
    
        initialize: function(options) {
            
            var heatmapCfg = this._getHeatmapOptions(options.heatmatOptions || {});
            var layer = new HeatmapOverlay(heatmapCfg);
            L.TimeDimension.Layer.prototype.initialize.call(this, layer, options);
            this._currentLoadedTime = -1;
            this._currentTimeData = {
                max: this.options.max_t,
                min:this.options.min_t,
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
                valueField: 't2m'
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
            console.log('TAJMtemp data',this._currentTimeData)
            this._baseLayer.setData(this._currentTimeData);
            
            return true;
        },
    
        _getDataForTime: function(time) {
            if (!this._baseURL || !this._map) {
                return;
            }
            var d = new Date(time);
            console.log(d)
            url0=this.options.base_url
            if ((url0.substring(url0.length-4)=='t2m/') || (url0.substring(url0.length-4)=='/tp/')) {
                var url = url0+ d.format("yyyy-mm-dd'T'HH", true) + '.geojson';
            }
            if (url0.substring(url0.length-4)=='_pu/') {
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

                for (var i = 0; i < data.features.length; i++) {
                    if (url0.substring(url0.length-4)=='t2m/') {
                        this._currentTimeData.data.push({
                            lat: data.features[i].geometry.coordinates[1],
                            lng: data.features[i].geometry.coordinates[0],                         
                            t2m: data.features[i].properties.t2m
                            
                    })
                    
                    }

                    if (url0.substring(url0.length-4)=='_pu/') {
                        this._currentTimeData.data.push({
                            lat: data.features[i].geometry.coordinates[1],
                            lng: data.features[i].geometry.coordinates[0],                         
                            t2m: data.features[i].properties.vm_pu
                            
                    })
                    
                    }
                    if (url0.substring(url0.length-4)=='/tp/') {
                        this._currentTimeData.data.push({
                            lat: data.features[i].geometry.coordinates[1],
                            lng: data.features[i].geometry.coordinates[0],                         
                            t2m: data.features[i].properties.tp
                            
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

    L.timeDimension.layer.w2Utemp = function(options) {
        return new L.TimeDimension.Layer.W2Utemp(options);
    };
    L.timeDimension.layer.vMeig = function(options) {
        return new L.TimeDimension.Layer.W2Utemp(options);
    };
    L.timeDimension.layer.w2Utp = function(options) {
        return new L.TimeDimension.Layer.W2Utemp(options);
    };
    L.timeDimension.layer.oHl = function(options) {
        return new L.TimeDimension.Layer.Ohl(options);
    };

    var sapoWMS = "http://farcross.weather2umbrella.com:8080/geoserver/wms";

    var sapoHeightLayer = L.tileLayer.wms(sapoWMS, {
        layers: ' eig:tcc',
        format: 'image/png',
        transparent: true,
        format_options: 'layout:message',
        attribution: "Algum texto de teste",
        layout: 'message',
    });
    var proxy = 'server/proxy.php';
    var sapoHeightTimeLayer = L.timeDimension.layer.wms(sapoHeightLayer, {
        proxy: proxy,
        updateTimeDimension: true
    });
    var vsLayer = L.nonTiledLayer.wms(sapoWMS, {
        layers: 'eig:wsp',
        format: 'image/png',
        transparent: true,
        colorscalerange: '0,2',
        abovemaxcolor: "extend",
        belowmincolor: "extend",
        markerscale: 15,
        markerspacing: 12,
        markerclipping: true,    });
    var proxy = 'server/proxy.php';
    var vsTimeLayer = L.timeDimension.layer.wms(vsLayer, {
        proxy: proxy,
        updateTimeDimension: true
    });

    var sapoLegend = L.control({
        position: 'bottomleft'
    });

    sapoLegend.onAdd = function(map) {
        var src = sapoWMS + "?&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=eig%3At2m&transparent=TRUE";
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML +=
            '<img src="' + src + '" alt="legend">';
        return div;
    };
   
    var sapoHeightLayer = L.tileLayer.wms(sapoWMS, {
        layers: ' eig:t2m',
        format: 'image/png',
        transparent: true,
    });
    var t2mTimeLayer = L.timeDimension.layer.wms(sapoHeightLayer, {
        proxy: proxy,
        updateTimeDimension: true
    });
    var sapoHeightLayer = L.tileLayer.wms(sapoWMS, {
        layers: ' eig:tp',
        format: 'image/png',
        transparent: true,
    });
    var tpTimeLayer = L.timeDimension.layer.wms(sapoHeightLayer, {
        proxy: proxy,
        updateTimeDimension: true
    });

    var tpLegend = L.control({
        position: 'bottomleft'
    });

    tpLegend.onAdd = function(map) {
        var src = sapoWMS + "?&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=eig%3Atp&transparent=TRUE";
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML +=
            '<img src="' + src + '" alt="legend">';
        return div;
    };

    var timeDimension = new L.TimeDimension({
        timeInterval: start_time+"/"+stop_time,
        period: "PT1H",
        currentTime: Date.parse(start_time)

    });

    var timeDimensionControlOptions = {
        timeDimension: timeDimension,
        position:      'bottomleft',
        autoPlay:      false,
        minSpeed:      1,
        speedStep:     0.5,
        maxSpeed:      15,
        timeSliderDragUpdate: true
    };
    tdm= new L.Control.TimeDimension(timeDimensionControlOptions);
    map.timeDimension=timeDimension;

    map.addControl(tdm);


    
    function w2utemp(t_min,t_max) {
        return L.timeDimension.layer.w2Utemp({
            baseURL: 'www.energoinfogroup.com',
            min_t: t_min,
            max_t: t_max,
            base_url:"https://farcross.weather2umbrella.com/europan/w_jsons/t2m/",
            heatmatOptions:{
                radius: 0.11,
                maxOpacity: .8,
                gradient: { 0.25: "rgb(0,0,255)", 0.50: "rgb(0,255,0)", 0.75: "yellow", 1.0: "rgb(255,0,0)"},
                // gradient: { '0.25': "#330acc", '0.55': "#661499", '0.75': "#991f66", '1': "#cc2933"},
            }
        });
    }
    function w2utp(t_min,t_max) {
        return L.timeDimension.layer.w2Utp({
            baseURL: 'www.energoinfogroup.com',
            min_t: t_min,
            max_t: t_max,

            base_url:"https://farcross.weather2umbrella.com/europan/w_jsons/tp/",
            heatmatOptions:{
                opacity: .9,
                // blur:.1,
                radius: 0.2,
                // gradient: { 0.25: "rgb(0,0,255)", 0.50: "rgb(0,255,0)", 0.75: "yellow", 1.0: "rgb(255,0,0)"},
                gradient: { '0.25': "#482173", '0.55': "#2e6f8e", '0.75': "#29af7f", '1': "#bddf26"},
            }
        });
    }

    vm_min=0.9778
    vm_max=1.05
    function eigvm(vm_min,vm_max) {
        return L.timeDimension.layer.vMeig({
            baseURL: 'www.energoinfogroup.com',
            min_t: vm_min,
            max_t: vm_max,
            base_url:"https://farcross.weather2umbrella.com/europan/w_jsons/net/vm_pu/",
            heatmatOptions:{
                radius: 0.1,
                opacity: .8,
                blur:.7,
                gradient: { '0.25': "#3203f2", '0.55': "#6506e5", '0.75': "#970ad9", '1': "#ca0dcc"},
            }
            
        });
    }
    function onEachFeature(feature, layer) {
    
        if (feature.properties.type=='wind') {
            var strz
            map.on('zoomend', function() {
                strz=(~~map.getZoom()).toString()
        
            });
           
        }

        if (feature.properties.type=='ohl') {
            layer.bindPopup('OHL   : '+'<b>'+feature.properties.id+'</b><br>'
                            +'<button type="button">Ampacity forecast</button>');
        }
        if (feature.properties.type=='solar') {
            layer.bindPopup('SPP   : '+'<b>'+feature.properties.id+'</b><br>'
                            +'<button type="button">SPP forecast</button>');
        }
    }

    var overlayMaps = {};
    $.getJSON('https://farcross.weather2umbrella.com/europan/w_jsons/net/vm.geojson',function (data) {

        function getColorSS(d) {
            return d > 1.05 ? 'rgba(215,25,28,1.0)' :
                d > 1.03  ? 'rgba(237,110,67,1.0)' :
                d > 1.02  ? 'rgba(254,186,110,1.0)' :
                d > 1.01  ? 'rgba(255,232,164,1.0)' :
                d > 0.99   ? 'rgba(231,245,203,1.0)' :
                d > 0.98   ? 'rgba(183,223,227,1.0)' :
                d > 0.97   ? 'rgba(117,177,211,1.0)' :
                    'rgba(44,123,182,1.0)';
        }
        
        function styleSS(feature) {
            return {
            radius: 10,
            fillOpacity: 1,
            fillColor: getColorSS(feature.properties.vm_pu),
            color:getColorSS(feature.properties.vm_pu),
            weight: 2,
            opacity: 1,
            };
        }
        function onEachFeaturess(feature, layer) {
            // does this feature have a property named popupContent?
            if (feature.geometry.type=='Point') {
                layer.bindPopup('SS         : '+'<b>'+feature.properties.SS1+'</b><br>'
                                +'Vm[p.u.]   : '+'<b>'+feature.properties.vm_pu+' %</b><br>'
                                +'time   : '+'<b>'+feature.properties.time+' UTC</b><br>'
  );
            }}

        var ts_ss = new L.GeoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions
                    );
                
                },
                style: styleSS,
                onEachFeature: onEachFeaturess
            });
        var geojsonMarkerOptions = {
                radius: 15,
                fillColor: "#0163FF",
                color: "#0163FF",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.4,
            };

        var SSgjs = new L.timeDimension.layer.geoJson(ts_ss);

        $.getJSON('https://farcross.weather2umbrella.com/europan/w_jsons/net/pload.geojson',function (data) {

            function getColor(d) {
                return d > 80 ? 'rgba(215,25,28,1.0)' :
                    d > 70  ? 'rgba(237,110,67,1.0)' :
                    d > 60  ? 'rgba(254,186,110,1.0)' :
                    d > 50  ? 'rgba(255,232,164,1.0)' :
                    d > 40   ? 'rgba(231,245,203,1.0)' :
                    d > 30   ? 'rgba(183,223,227,1.0)' :
                    d > 20   ? 'rgba(117,177,211,1.0)' :
                        'rgba(44,123,182,1.0)';
            }
            
            function style(feature) {
                return {
                weight: 2,
                opacity: 1,
                color: getColor(feature.properties.loading_percent),
                dashArray: '',
                fillOpacity: 1,
                fillColor: getColor(feature.properties.loading_percent)
                };
            }

            var ts_ohl=L.geoJSON(data
                , {style: style,
                onEachFeature: onEachFeatureohl}
                );

            var OHLgjs = new L.timeDimension.layer.geoJson(ts_ohl);

            function onEachFeatureohl(feature, layer) {
                // does this feature have a property named popupContent?
                if (feature.geometry.type=='Polygon') {
                    layer.bindPopup('SS1   : '+'<b>'+feature.properties.from_txt+'</b><br>'
                                    +'SS2    : '+'<b>'+feature.properties.to_txt+'</b><br>'
                                    +'Load     : '+'<b>'+feature.properties.loading_percent+' %</b><br>'
                                    +'time   : '+'<b>'+feature.properties.time+' UTC</b><br>'
      );
                }}
        
            $.getJSON('https://farcross.weather2umbrella.com/europan/jsons/res_def.geojson', function(data) {
                var iconw = L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [10, 41],
                    popupAnchor: [2, -40],
                    iconUrl: "https://farcross.weather2umbrella.com/europan/icons1/wg.png",
                    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
                });
                var icono = L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [10, 41],
                    popupAnchor: [2, -40],
                    iconUrl: "https://farcross.weather2umbrella.com/europan/icons1/ohl1.png",
                    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
                });
                var icons = L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [10, 41],
                    popupAnchor: [2, -40],
                    iconUrl: "https://farcross.weather2umbrella.com/europan/icons1/solar.png",
                    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
                });
        
                var jswind=data.features.filter(function(item){
                    return item.properties.type=="wind"
                });
                var jsohl=data.features.filter(function(item){
                    return item.properties.type=="ohl"
                });
                var jsolar=data.features.filter(function(item){
                    return item.properties.type=="solar"
                });

                var group_wpp = L.markerClusterGroup();

        
                var geo_json_wpp = L.geoJson(jswind, {
                pointToLayer: function(feature, latlng) {
                    return L.marker(latlng, {
                    icon:iconw
                    });
                },
                onEachFeature: onEachFeature
        
                })
                geo_json_wpp.on('click', function(e){

                    strz=(~~map.getZoom()).toString()

                    var popup = L.popup()
                            .setContent('<iframe width="750" height="540" src="static/wp_popup.html?wid='+e.layer.feature.properties.id+'?mzum='+strz+'"></iframe>');
                    e.layer.bindPopup(popup,{maxHeight: 2000, minWidth:800}).openPopup()
                  
                })
                group_wpp.addLayer(geo_json_wpp)

                group_wpp.on('clusterclick', function(e){
                    strz=(~~map.getZoom()).toString()
                    console.log('makrerklik','wid='+e.layer.getAllChildMarkers()[0].feature.properties.id+'?mzum=',strz)

                    var popup = L.popup({maxHeight: 2000, minWidth:800})
                        .setLatLng(e.layer.getLatLng())
                        .setContent('<iframe width="750" height="540" src="static/wp_popup.html?wid='+e.layer.getAllChildMarkers()[0].feature.properties.id+'?mzum='+strz+'"></iframe>')
                        .openOn(map);

                
                }
                )

        
                var geo_json_ohl = L.geoJson(jsohl, {
                    pointToLayer: function(feature, latlng) {
                        return L.marker(latlng, {
                            icon:icono
                        });
                    },
                    onEachFeature: onEachFeature
            
                    })
                var geo_json_solar = L.geoJson(jsolar, {
                    pointToLayer: function(feature, latlng) {
                        return L.marker(latlng, {
                            icon:icons
                        });
                    },
                    onEachFeature: onEachFeature
            
                    })
                
                L.Control.TimeDimensionCustom = L.Control.TimeDimension.extend({
                    _getDisplayDateFormat: function(date){
                        return date.format("yy/mm/dd-HH:00");
                    }
                });
        
                w2UtempLayer = w2utemp(t_min,t_max);
        
                eigvmLayer = eigvm(vm_min,vm_max);
        
                w2UtpLayer = w2utp(tp_min,tp_max);
                eigplLayer = eigvm(vm_min,vm_max);   
                w2UtempLayer.on('mouseover',function() {
                    console.log('heathover')
                })
        
                overlayMaps[getI18n('clouds', localLang)] = clouds;
                // overlayMaps[getI18n('cloudscls', localLang)] = cloudscls;
                // overlayMaps[getI18n('precipitation', localLang)] = precipitation;
                overlayMaps[getI18n('precipitationcls', localLang)] = precipitationcls;
                // overlayMaps[getI18n('rain', localLang)] = rain;
                overlayMaps[getI18n('raincls', localLang)] = raincls;
                overlayMaps[getI18n('snow', localLang)] = snow;
                // overlayMaps[getI18n('temp', localLang)] = temp;
                overlayMaps[getI18n('windspeed', localLang)] = wind;
                overlayMaps[getI18n('pressure', localLang)] = pressure;
                 //overlayMaps[getI18n('presscont', localLang)] = pressurecntr;
                overlayMaps[getI18n('city', localLang) + " (min Zoom 5)"] = city;
                overlayMaps[getI18n('windrose', localLang)] = windrose;
                overlayMaps[getI18n('W2U temperature', localLang)] = w2UtempLayer;
                overlayMaps[getI18n('W2U precipitation', localLang)] = w2UtpLayer;
                overlayMaps[getI18n('W2U clouds', localLang)]= sapoHeightTimeLayer;
                overlayMaps[getI18n('W2U t2m-wms', localLang)]=t2mTimeLayer;
                overlayMaps[getI18n('W2U tp-wms', localLang)]=tpTimeLayer
                overlayMaps[getI18n('W2U ws-wms', localLang)]=vsTimeLayer
				overlayMaps[getI18n('Voltage profiles', localLang)] = SSgjs;
                overlayMaps[getI18n('Line loadings', localLang)] = OHLgjs;
                
                //  "Zones" : feature_group_Zones,
            
                overlayMaps["Substations"] = feature_group_Substations;
                overlayMaps["Solar Parks"] = feature_group_SolarParks;
                overlayMaps["\u003c 110 kV Lines"] = feature_group_Under110kVLines;
                overlayMaps["110&150 kV Lines"] = feature_group_150kVand110kVLines;
                overlayMaps["220 kV Lines"] = feature_group_220kVLines;
                overlayMaps["400 kV Lines"] = feature_group_400kVLines;
                overlayMaps["HVDC"] = feature_group_HVDCLines;
                overlayMaps["Zones"] = feature_group_Zones;
                overlayMaps['WPP'] = group_wpp;
                overlayMaps['OHL'] = geo_json_ohl;
                overlayMaps['SPP'] = geo_json_solar;
                // overlayMaps['lll'] = eigplLayer;
        
        
        
                layerControl= L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);
                map.addControl(new L.Control.Permalink({layers: layerControl, useAnchor: false, position: 'bottomright'}));
                var patch = L.DomUtil.create('div', 'owm-layercontrol-header');
                patch.innerHTML = getI18n('layers', localLang); // 'TileLayers';
                layerControl._form.children[2].parentNode.insertBefore(patch, layerControl._form.children[2]);
                patch = L.DomUtil.create('div', 'leaflet-control-layers-separator');
                layerControl._form.children[3].children[0].parentNode.insertBefore(patch, layerControl._form.children[3].children[layerControl._form.children[3].children.length-13]);
                patch = L.DomUtil.create('div', 'owm-layercontrol-header');
                patch.innerHTML = getI18n('current', localLang); // 'Current Weather';
                layerControl._form.children[3].children[0].parentNode.insertBefore(patch, layerControl._form.children[3].children[layerControl._form.children[3].children.length-13]);
                patch = L.DomUtil.create('div', 'owm-layercontrol-header');
                patch.innerHTML = getI18n('maps', localLang); // 'Maps';
                layerControl._form.children[0].parentNode.insertBefore(patch, layerControl._form.children[0]);
            
                patch = L.DomUtil.create('div', 'leaflet-control-layers-separator');
                layerControl._form.children[0].parentNode.insertBefore(patch, null);
                patch = L.DomUtil.create('div', 'owm-layercontrol-header');
                patch.innerHTML = getI18n('prefs', localLang); // 'Preferences';
                layerControl._form.children[0].parentNode.insertBefore(patch, null);
                patch = L.DomUtil.create('div', '');
                patch.innerHTML = '<div id="wheeldiv" onClick="toggleWheel(\'' + localLang + '\')"><img id="wheelimg" src="MapJS/ScrollWheel20.png" align="middle" > <span id="wheeltxt">' + getI18n('scrollwheel', localLang) + ' ' + getI18n('on', localLang) + '</span></div>';
                layerControl._form.children[0].parentNode.insertBefore(patch, null);
        
                var tooltip = L.tooltip({
                    direction: 'center',
                    permanent: true,
                    interactive: true,
                    noWrap: true,
                    opacity: 0.9
                });
                map.on('click', function (ev) {
        
                    if (map.hasLayer(w2UtempLayer) || map.hasLayer(w2UtpLayer) ) {
                        x_s=map.mouseEventToLatLng(ev.originalEvent).lng
                        y_s=map.mouseEventToLatLng(ev.originalEvent).lat
                        if (map.hasLayer(w2UtempLayer)) {
                            t_data= w2UtempLayer._currentTimeData.data;
                        }
                        if (map.hasLayer(w2UtpLayer)) {
                            t_datatp= w2UtpLayer._currentTimeData.data;
                            // console.log(t_datatp);
                        }
                        i=0;
                        j=0
                        kont=true
                        kontt=true
                        konttp=true
                        rad_kont=0.1
                        k1=map.hasLayer(w2UtempLayer)
                        k2=map.hasLayer(w2UtpLayer)
                        while (kont) {
                            tekst=''
                            switch (true) {
                                case k1 && k2:
                                    y_c=t_data[i].lat,
                                    x_c=t_data[i].lng;
                                    if (i<t_data.length) {
                                        tekst+='t='+(t_data[i].t2m).toString()+' &#8451;'+'\r'
                                    } else {
                                        kontt=false
                                    }
                                    if (j<t_datatp.length) {
                                        tekst+='tp='+(t_datatp[j].t2m).toString()+' kg/m2'+'\r'
                                    } else {
                                        konttp=false
                                    }
                                    kont=kontt && konttp
                                    break;
                                case k1 && !k2:
                                    y_c=t_data[i].lat,
                                    x_c=t_data[i].lng;
                                    // tekst+='t='+(t_data[i].t2m).toString()+' &#8451;'+'\r'
                                    if (i<t_data.length) {
                                        tekst+='t='+(t_data[i].t2m).toString()+' &#8451;'+'\r'
                                    } else {
                                        kont=false
                                    }
                                    break;
                                case !k1 && k2:
                                    y_c=t_datatp[j].lat,
                                    x_c=t_datatp[j].lng;
                                    // tekst+='tp='+(t_datatp[j].t2m).toString()+' kg/m2'+'\r'
                                    if (j<t_datatp.length) {
                                        tekst+='tp='+(t_datatp[j].t2m).toString()+' kg/m2'+'\r'
                                    } else {
                                        kont=false
                                    }
                                    break;
                            }
                            if (Math.abs(x_s-x_c)<rad_kont && Math.abs(y_s-y_c)<rad_kont) {
                                console.log(tekst)
                
                                kont=false
                                tooltip.setContent(tekst)
                                tooltip.setLatLng(new L.LatLng(y_c-0.1, x_c));
                                tooltip.addTo(map);
                            }
                            i=i+1
                            j=j+1
                        }
                    }
                });
                
                hpane=map.getPanes('W2U temperature').overlayPane;
        
                hpane.onmousemove =function (e) {
                    map.closeTooltip(tooltip);
                }
                });
                map.on('overlayadd', function(eventLayer) {
                    if (eventLayer.name == 'W2U t2m-wms') {
                        sapoLegend.addTo(this);
                    } 
                    if (eventLayer.name == 'W2U tp-wms') {
                        tpLegend.addTo(this);
                    // } else if (eventLayer.name == 'SAPO - direction of the peak') {
                    //     sapoPeakDirectionLegend.addTo(this);
                    }
                });

                map.on('overlayremove', function(eventLayer) {
                    if (eventLayer.name == 'W2U t2m-wms') {
                        map.removeControl(sapoLegend);
                    } 
                    else if (eventLayer.name == 'W2U tp-wms') {
                        map.removeControl(tpLegend);
                    // } else if (eventLayer.name == 'SAPO - direction of the peak') {
                    //     map.removeControl(sapoPeakDirectionLegend);
                    }
                });
        });
    });
}