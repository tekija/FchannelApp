/*
*    Return common layers used in different examples
*/
function getCommonBaseLayers(map){
    var osmLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
        'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    var bathymetryLayer = L.tileLayer.wms("https://ows.emodnet-bathymetry.eu/wms", {
        layers: 'emodnet:mean_atlas_land',
        format: 'image/png',
        transparent: true,
        attribution: "EMODnet Bathymetry",
        opacity: 0.8
    });
    var coastlinesLayer = L.tileLayer.wms("https://ows.emodnet-bathymetry.eu/wms", {
        layers: 'coastlines',
        format: 'image/png',
        transparent: true,
        attribution: "EMODnet Bathymetry",
        opacity: 0.8
    });
    var bathymetryGroupLayer = L.layerGroup([bathymetryLayer, coastlinesLayer]);
    bathymetryGroupLayer.addTo(map);
    return {
        "EMODnet Bathymetry": bathymetryGroupLayer,
        "OSM": osmLayer,
        "ESRI Satellite": Esri_WorldImagery
    };
}