/**
 * Calculate the straight line distance between two coordinates.
 * Only works for planet earth 🙂.
 * @param {Number} lat1 latitude of start point
 * @param {Number} lon1 longitude of start point
 * @param {Number} lat2 latitude of end point
 * @param {Number} lon2 longitude of end point
 * @returns straight line distance, in statute metres
 */
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

/**
 * Determine whether a point is inside a Leaflet polygon
 * @param {Number} x point latitude
 * @param {Number} y point longitude
 * @param {JSON Object} poly Leaflet polygon
 * @returns 
 */
function isPointInsidePolygon(marker, poly) {
    // ref: https://stackoverflow.com/questions/31790344/determine-if-a-point-reside-inside-a-leaflet-polygon
    var polyPoints = poly.getLatLngs();       
    console.log(polyPoints);
    var x = marker.getLatLng().lat, y = marker.getLatLng().lng;
    console.log(x, y);

    var inside = false;
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
        var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
        var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    console.log(inside);

    return inside;
};