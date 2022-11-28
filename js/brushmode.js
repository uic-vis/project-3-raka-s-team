/**
 * map with scattered divvy ride starting points,
 * with select region interaction
 * @param {Array} coordinates centre point of the map, i.e [45.0, -87.4]
 * @param {Number} zoom how big the map is, preferably 11 to 14
 */
function brushMap(coordinates, zoom) {
    var map = L.map('map').setView(coordinates, zoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // FeatureGroup is to store editable layers
    // TODO: remove previous layer when a new one is drawn, or add a delete button
    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    var drawPluginOptions = {
        // position: 'topright',
        draw: {
            polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons
                drawError: {
                color: 'gray', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                },
                shapeOptions: {
                color: 'gray'
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
            remove: true
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

        if (type === 'polygon') {
            console.log("a polygon has been created");
        }
        // editableLayers.removeLayer(window.prevLayer);
        // window.prevLayer = layer;
        editableLayers.addLayer(layer);
        brush = layer.toGeoJSON();
        console.log(brush);
        
        // update the circles, colour the ones within the brush
        updateCircles(window.data, layer);
        let filtered = filterData(window.data, layer);
        console.log(filtered.length);
    });

    // const data = loadData("/data/divvy_dataset.csv", function() {console.log("done")});
    addCircles(map, window.data, 1000);


    // ref: https://github.com/Leaflet/Leaflet.heat
    // const normalPoints = [];
    // const electricPoints = [];
    // for (let ride of window.data) {
    //     if (ride.rideable_type === 'electric_bike') {
    //         electricPoints.push(ride.map_circle.getLatLng());
    //     } else {
    //         normalPoints.push(ride.map_circle.getLatLng());
    //     }
    // }

    // L.heatLayer(electricPoints, {
    //     radius: 25,
    //     gradient: {0.5: '#ff8ff4', 0.97: '#e831d6', 1: '#850077'},
    //     blur: 20,
    // }).addTo(map);
    // L.heatLayer(normalPoints, {
    //     radius: 25,
    //     // gradient: {0.4: '#98def5', 0.65: '#34a8cf', 1: '#004359'},
    //     blur: 20,
    // }).addTo(map);
}

/**
 * Displays a subset of points in the data on the map
 * @param {Map} map leaflet map
 * @param {Array} data divvy data points
 * @param {Number} pointsToRender how many points to render, more = slower
 * @returns 
 */
function addCircles(map, data, pointsToRender) {
    for (let ride of data) {
        // var ride = data[i];
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
        // circle.addTo(map);
        ride["map_circle"] = circle;
    }

    for (let i = 0; i < pointsToRender; i++) {
        data[i].map_circle.addTo(map);
    }
}

// TODO: We could prpbably merge the following 2 functions together.

/**
 * update the colour of the selected circles
 * @param {Array} data all Divvy data
 * @param {Array} brush Leaflet polygon
 */
function updateCircles(data, brush) {
    // console.log(data);
    for (let ride of data) {
        if (brush.contains(ride.map_circle.getLatLng())) {
            ride.map_circle.setStyle({
                color: (ride.rideable_type == 'electric_bike') ? LYFTPINK : DIVVYBLUE,
                fillColor: (ride.rideable_type == 'electric_bike') ? LYFTPINK : DIVVYBLUE,
                fillOpacity: 1
            });
        } else {
            ride.map_circle.setStyle({
                color: 'gray',
                fillColor: 'gray',
                fillOpacity: 1
            });
        }
    }
}


/**
 * Return only the points in the data that are within the polygon
 * @param {Array} data pre-filtered data
 * @param {Array} polygon Leaflet polygon
 * @returns {Array} data of all points inside polygon
 */
function filterData(data, polygon) {
    console.log(data);
    console.log(polygon);
    const final = [];
    // return data.filter(function(d) {
    //     polygon.contains(d.map_circle.getLatLng());
    // });
    for (let ride of data) {
        if (polygon.contains(ride.map_circle.getLatLng())) {
            final.push(ride);
        }
    }
    return final;
}