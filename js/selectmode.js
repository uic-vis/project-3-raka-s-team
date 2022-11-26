/**
 * map with heat map, aggregated to community area level
 * @param {Array} coordinates centre point of the map, i.e [45.0, -87.4]
 * @param {Number} zoom how big the map is, preferably 11 to 14
 */
function selectMap(coordinates, zoom, geojson) {

    updateJson(window.data, geojson);

    var map = L.map('map').setView(coordinates, zoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function style1(feature) {
        return {
            // fillColor: getColor(feature.properties.density),
            fillColor: "#ff00ff",
            // fillColor: colorScale(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        };
    }

    L.geoJSON(geojson, {style: style1}).addTo(map);

}

function updateJson(data, geojson) {
    console.log(data);
    console.log(geojson);
    // for (let feature of geojson.features) {
    //     var count = 0;
    //     for (let ride of data) {
    //         if (d3.geoContains(feature.geometry, [ride.start_lng, ride.start_lat])) {
    //             count += 1;
    //         }
    //     }
    //     console.log(count);
    // }
}