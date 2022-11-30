export const DIVVYBLUE = "#7dcbf0";
export const LYFTPINK = "#ff00bf";

export function distBetween2Points(lat1, lon1, lat2, lon2) {
    //
    // Reference: http://www8.nau.edu/cvm/latlon_formula.html
    //
    const PI = Math.PI;
    const earth_rad_miles = 3963.1; // statute miles
    const earth_rad_metres = 1609.34 * earth_rad_miles; // statute metres

    var lat1_rad = (lat1 * PI) / 180.0;
    var lon1_rad = (lon1 * PI) / 180.0;
    var lat2_rad = (lat2 * PI) / 180.0;
    var lon2_rad = (lon2 * PI) / 180.0;

    const dist =
        earth_rad_metres *
        Math.acos(
            Math.cos(lat1_rad) *
                Math.cos(lon1_rad) *
                Math.cos(lat2_rad) *
                Math.cos(lon2_rad) +
                Math.cos(lat1_rad) *
                    Math.sin(lon1_rad) *
                    Math.cos(lat2_rad) *
                    Math.sin(lon2_rad) +
                Math.sin(lat1_rad) * Math.sin(lat2_rad)
        );

    return dist;
}
