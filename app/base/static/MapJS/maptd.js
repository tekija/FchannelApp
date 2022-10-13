var currentTime = new Date();
currentTime.setUTCDate(1, 0, 0, 0, 0);
// initMap();
var localLang = getLocalLanguage();
var sttt = {}
json_url='https://farcross.weather2umbrella.com/europan/w_jsons/settings.json'

 
$.getJSON(json_url, function(data) {
	// label_home.textContent=data.start_time
	var time_from=data.start_time.replace('T','  ').replace('.000Z','')
	var time_to=data.stop_time.replace('T','  ').replace('.000Z','')
	console.log(data.update_time)
	document.getElementById('label_home').innerHTML = 'Available timeframe data from: '+time_from + ' to: '+time_to;
	document.getElementById('label_updated').innerHTML = 'Last update: '+data.update_time;

	initMap(data.start_time,data.stop_time,data.min_t+3,data.max_t+2,data.min_tp,data.max_tp,data.min_v,data.max_v);

});
function zoomEuropeq() {

	console.log(map)
	map.setView([48.58,8.1], 6);
 }

function updateURLParameter(url, param, paramVal) {
	var theAnchor = null;
	var newAdditionalURL = "";
	var tempArray = url.split("?");
	var baseURL = tempArray[0];
	var additionalURL = tempArray[1];
	var temp = "";

	if (additionalURL) {
		var tmpAnchor = additionalURL.split("#");
		var theParams = tmpAnchor[0];
		theAnchor = tmpAnchor[1];
		if(theAnchor) {
			additionalURL = theParams;
		}

		tempArray = additionalURL.split("&");

		for (i=0; i<tempArray.length; i++) {
			if(tempArray[i].split('=')[0] != param) {
				newAdditionalURL += temp + tempArray[i];
				temp = "&";
			}
		}        
	} else {
		var tmpAnchor = baseURL.split("#");
		var theParams = tmpAnchor[0];
		theAnchor  = tmpAnchor[1];

		if(theParams) {
			baseURL = theParams;
		}
	}

	if(theAnchor) {
		paramVal += "#" + theAnchor;
	}

	var rows_txt = temp + "" + param + "=" + paramVal;
	return baseURL + "?" + newAdditionalURL + rows_txt;
}

/**
 * Add or replace the language parameter of the URL and reload the page.
 * @param String id of the language
 */
function changeLanguage(pLang) {
	window.location.href = updateURLParameter(window.location.href, 'lang', pLang);
}

/**
 * Get all parameters out of the URL.
 * @return Array List of URL parameters key-value indexed
 */
function getUrlParameters() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i=0; i<hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

/**
 * Callback for successful geolocation.
 * @var position Geolocated position
 */
function foundLocation(position) {
	if (typeof map != "undefined") {
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		map.setView(new L.LatLng(lat, lon), 11);
	}
}

/**
 * Example function to replace leaflet-openweathermap's builtin marker by a wind rose symbol.
 * Some helper functions and an event listener are needed, too. See below.
 */
function myWindroseMarker(data) {
	var content = '<canvas id="id_' + data.id + '" width="50" height="50"></canvas>';
	var icon = L.divIcon({html: content, iconSize: [50,50], className: 'owm-div-windrose'});
	return L.marker([data.coord.Lat, data.coord.Lon], {icon: icon, clickable: false});
}

/**
 * Helper function for replacing leaflet-openweathermap's builtin marker by a wind rose symbol.
 * This function draws the canvas of one marker symbol once it is available in the DOM.
 */
function myWindroseDrawCanvas(data, owm) {

	var canvas = document.getElementById('id_' + data.id);
	canvas.title = data.name;
	var angle = 0;
	var speed = 0;
	var gust = 0;
	if (typeof data.wind != 'undefined') {
		if (typeof data.wind.speed != 'undefined') {
			canvas.title += ', ' + data.wind.speed + ' m/s';
			canvas.title += ', ' + owm._windMsToBft(data.wind.speed) + ' BFT';
			speed = data.wind.speed;
		}
		if (typeof data.wind.deg != 'undefined') {
			//canvas.title += ', ' + data.wind.deg + 'В°';
			canvas.title += ', ' + owm._directions[(data.wind.deg/22.5).toFixed(0)];
			angle = data.wind.deg;
		}
		if (typeof data.wind.gust != 'undefined') {
			gust = data.wind.gust;
		}
	}
	if (canvas.getContext && speed > 0) {
		var red = 0;
		var green = 0;
		if (speed <= 10) {
			green = 10*speed+155;
			red = 255*speed/10.0;
		} else {
			red = 255;
			green = 255-(255*(Math.min(speed, 21)-10)/11.0);
		}
		var ctx = canvas.getContext('2d');
		ctx.translate(25, 25);
		ctx.rotate(angle*Math.PI/180);
		ctx.fillStyle = 'rgb(' + Math.floor(red) + ',' + Math.floor(green) + ',' + 0 + ')';
		ctx.beginPath();
		ctx.moveTo(-15, -25);
		ctx.lineTo(0, -10);
		ctx.lineTo(15, -25);
		ctx.lineTo(0, 25);
		ctx.fill();

		// draw inner arrow for gust
		if (gust > 0 && gust != speed) {
			if (gust <= 10) {
				green = 10*gust+155;
				red = 255*gust/10.0;
			} else {
				red = 255;
				green = 255-(255*(Math.min(gust, 21)-10)/11.0);
			}
			canvas.title += ', gust ' + data.wind.gust + ' m/s';
			canvas.title += ', ' + owm._windMsToBft(data.wind.gust) + ' BFT';
			ctx.fillStyle = 'rgb(' + Math.floor(red) + ',' + Math.floor(green) + ',' + 0 + ')';
			ctx.beginPath();
			ctx.moveTo(-15, -25);
			ctx.lineTo(0, -10);
			//ctx.lineTo(15, -25);
			ctx.lineTo(0, 25);
			ctx.fill();
		}
	} else {
		canvas.innerHTML = '<div>'
				+ (typeof data.wind != 'undefined' && typeof data.wind.deg != 'undefined' ? data.wind.deg + 'В°' : '')
				+ '</div>';
	}
}

/**
 * Helper function for replacing leaflet-openweathermap's builtin marker by a wind rose symbol.
 * This function is called event-driven when the layer and its markers are added. Now we can draw all marker symbols.
 * The this-context has to be the windrose layer.
 */
function windroseAdded(e) {
	for (var i in this._markers) {
		var m = this._markers[i];
		var cv = document.getElementById('id_' + m.options.owmId);
		for (var j in this._cache._cachedData.list) {
			var station = this._cache._cachedData.list[j];
			if (station.id == m.options.owmId) {
				myWindroseDrawCanvas(station, this);
			}
		}
	}
}

/**
 * Example function to replace leaflet-openweathermap's builtin marker.
 */
function myOwmMarker(data) {
	// just a Leaflet default marker
	return L.marker([data.coord.Lat, data.coord.Lon]);
}

/**
 * Example function to replace leaflet-openweathermap's builtin popup.
 */
function myOwmPopup(data) {
	// just a Leaflet default popup
	return L.popup().setContent(typeof data.name != 'undefined' ? data.name : data.id);
}

/**
 * Toggle scroll wheel behaviour.
 */
function toggleWheel(localLang) {
	if (map.scrollWheelZoom._enabled) {
		map.scrollWheelZoom.disable();
		document.getElementById('wheelimg').src = 'MapJS/ScrollWheelDisabled20.png';
		document.getElementById('wheeltxt').innerHTML = getI18n('scrollwheel', localLang) + ' ' + getI18n('off', localLang);
	} else {
		map.scrollWheelZoom.enable();
		document.getElementById('wheelimg').src = 'MapJS/ScrollWheel20.png';
		document.getElementById('wheeltxt').innerHTML = getI18n('scrollwheel', localLang) + ' ' + getI18n('on', localLang);
	}
}

/**
 * Initialize the map.
 */
var map
function initMap(startt,stopt,mint,maxt,mintp,maxtp,minv,maxv) {

	var useGeolocation = false;
	var zoom = 6;
	var lat = 48.58;
	var lon = 8.1;
	var urlParams = getUrlParameters();
	if (typeof urlParams.zoom != "undefined" && typeof urlParams.lat != "undefined" && typeof urlParams.lon != "undefined") {
		zoom = urlParams.zoom;
		lat = urlParams.lat;
		lon = urlParams.lon;
		useGeolocation = false;
    }
	var currentTime = new Date();
    currentTime.setUTCDate(1, 0, 0, 0, 0);

    
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };
		     map =  L.map('map', {
				center: new L.LatLng(lat, lon), crs: L.CRS.EPSG3857, zoom: zoom, zoomControl: true, preferCanvas: true, zoomSnap: 0.4,
				timeDimension: true,
			});
//ovde se definise zoom
			// map.attributionControl.setPrefix("");35.189267, 24.950401
			map.setView([39,24.5], 6);
			L.Control.TimeDimensionCustom = L.Control.TimeDimension.extend({
				_getDisplayDateFormat: function(date){
					return date.format("yy/mm/dd-HH:00");
				}
			});
		

	var feature_group_Zones = L.featureGroup(
        {}
    );

	var feature_group_Under110kVLines = L.featureGroup(
		{}
	).addTo(map);
	var feature_group_150kVand110kVLines = L.featureGroup(
		{}
	).addTo(map);
	var feature_group_220kVLines = L.featureGroup(
		{}
	).addTo(map);
	
	var feature_group_400kVLines = L.featureGroup(
        {}
        ).addTo(map);
	var feature_group_HVDCLines = L.featureGroup(
        {}
        ).addTo(map);
	var feature_group_SolarParks = L.featureGroup(
		{}
		).addTo(map);
	var feature_group_Substations = L.featureGroup(
			{}
		).addTo(map);
	// var ft2mTimeLayer = L.featureGroup(
	// 		{}
	// 	).addTo(map);
	// var sapoHeightTimeLayer = L.featureGroup(
	// 		{}
	// 	).addTo(map);

mapdata(map, feature_group_Under110kVLines,feature_group_150kVand110kVLines,feature_group_220kVLines,
		feature_group_400kVLines,feature_group_HVDCLines,feature_group_SolarParks,feature_group_Substations,
		feature_group_Zones)

    L.easyButton('fa-map-marker', function(){
    geo_json_farcrossZones.eachLayer(function(l) {
            if (l.getTooltip()) {
                l.toggleTooltip()
            }
        });
}, 'Display Names of Zones').addTo(map);
			
	var layerControl = baselayers(map,feature_group_Under110kVLines,feature_group_150kVand110kVLines,feature_group_220kVLines,
	feature_group_400kVLines,feature_group_HVDCLines,feature_group_SolarParks,feature_group_Substations,
	feature_group_Zones,mint,maxt,startt,stopt,mintp,maxtp,minv,maxv);
	map.addControl(new L.Control.Permalink({layers: layerControl, useAnchor: false, position: 'bottomright'}));
	// L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}', {
    //     attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //     apikey: 'cb70ab54827f47059b68bbaa61372a4c',
    //     maxZoom: 22
	// }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a>'
        }).addTo(map);

/**Search form 
	*/
	var feature_group_SubstationssearchControl = new L.Control.Search({
		layer: feature_group_Substations,
		
		propertyName: 'name',
		
		collapsed: "true",
		textPlaceholder: 'Search',
	
		initial: false,
		
		zoom: 7,
		
		position:'topright',
		hideMarkerOnCollapse: true
	
		});
		feature_group_SubstationssearchControl.on('search:locationfound', function(e) {
			feature_group_Substations.setStyle(function(feature){
				return feature.properties.style
			})
			
			if(e.layer._popup)
				e.layer.openPopup();
		})
		feature_group_SubstationssearchControl.on('search:collapsed', function(e) {
				feature_group_Substations.setStyle(function(feature){
					return feature.properties.style
			});
		});
		map.addControl( feature_group_SubstationssearchControl );

      /** Distance measurement
	  */
	              var mouse_position_ebc8533868894023bc31a0c5b62a0469 = new L.Control.MousePosition(
                {"emptyString": "Unavailable", "lngFirst": false, "numDigits": 5, "position": "bottomright", "prefix": "", "separator": " : "}
            );
            mouse_position_ebc8533868894023bc31a0c5b62a0469.options["latFormatter"] =
                undefined;
            mouse_position_ebc8533868894023bc31a0c5b62a0469.options["lngFormatter"] =
                undefined;
            map.addControl(mouse_position_ebc8533868894023bc31a0c5b62a0469);
        
    
            var measure_control_18bee2dc045d4444bfe745dedd4cd87f = new L.Control.Measure(
                {"position": "bottomright", "primaryAreaUnit": "sqmeters", "primaryLengthUnit": "kilometers", "secondaryAreaUnit": "acres"});
            map.addControl(measure_control_18bee2dc045d4444bfe745dedd4cd87f);

	// patch layerControl to add some titles
	var patch = L.DomUtil.create('div', 'owm-layercontrol-header');
	patch.innerHTML = getI18n('layers', localLang); // 'TileLayers';
	// layerControl._form.children[2].parentNode.insertBefore(patch, layerControl._form.children[2]);
	patch = L.DomUtil.create('div', 'leaflet-control-layers-separator');
	// layerControl._form.children[3].children[0].parentNode.insertBefore(patch, layerControl._form.children[3].children[layerControl._form.children[3].children.length-8]);
	patch = L.DomUtil.create('div', 'owm-layercontrol-header');
	patch.innerHTML = getI18n('current', localLang); // 'Current Weather';
	// layerControl._form.children[3].children[0].parentNode.insertBefore(patch, layerControl._form.children[3].children[layerControl._form.children[3].children.length-8]);
	patch = L.DomUtil.create('div', 'owm-layercontrol-header');
	patch.innerHTML = getI18n('maps', localLang); // 'Maps';
	// layerControl._form.children[0].parentNode.insertBefore(patch, layerControl._form.children[0]);

	patch = L.DomUtil.create('div', 'leaflet-control-layers-separator');
	// layerControl._form.children[0].parentNode.insertBefore(patch, null);
	patch = L.DomUtil.create('div', 'owm-layercontrol-header');
	patch.innerHTML = getI18n('prefs', localLang); // 'Preferences';
	// layerControl._form.children[0].parentNode.insertBefore(patch, null);
	patch = L.DomUtil.create('div', '');
	patch.innerHTML = '<div id="wheeldiv" onClick="toggleWheel(\'' + localLang + '\')"><img id="wheelimg" src="MapJS/ScrollWheel20.png" align="middle" > <span id="wheeltxt">' + getI18n('scrollwheel', localLang) + ' ' + getI18n('on', localLang) + '</span></div>';
	// layerControl._form.children[0].parentNode.insertBefore(patch, null);

	if (useGeolocation && typeof navigator.geolocation != "undefined") {
		navigator.geolocation.getCurrentPosition(foundLocation);
	}
	
	/**
	otvaranje i pretraga XML fajla OHLs.xml
	*/

 // Create a connection to the file.
  var Connect = new XMLHttpRequest();

  // Define which file to open and send the request.
  Connect.open("GET", "XML_io/OHLs.xml", false);
  Connect.setRequestHeader("Content-Type", "text/xml");
   Connect.send(null);

  // Place the response in an XML document.
  var TheDocument = Connect.responseXML;

  // Place the root node in an element.
  var data_OHLs = TheDocument.childNodes[0];

  // Retrieve each plant in turn.
  for (var i = 0; i < data_OHLs.children.length; i++)
  {
   var Branches = data_OHLs.children[i];

   // Access each of the data values.
   //Branch General data
   var BranchSS1 = Branches.attributes["SS1"].textContent.toString();
   var BranchSS2 = Branches.attributes["SS2"].textContent.toString();
   var BranchCountry1 = Branches.attributes["country1"].textContent.toString();
   var BranchCountry2 = Branches.attributes["country2"].textContent.toString();
   var BranchNominalVoltage = Branches.attributes["NominalVoltage"].textContent.toString();

  var OHLType = Branches.getElementsByTagName("OHLType");
  var ThermalLimit_summer_MVA = Branches.getElementsByTagName("ThermalLimit_summer_MVA");
  var ThermalLimit_winter_MVA = Branches.getElementsByTagName("ThermalLimit_winter_MVA");
  var Length_Country1_km = Branches.getElementsByTagName("Length_Country1_km");
  var Length_Country2_km = Branches.getElementsByTagName("Length_Country2_km");
  var R_Ohm = Branches.getElementsByTagName("R_Ohm");
  var X_Ohm = Branches.getElementsByTagName("X_Ohm");
  var S_uS = Branches.getElementsByTagName("S_uS");
  var Offset = Branches.getElementsByTagName("Offset");

   //Connecting GPS data
   var GPS = Branches.getElementsByTagName("GPS");

  var Output1 = OHLType[0].textContent.toString();
  var Output2 = ThermalLimit_summer_MVA[0].textContent.toString();
  var Output3 = ThermalLimit_winter_MVA[0].textContent.toString();
  var Output4 = Length_Country1_km[0] + Length_Country2_km[0];
  var Output5 = R_Ohm[0].textContent.toString();
  var Output6 = X_Ohm[0].textContent.toString();
  var Output7 = S_uS[0].textContent.toString();
  var Offset_out = Offset[0].textContent.toString();

//GPS array
var GPSArray = new Array ( );
     for (var j = 0; j < GPS.length; j++)
  {
   var GPSs = GPS[j];
GPSArray[j]= new Array (GPSs.attributes["Longitude"].textContent.toString(),GPSs.attributes["Latitude"].textContent.toString());

   }

      /**
	Taking the lines from xml file OHLs.xml
	*/


//400kV AC lines
     if (Output1 == "AC" && BranchNominalVoltage == "400") {
         L.polyline(GPSArray,{"bubblingMouseEvents": true, "color": "red", "dashArray": "", "dashOffset": null, "fill": false, "fillColor": "red", "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "noClip": false, "offset": Offset_out, "opacity": 1, "smoothFactor": 1.0, "stroke": true, "weight": 2}).bindPopup('<b>OHL ' + BranchNominalVoltage + ' kV ' + BranchSS1 + ' (' + BranchCountry1 + ') - ' + BranchSS2 + ' (' + BranchCountry2 + ')</b><br>-OHL type: ' + Output1 + '<br>-Thermal limit summer [MVA]: ' + Output2 + '<br>-Thermal limit winter [MVA]:  ' + Output3 + '<br>-Load Duration Curve:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama_static_array.html','jbnWindow1','width=600,height=400')>" + '<br>-Length:  ' + Output4 + '<br>-R [Ohm]:  ' + Output5 + '<br>-X [Ohm]:  ' + Output6 + '<br>-S [uS]:  ' + Output7 + '<br>-Real Time Flow:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama.html','jbnWindow','width=600,height=400')>").addTo(map).bindTooltip( BranchSS1 + ' (' + BranchCountry1 + ') - ' + BranchSS2 + ' (' + BranchCountry2 + ')', {"sticky": true});
    // .addTo(feature_group_400kVLines DODATI NAKON STO SE UBACE U XMLSVI VODOVI 400KV
      }
// 220kV AC  lines
    if (Output1 == "AC" && BranchNominalVoltage == "220") {
        L.polyline(GPSArray,{"bubblingMouseEvents": true, "color": "#38a800", "dashArray": "", "dashOffset": null, "fill": false, "fillColor": "red", "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "noClip": false, "offset": 0, "opacity": 1, "smoothFactor": 1.0, "stroke": true, "weight": 2}).bindPopup('<b>OHL ' + BranchNominalVoltage + ' kV ' + BranchSS1 + ' (' + BranchCountry1 + ') - ' + BranchSS2 + ' (' + BranchCountry2 + ')</b><br>-OHL type: ' + Output1 + '<br>-Thermal limit summer [MVA]: ' + Output2 + '<br>-Thermal limit winter [MVA]:  ' + Output3 + '<br>-Load Duration Curve:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama_static_array.html','jbnWindow1','width=600,height=400')>" + '<br>-Length:  ' + Output4 + '<br>-R [Ohm]:  ' + Output5 + '<br>-X [Ohm]:  ' + Output6 + '<br>-S [uS]:  ' + Output7 + '<br>-Real Time Flow:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama.html','jbnWindow','width=600,height=400')>").addTo(map).addTo(feature_group_220kVLines);
    } 
//110kV and 150kV AC  lines
    if (Output1 == "AC" && BranchNominalVoltage == "110" || BranchNominalVoltage == "150") {
        L.polyline(GPSArray,{"bubblingMouseEvents": true, "color": "#003eb0", "dashArray": "", "dashOffset": null, "fill": false, "fillColor": "red", "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "noClip": false, "offset": 0, "opacity": 1, "smoothFactor": 1.0, "stroke": true, "weight": 2}).bindPopup('<b>OHL ' + BranchNominalVoltage + ' kV ' + BranchSS1 + ' (' + BranchCountry1 + ') - ' + BranchSS2 + ' (' + BranchCountry2 + ')</b><br>-OHL type: ' + Output1 + '<br>-Thermal limit summer [MVA]: ' + Output2 + '<br>-Thermal limit winter [MVA]:  ' + Output3 + '<br>-Load Duration Curve:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama_static_array.html','jbnWindow1','width=600,height=400')>" + '<br>-Length:  ' + Output4 + '<br>-R [Ohm]:  ' + Output5 + '<br>-X [Ohm]:  ' + Output6 + '<br>-S [uS]:  ' + Output7 + '<br>-Real Time Flow:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama.html','jbnWindow','width=600,height=400')>").addTo(map).addTo(feature_group_150kVand110kVLines);
    } 
//Under 110kV AC  lines
    if (Output1 == "AC" && BranchNominalVoltage == "Under110") {
        L.polyline(GPSArray,{"bubblingMouseEvents": true, "color": "#FFA500", "dashArray": "", "dashOffset": null, "fill": false, "fillColor": "red", "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "noClip": false, "offset": 0, "opacity": 1, "smoothFactor": 1.0, "stroke": true, "weight": 2}).bindPopup('<b>OHL ' + BranchNominalVoltage + ' kV ' + BranchSS1 + ' (' + BranchCountry1 + ') - ' + BranchSS2 + ' (' + BranchCountry2 + ')</b><br>-OHL type: ' + Output1 + '<br>-Thermal limit summer [MVA]: ' + Output2 + '<br>-Thermal limit winter [MVA]:  ' + Output3 + '<br>-Load Duration Curve:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama_static_array.html','jbnWindow1','width=600,height=400')>" + '<br>-Length:  ' + Output4 + '<br>-R [Ohm]:  ' + Output5 + '<br>-X [Ohm]:  ' + Output6 + '<br>-S [uS]:  ' + Output7 + '<br>-Real Time Flow:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama.html','jbnWindow','width=600,height=400')>").addTo(map).addTo(feature_group_Under110kVLines);
    } 
//HVDC  lines
    if (Output1 == "DC") {
        L.polyline(GPSArray,{"bubblingMouseEvents": true, "color": "#ee81ee", "dashArray": "", "dashOffset": null, "fill": false, "fillColor": "red", "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "noClip": false, "offset": 0, "opacity": 1, "smoothFactor": 1.0, "stroke": true, "weight": 2}).bindPopup('<b>OHL ' + BranchNominalVoltage + ' kV ' + BranchSS1 + ' (' + BranchCountry1 + ') - ' + BranchSS2 + ' (' + BranchCountry2 + ')</b><br>-OHL type: ' + Output1 + '<br>-Thermal limit summer [MVA]: ' + Output2 + '<br>-Thermal limit winter [MVA]:  ' + Output3 + '<br>-Load Duration Curve:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama_static_array.html','jbnWindow1','width=600,height=400')>" + '<br>-Length:  ' + Output4 + '<br>-R [Ohm]:  ' + Output5 + '<br>-X [Ohm]:  ' + Output6 + '<br>-S [uS]:  ' + Output7 + '<br>-Real Time Flow:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama.html','jbnWindow','width=600,height=400')>").addTo(map).addTo(feature_group_HVDCLines);
    } 
 

 // NEOPHODNO JE DODATI RASPOZNAVANJE DVOSTRUKIH I TROSTRUKIH DV I UBACITI U OFFSET=-2

// primer u kojem su svi popup vidljivi, dobro za prikaz rezultata tokova snaga ili slicno...  
//L.polyline(GPSArray,{color:'#ffd400',opacity:1}).bindPopup('text', {closeOnClick: false, autoClose: false}).addTo(map).openPopup();

}

/**
	otvaranje i pretraga XML fajla substations.xml
	*/

 // Create a connection to the file.
  var Connect1 = new XMLHttpRequest();

  // Define which file to open and send the request.
  Connect1.open("GET", "XML_io/substations.xml", false);
  Connect1.setRequestHeader("Content-Type", "text/xml");
  Connect1.send(null);

  // Place the response in an XML document.
  var TheDocument1 = Connect1.responseXML;

  // Place the root node in an element.
  var data_substations = TheDocument1.childNodes[0];

  // Retrieve each plant in turn.
  for (var k = 0; k < data_substations.children.length; k++)
  {
   var Substations = data_substations.children[k];

  // Access each of the data values.
   //Plant General data
   var PlantName = Substations.attributes["name"].textContent.toString();
   var Type = Substations.getElementsByTagName("Type");
   var InstalledCapacity = Substations.getElementsByTagName("InstalledCapacity");
   var Unom_kV = Substations.getElementsByTagName("Unom_kV");
   var Umin_kV = Substations.getElementsByTagName("Umin_kV");
   var Umax_kV = Substations.getElementsByTagName("Umax_kV");
   //Weather data
   var wWindSpeed = Substations.getElementsByTagName("wWindSpeed");
   var wSolarRadiation = Substations.getElementsByTagName("wSolarRadiation");
   var wTemperature = Substations.getElementsByTagName("wTemperature");
   var wCloudiness = Substations.getElementsByTagName("wCloudiness");
   var wPrecipitations = Substations.getElementsByTagName("wPrecipitations");
   var wInflows = Substations.getElementsByTagName("wInflows");
   var wIceAlarm = Substations.getElementsByTagName("wIceAlarm");
   var wStormsAlarm = Substations.getElementsByTagName("wStormsAlarm");

	//Current Date and Time
	var currentdate = new Date();
	var datetime = "Last Sync on: " + currentdate.getDate() + "/"
					+ (currentdate.getMonth()+1)  + "/"
					+ currentdate.getFullYear() + " @ "
					+ currentdate.getHours() + ":"
					+ currentdate.getMinutes() + ":"
					+ currentdate.getSeconds();

   //Connecting GPS data
   var GPSs = Substations.getElementsByTagName("GPS");


  var Output1s = Substations.attributes["name"].textContent.toString();
  var Output2s = Type[0].textContent.toString();
  var Output3s = InstalledCapacity[0].textContent.toString();
  var Output4s = Unom_kV[0].textContent.toString();
  var Output5s = Umin_kV[0].textContent.toString();
  var Output6s = Umax_kV[0].textContent.toString();
  //**Weather outputs
  var Output7s = wWindSpeed[0].textContent.toString();
  var Output8s = wSolarRadiation[0].textContent.toString();
  var Output9s = wTemperature[0].textContent.toString();
  var Output10s = wCloudiness[0].textContent.toString();
  var Output11s = wPrecipitations[0].textContent.toString();
  var Output12s = wInflows[0].textContent.toString();
  var Output13s = wIceAlarm[0].textContent.toString();
  var Output14s = wStormsAlarm[0].textContent.toString();


//GPS array
var GPSArrays = new Array ( );
     for (var n = 0; n < GPSs.length; n++)
  {
   var GPSss = GPSs[n];
GPSArrays[n]= new Array (GPSss.attributes["Longitude"].textContent.toString(),GPSss.attributes["Latitude"].textContent.toString());

   }

      /**
	crtanje poligona na osnovu gps koordinata trafostanice
	*/
       // add line from toUnion array points to map with some basic styling

   L.polygon(GPSArrays,{color:'#ffd400',opacity:0.4}).bindPopup('<b>Name of the Plant: ' + Output1s + '</b><br>-Substation type: ' + Output2s + '<br>-Installed capacity: ' + Output3s + '<br>-Production Curve:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama.html','jbnWindow1','width=600,height=400')>" + '<br>-Nominal voltage:  ' + Output4s + '<br>-MinVoltage:  ' + Output5s + '<br>-MaxVoltage:  ' + Output6s + '<br>-Consumption Curve:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama_trend.html','jbnWindow','width=600,height=400')>" + '<br><b>Weather ' + datetime + '</b><br>-Wind speed: ' + Output7s + '<br>-Wind Real Time:' + "<input class='input1' type='button' id='script' name='scriptbutton' value=' Plot Diagram' onclick=window.open('Diagrams/crtanje_dijagrama.html','jbnWindow2','width=600,height=400')>" + '<br>-Solar radiation:  ' + Output8s + '<br>-Temperature:  ' + Output9s + '<br>-Cloudiness:  ' + Output10s + '<br>-Precipitations:   ' + Output11s + '<br>-Inflows:  ' + Output12s + '<br>-Ice Alarm:  ' + Output13s + '<br>-Storm Alarm:  ' + Output14s, {closeOnClick: false, autoClose: false}).addTo(map);

// primer u kojem su svi popup vidljivi, dobro za prikaz rezultata tokova snaga ili slicno...  L.polyline(GPSArray,{color:'#ffd400',opacity:1}).bindPopup('text', {closeOnClick: false, autoClose: false}).addTo(map).openPopup();

   }
	
	//map.on('click', function(e){
    //map.setView(e.latlng, 15);
	//return map;
//});

}
