const chicagoCoordinates = [41.8781, -87.50]

/**
 * Renders the map, innit... it's in the name
 */
function renderMap() {
    let mode = "select";  // TODO: make buttons to switch between modes
    if (mode === 'brush') {
        brushMap(chicagoCoordinates, 12);
    } else if (mode === 'slider') {
        // pass
    } else if (mode === 'select') {
        d3.json("./data/Chicago-CommunityAreas.geojson")
            .then(function(json) {
                selectMap(chicagoCoordinates, 12, json);
        });
    }
}