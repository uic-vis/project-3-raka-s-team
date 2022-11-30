import { useD3 } from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";
import { DIVVYBLUE, LYFTPINK } from "../constant";
import { useState } from "react";

function Scatterplot({ data, chosenData, minutesSince }) {
    const cutoffRange = 60; // 60 minutes of data plotted
    const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
    var absoluteStart = parseTime("2022-10-25 00:00:00");
    var middleCutoff = d3.timeMinute.offset(
        absoluteStart,
        cutoffRange / 2 + minutesSince
    );
    var startCutoff = d3.timeMinute.offset(
        middleCutoff,
        -1 * (cutoffRange / 2)
    );
    var endCutoff = d3.timeMinute.offset(middleCutoff, cutoffRange / 2);
    const filtered = (newdata, startCutoff1, endCutoff1) => {
        let filteredData = newdata.filter(function (d) {
            return d.started_at > startCutoff1 && d.ended_at < endCutoff1;
        });
        console.log(filteredData);
        return filteredData;
    };
    const ref = useD3(
        (svg) => {
            const margin = { top: 100, right: 20, bottom: 50, left: 105 };
            const visWidth = 800;
            const visHeight = 600;
            const bikeType = Array.from(
                new Set(data.map((d) => d.rideable_type))
            );
            const g = svg
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            const x = d3
                .scaleLinear()
                // .domain(d3.extent(processed.map(entry => entry.duration_seconds))).nice()
                .domain([0, 4000])
                .nice()
                .range([0, visWidth]);
            const y = d3
                .scaleLinear()
                // .domain(d3.extent(processed.map(entry => entry.distance_metres))).nice()
                .domain([0, 16000])
                .nice()
                .range([visHeight, 0]);
            const bikeColor = d3
                .scaleOrdinal()
                .domain(bikeType)
                .range([LYFTPINK, DIVVYBLUE, DIVVYBLUE]); // classic and docked are the same

            const xAxis = (g, scale, label) =>
                g
                    .attr("transform", `translate(0, ${visHeight})`)
                    // add axis
                    .call(d3.axisBottom(scale))
                    // remove baseline
                    .call((g) => g.select(".domain").remove())
                    // add grid lines
                    // references https://observablehq.com/@d3/connected-scatterplot
                    .call((g) =>
                        g
                            .selectAll(".tick line")
                            .clone()
                            .attr("stroke", "#d3d3d3")
                            .attr("y1", -visHeight)
                            .attr("y2", 0)
                    )
                    // add label
                    .append("text")
                    .attr("x", visWidth / 2)
                    .attr("y", 40)
                    .attr("fill", "black")
                    .attr("text-anchor", "middle")
                    .text(label);
            const yAxis = (g, scale, label) =>
                // add axis
                g
                    .call(d3.axisLeft(scale))
                    // remove baseline
                    .call((g) => g.select(".domain").remove())
                    // add grid lines
                    // refernces https://observablehq.com/@d3/connected-scatterplot
                    .call((g) =>
                        g
                            .selectAll(".tick line")
                            .clone()
                            .attr("stroke", "#d3d3d3")
                            .attr("x1", 0)
                            .attr("x2", visWidth)
                    )
                    // add label
                    // TODO: Rotate the y-axis label
                    .append("text")
                    .attr("writing-mode", "vertical-lr")
                    .attr("x", -55)
                    .attr("y", visHeight / 2)
                    .attr("fill", "black")
                    .attr("dominant-baseline", "middle")
                    .text(label);
            // axes
            g.append("g").call(xAxis, x, "duration (seconds)");
            g.append("g").call(yAxis, y, "distance (metres)");

            // draw points
            g.selectAll("circle")
                // filter data to only contain selected car origins
                .data(filtered(data, startCutoff, endCutoff))
                .join("circle")
                .attr("cx", (d) => x(d.duration_seconds))
                .attr("cy", (d) => y(d.distance_metres))
                .attr("id", "datacircles")
                .attr("fill", (d) => bikeColor(d.rideable_type))
                .attr("opacity", 1)
                .attr("r", 3);
            const subtitle =
                "between " +
                d3.timeFormat("%A, %b %d %H:%M")(startCutoff) +
                " and " +
                d3.timeFormat("%A, %b %d %H:%M")(endCutoff);
            const title = "Distribution of Ride Distances and Durations";
            // Title
            svg.append("text")
                .attr("x", visWidth / 2 - 200)
                .attr("y", margin.top / 3)
                .attr("fill", "black")
                .attr("font-size", 30)
                .attr("dominant-baseline", "middle")
                .text(title);

            // Subtitle
            svg.append("text")
                .attr("x", visWidth / 2 - 100)
                .attr("y", (margin.top * 2) / 3)
                .attr("text-align", "center")
                .attr("fill", "black")
                .attr("font-size", 15)
                .attr("dominant-baseline", "middle")
                .attr("id", "subtitles")
                .text(subtitle);

            // Legend
            svg.append("rect")
                .attr("width", 200)
                .attr("height", 70)
                .attr("x", visWidth - margin.right - 80)
                .attr("y", margin.top + 5)
                .attr("fill", "#eeeeee")
                .attr("opacity", 1);
            svg.append("circle")
                .attr("cx", visWidth - margin.right - 50)
                .attr("cy", margin.top + 25)
                .attr("fill", LYFTPINK)
                .attr("opacity", 1)
                .attr("r", 8);
            svg.append("circle")
                .attr("cx", visWidth - margin.right - 50)
                .attr("cy", margin.top + 55)
                .attr("fill", DIVVYBLUE)
                .attr("opacity", 1)
                .attr("r", 8);
            svg.append("text")
                .attr("x", visWidth - margin.right - 35)
                .attr("y", margin.top + 27)
                .attr("text-align", "center")
                .attr("fill", "black")
                .attr("font-size", 15)
                .attr("dominant-baseline", "middle")
                .text("Electric Bike");
            svg.append("text")
                .attr("x", visWidth - margin.right - 35)
                .attr("y", margin.top + 57)
                .attr("text-align", "center")
                .attr("fill", "black")
                .attr("font-size", 15)
                .attr("dominant-baseline", "middle")
                .text("Normal Bike");

            function update(newdata, startCutoff, endCutoff, subtitle) {
                console.log(minutesSince);
                // update x axis
                svg.selectAll("#datacircles").remove();
                svg.selectAll("#subtitles").remove();

                // draw points
                g.selectAll("circle")
                    // filter data to only contain selected car origins
                    .data(filtered(newdata, startCutoff, endCutoff))
                    .join("circle")
                    .attr("cx", (d) => x(d.duration_seconds))
                    .attr("cy", (d) => y(d.distance_metres))
                    .attr("fill", (d) => bikeColor(d.rideable_type))
                    .attr("opacity", 1)
                    .attr("id", "datacircles")
                    .attr("r", 3);

                svg.append("text")
                    .attr("id", "subtitles")
                    .attr("x", visWidth / 2 - 100)
                    .attr("y", (margin.top * 2) / 3)
                    .attr("text-align", "center")
                    .attr("fill", "black")
                    .attr("font-size", 15)
                    .attr("dominant-baseline", "middle")
                    .text(subtitle);
            }

            return Object.assign(svg.node(), { update });
        },
        [data.length]
    );
    useEffect(() => {
        middleCutoff = d3.timeMinute.offset(
            absoluteStart,
            cutoffRange / 2 + minutesSince
        );
        startCutoff = d3.timeMinute.offset(
            middleCutoff,
            -1 * (cutoffRange / 2)
        );
        endCutoff = d3.timeMinute.offset(middleCutoff, cutoffRange / 2);
        const subtitle =
                "between " +
                d3.timeFormat("%A, %b %d %H:%M")(startCutoff) +
                " and " +
                d3.timeFormat("%A, %b %d %H:%M")(endCutoff);
        ref.current.update(
            chosenData.length === 0 ? data : chosenData,
            startCutoff,
            endCutoff,
            subtitle
        );
        console.log(startCutoff);
    }, [chosenData.length, minutesSince]);

    return (
        <div>
            <svg
                ref={ref}
                style={{
                    height: 800,
                    width: "100%",
                    marginRight: "0px",
                    marginLeft: "0px",
                }}
            ></svg>
        </div>
    );
}
export default Scatterplot;
