import raw from "./divvy_dataset.json";
import * as d3 from "d3";
import { distBetween2Points, DIVVYBLUE, LYFTPINK } from "../../constant";
import L from "leaflet";
import * as LeafletDraw from "leaflet-draw";
import "leaflet.heat";
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer } from "react-leaflet";
import { useEffect } from "react";
/**
 * map with heat map, aggregated to community area level
 * @param {Array} coordinates centre point of the map, i.e [45.0, -87.4]
 * @param {Number} zoom how big the map is, preferably 11 to 14
 */
export function selectMap(data, map, checkBoxes) {
    // updateJson(window.data, geojson);
    console.log(checkBoxes)
    var options = {
        casual_normal: checkBoxes[0],
        casual_electric: checkBoxes[1],
        member_normal: checkBoxes[2],
        member_electric: checkBoxes[3],
    };

    let selectedData = select(data, options);
    console.log(selectedData.length);
    
    let points = selectedData.map((d) => [d.start_lat, d.start_lng, 0.3]);
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
export function select(data, options) {
    const final = [];
    for (let ride of data) {
        if (options.member_electric) {
            if (
                ride.rideable_type === "electric_bike" &&
                ride.member_casual === "member"
            ) {
                final.push(ride);
                continue;
            }
        }
        if (options.member_normal) {
            if (
                ride.rideable_type !== "electric_bike" &&
                ride.member_casual === "member"
            ) {
                final.push(ride);
                continue;
            }
        }
        if (options.casual_electric) {
            if (
                ride.rideable_type === "electric_bike" &&
                ride.member_casual === "casual"
            ) {
                final.push(ride);
                continue;
            }
        }
        if (options.casual_normal) {
            if (
                ride.rideable_type != "electric_bike" &&
                ride.member_casual === "casual"
            ) {
                final.push(ride);
                continue;
            }
        }
    }
    return final;
}

/**
 * Given Divvy data, return object showing the percentage
 * of member-casual and bike types
 */
export function getPercentages(data) {
    const counts = {};
    for (let ride of data) {
        const member = ride.member_casual;
        const bike = ride.rideable_type;

        if (!(member in counts)) {
            counts[member] = {};
        }

        if (!(bike in counts[member])) {
            counts[member][bike] = 1;
        } else {
            counts[member][bike] += 1;
        }
    }

    var fix = (counts) => {
        return {
            ...counts,
            casual: {
                classic_bike:
                    counts.casual.classic_bike + counts.casual.docked_bike,
                electric_bike: counts.casual.electric_bike,
            },
        };
    };

    let bikeCounts = fix(counts);

    const total_casual = Object.values(bikeCounts.casual).reduce(
        (a, b) => a + b
    );
    const total_member = Object.values(bikeCounts.member).reduce(
        (a, b) => a + b
    );
    return {
        bikeCounts: bikeCounts,
        bikeRatios: {
            casual: {
                classic_bike: bikeCounts.casual.classic_bike / total_casual,
                electric_bike: bikeCounts.casual.electric_bike / total_casual,
            },
            member: {
                classic_bike: bikeCounts.member.classic_bike / total_member,
                electric_bike: bikeCounts.member.electric_bike / total_member,
            },
        },
    };
}
