function getMap(coordinates, zoom) {
    var map = L.map('map').setView(coordinates, zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // color = d3.scaleLinear()
    //   .domain(d3.extent(statesData, d => screen.properties.density)).nice()
    //   .range(d3.interpolateTurbo)

    L.geoJSON(statesData, {
        style: function(feature) {
            // return {color: color(feature.properties.density)};
            return {color: "#ff00ff"};
        }
    }).addTo(map);
}

d3 = require("d3")