function getMap(coordinates, zoom) {
  var map = L.map('map').setView(coordinates, zoom);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // function style(feature) {

  //   var colorScale = d3.scaleQuantize()
  //     .domain([0, 1000])
  //     .range(colorbrewer.YlOrRd[9]);

  //   return {
  //     // fillColor: getColor(feature.properties.density),
  //     // fillColor: "#ff00ff",
  //     fillColor: colorScale(feature.properties.density),
  //     weight: 2,
  //     opacity: 1,
  //     color: 'black',
  //     dashArray: '1',
  //     fillOpacity: 0.7
  //   };
  // }

  // function onEachFeature(feature, layer) {
  //   console.log(feature);
  // }

  // L.geoJSON(statesData, {style: style, onEachFeature: onEachFeature}).addTo(map);
}

// function loadData(filename) {
//   const arr = [];
//   return d3.csv(filename, function(data) {
//     // arr.push(data);
//     // console.log(data);
//   });
//   // return arr;
// }

// function cleanData(data) {


// }

// function init(){
//   const raw = loadData("data/202210-divvy-tripdata.csv");
//   console.log(raw);
// }

// window.onload = init;

// raw = d3.csv("/data/divvy_dataset.csv", function(data) {});
// console.log(raw);