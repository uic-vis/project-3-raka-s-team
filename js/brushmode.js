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
        } else if (type === 'polygon') {
            console.log("a polygon has been created");
        }
        // editableLayers.removeLayer(window.prevLayer);
        // window.prevLayer = layer;
        editableLayers.addLayer(layer);
        console.log(editableLayers);
        // $('button#cancelButton').on('click', function () {
        //     featureGroup.removeLayer(e.layer);
        // });
    });

    // const data = loadData("/data/divvy_dataset.csv", function() {console.log("done")});
    addCircles(map, window.data, 1000);
}

/**
 * Displays a subset of points in the data on the map
 * @param {Map} map leaflet map
 * @param {Array} data divvy data points
 * @param {Number} pointsToRender how many points to render, more = slower
 * @returns 
 */
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