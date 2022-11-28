/**
 * map with heat map, aggregated to community area level
 * @param {Array} coordinates centre point of the map, i.e [45.0, -87.4]
 * @param {Number} zoom how big the map is, preferably 11 to 14
 */
function selectMap(coordinates, zoom) {

    // updateJson(window.data, geojson);

    var map = L.map('map').setView(coordinates, zoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var options = {
        member_electric: true,
        member_normal: true,
        casual_electric: true,
        casual_normal: true,
    }

    let selectedData = select(window.data, options);
    console.log(selectedData.length);
    
    let points = selectedData.map(d => [d.start_lat, d.start_lng, 0.3]);
    L.heatLayer(points, {
        radius: 25,
        // gradient: {0.5: '#ff8ff4', 0.97: '#e831d6', 1: '#850077'},
        blur: 20,
    }).addTo(map);
}

/**
 * Given selected options (pie chart interaction), return the data associated
 * with the proper options
 * @param {Array} data all Divvy Data
 * @param {Object} options object with 4 boolean values, representing pie chart segments
 * @returns filtered data
 */
function select(data, options) {
    const final = [];
    for (let ride of data) {
        if (options.member_electric) {
            if (ride.rideable_type === 'electric_bike' && ride.member_casual === 'member') {
                final.push(ride);
                continue;
            }
        }
        if (options.member_normal) {
            if (ride.rideable_type != 'electric_bike' && ride.member_casual === 'member') {
                final.push(ride);
                continue;
            }
        }
        if (options.casual_electric) {
            if (ride.rideable_type === 'electric_bike' && ride.member_casual === 'casual') {
                final.push(ride);
                continue;
            }
        }
        if (options.casual_normal) {
            if (ride.rideable_type != 'electric_bike' && ride.member_casual === 'casual') {
                final.push(ride);
                continue;
            }
        }
    }
    return final;
}