function getMap(coordinates, zoom) {
  var map = L.map('map').setView(coordinates, zoom);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // color = d3.scaleLinear()
  //   .domain(d3.extent(statesData, d => screen.properties.density)).nice()
  //   .range(d3.interpolateTurbo)

  function getColor(d) {
    return d > 1000 ? '#91003f' :
           d > 500  ? '#ce1256' :
           d > 200  ? '#e7298a' :
           d > 100  ? '#df65b0' :
           d > 50   ? '#c994c7' :
           d > 20   ? '#d4b9da' :
           d > 10   ? '#e7e1ef' :
                      '#f7f4f9' ;
  }

  function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  L.geoJSON(statesData, {style: style}).addTo(map);
}

d3 = require("d3")