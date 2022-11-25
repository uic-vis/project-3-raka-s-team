/**
 * Global, Divvy official colours.
 */
DIVVYBLUE = "#7dcbf0";
LYFTPINK = "#ff00bf";

/**
 * Load data from Divvy csv file and callback on functions
 * used to make all the visualisations.
 * @param {String} filename path to Divvy data file
 */
function loadData(filename) {
    // ref: http://learnjsdata.com/read_data.html
    // ref: https://stackoverflow.com/questions/9491885/csv-to-array-in-d3-js
    d3.csv(filename, function(d) {
        const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
        return {
            // self note: anything with + converts to Number
            index: +d.index,
            end_lat: +d.end_lat,
            end_lng: +d.end_lng,
            start_lat: +d.start_lat,
            start_lng: +d.start_lng,
            distance_metres: distBetween2Points(
                +d.start_lat, +d.start_lng, +d.end_lat, +d.end_lng
            ),
            started_at: parseTime(d.started_at),
            ended_at: parseTime(d.ended_at),
            member_casual: d.member_casual,
            rideable_type: d.rideable_type,
            ride_id: d.ride_id,
            start_station_name: d.start_station_name,
            start_station_id: d.start_station_id,
            end_station_name: d.end_station_name,
            end_station_id: d.end_station_id,
        }
    }).then(function(data) {
        window.data = data;
        // do something with the data here
        renderMap();
    });
}

function init() {
    loadData("./data/divvy_dataset.csv");
}

window.onload = init;