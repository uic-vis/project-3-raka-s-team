function getMap(coordinates, zoom) {
  var map = L.map('map').setView(coordinates, zoom);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // FeatureGroup is to store editable layers
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
        circlemarker: false,
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

    const data = loadData("/data/divvy_dataset.csv", function() {console.log("done")});
    addCircles(map, data, 1000);
}

async function loadData(filename, _callback) {
    const arr = await d3.csv(filename, function(data) {

    data["start_lat"] = parseFloat(data.start_lat);
    data["start_lng"] = parseFloat(data.start_lng);
    data["end_lat"] = parseFloat(data.end_lat);
    data["end_lng"] = parseFloat(data.end_lng);
    data["distance_metres"] = distBetween2Points(
        data.start_lat, data.start_lng, data.end_lat, data.end_lng
    );
    // if (isNaN(data.distance_metres)){
    //   continue;
    // }
    const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
    data["started_at"] = parseTime(data.started_at);
    data["ended_at"] = parseTime(data.ended_at);
    // data["duration_seconds"] = (data.ended_at - data.started_at) / 1000;
    // if (isNaN(data.duration_seconds)){
    //   continue;
    // }
    data["dataable_type"] = data.dataable_type;
    data["member_type"] = data.member_casual;
    //     final.push(data);
    //   }


    console.log(data);
        return data;
    });
    _callback();
    return arr;
}

function distBetween2Points(lat1, lon1, lat2, lon2) {
    //
    // Reference: http://www8.nau.edu/cvm/latlon_formula.html
    //
    const PI = Math.PI;
    const earth_rad_miles = 3963.1;  // statute miles
    const earth_rad_metres = 1609.34 * earth_rad_miles;  // statute metres

    var lat1_rad = lat1 * PI / 180.0;
    var lon1_rad = lon1 * PI / 180.0;
    var lat2_rad = lat2 * PI / 180.0;
    var lon2_rad = lon2 * PI / 180.0;

    const dist = earth_rad_metres * Math.acos(
        (Math.cos(lat1_rad) * Math.cos(lon1_rad) * Math.cos(lat2_rad) * Math.cos(lon2_rad))
        +
        (Math.cos(lat1_rad) * Math.sin(lon1_rad) * Math.cos(lat2_rad) * Math.sin(lon2_rad))
        +
        (Math.sin(lat1_rad) * Math.sin(lat2_rad))
    );

    return dist;
}

function addCircles(map, data, pointsToRender) {
    const circles = [];
    for (let i = 0; i < pointsToRender; i++) {
        var ride = data[i];
        var lat = ride.start_lat;
        var lon = ride.start_lng;
        var type = ride.rideable_type;
        // ref: https://www.igismap.com/leafletjs-point-polyline-polygon-rectangle-circle/
        var circleCentre = [lat, lon];
        var circleOptions = {
            color: (type == 'electric_bike') ? LYFTPINK : DIVVYBLUE,
            fillColor: (type == 'electric_bike') ? LYFTPINK : DIVVYBLUE,
            fillOpacity: 1
        }
        
        var circle = L.circle(circleCentre, 20, circleOptions);
        circle.addTo(map);
        circles.push(circle);
    }
    return circles;
}

DIVVYBLUE = "#7dcbf0";
LYFTPINK = "#ff00bf";