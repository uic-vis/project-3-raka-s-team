import { useD3 } from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";
import { getPercentages } from "../hooks/functions/selectModeProcessingData";
import { DIVVYBLUE, LYFTPINK } from "../constant";

function PieChart({ data, chosenData }) {
    const ref = useD3(
        (svg) => {
            const width = 900,
                height = 450,
                margin = 40;
            var percentageData = getPercentages(data);
            var bikeCounts = percentageData["bikeCounts"];
            var bikeRatios = percentageData["bikeRatios"];
            const total_casual = Object.values(bikeCounts.casual).reduce(
                (a, b) => a + b
            );
            const total_member = Object.values(bikeCounts.member).reduce(
                (a, b) => a + b
            );
            const radius2 = Math.min(width, height) / 2 - margin;
            const radius1 = radius2 * Math.sqrt(total_casual / total_member); // proportion encoded in circle areas

            const pieChart = (element, data, radius, title) => {
                // set the color scale
                const color = d3.scaleOrdinal().range([DIVVYBLUE, LYFTPINK]);

                // Compute the position of each group on the pie:
                const pie = d3.pie().value(function (d) {
                    return d[1];
                });
                const data_ready = pie(Object.entries(data));
                // Now I know that group A goes from 0 degrees to x degrees and so on.

                // shape helper to build arcs:
                const arcGenerator = d3
                    .arc()
                    .innerRadius(0)
                    .outerRadius(radius);

                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                element
                    .selectAll("mySlices")
                    .data(data_ready)
                    .join("path")
                    .attr("d", arcGenerator)
                    .attr("fill", function (d) {
                        return color(d.data[0]);
                    })
                    .attr("stroke", "black")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7);

                // Now add the annotation. Use the centroid method to get the best coordinates
                element
                    .selectAll("mySlices")
                    .data(data_ready)
                    .join("text")
                    .text(function (d) {
                        return (
                            d.data[0] +
                            " : " +
                            parseFloat(d.data[1] * 100).toFixed(2) +
                            "%"
                        );
                    })
                    .attr("transform", function (d) {
                        return `translate(${arcGenerator.centroid(d)})`;
                    })
                    .style("text-anchor", "middle")
                    .style("font-size", 13);

                element
                    .append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", ".3em")
                    .text(title)
                    .attr("transform", `translate(0, ${radius + 20})`);
            };
            // append the svg object to the div called 'my_dataviz'
            const chart1 = svg
                .append("g")
                .attr("id", "chart1")
                .attr("transform", `translate(${width / 4}, ${height / 2})`);
            const chart2 = svg
                .append("g")
                .attr("id", "chart2")
                .attr(
                    "transform",
                    `translate(${(3 * width) / 4}, ${height / 2})`
                );
            pieChart(chart1, bikeRatios.casual, radius1, "Casual riders");
            pieChart(chart2, bikeRatios.member, radius2, "Membership riders");

            svg.append("text")
                .attr("x", width / 3 - 250)
                .attr("y", 30)
                .attr("fill", "black")
                .attr("font-size", 30)
                .attr("dominant-baseline", "middle")
                .text("Casual vs Member Bike Type Ratios");

            function update(newdata) {
                svg.selectAll("#chart1").remove();
                svg.selectAll("#chart2").remove();
                // update x axis
                const t = svg.transition().ease(d3.easeLinear).duration(200);
                var percentageData = getPercentages(newdata);
                var bikeRatios = percentageData["bikeRatios"];

                const chart1 = svg
                    .append("g")
                    .attr("id", "chart1")
                    .attr(
                        "transform",
                        `translate(${width / 4}, ${height / 2})`
                    );
                const chart2 = svg
                    .append("g")
                    .attr("id", "chart2")
                    .attr(
                        "transform",
                        `translate(${(3 * width) / 4}, ${height / 2})`
                    );
                pieChart(chart1, bikeRatios.casual, radius1, "Casual riders");
                pieChart(
                    chart2,
                    bikeRatios.member,
                    radius2,
                    "Membership riders"
                );
            }

            return Object.assign(svg.node(), { update });
        },
        [data.length]
    );
    useEffect(() => {
        ref.current.update(chosenData.length === 0 ? data : chosenData);
    }, [chosenData.length]);

    return (
        <svg
            ref={ref}
            style={{
                height: 500,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        ></svg>
    );
}
export default PieChart;
