function getMap(coordinates, zoom) {
  var map = L.map('map').setView(coordinates, zoom);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // FeatureGroup is to store editable layers
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);
  var drawControl = new L.Control.Draw({
      edit: {
          featureGroup: drawnItems
      }
  });
  map.addControl(drawControl);

  drawPolygon(map);

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

function drawPolygon(map) {
    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    var drawPluginOptions = {
        position: 'topright',
        draw: {
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
            color: '#e1e100', // Color the shape will turn when intersects
            message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
            color: '#97009c'
            }
        },
        // disable toolbar item by setting it to false
        polyline: false,
        circle: false, // Turns off this drawing tool
        rectangle: false,
        marker: false,
        },
        edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: false
        }
    };

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw(drawPluginOptions);
    map.addControl(drawControl);

    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    map.on('draw:created', function(e) {
        var type = e.layerType,
        layer = e.layer;

        if (type === 'marker') {
        layer.bindPopup('A popup!');
        }

        editableLayers.addLayer(layer);
    });
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