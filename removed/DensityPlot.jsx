import { useEffect, useRef } from "react";
import * as d3 from "d3";

const DensityPlot = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Set dimensions and margins of the graph
        const margin = { top: 30, right: 30, bottom: 50, left: 50 };
        const width = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Remove any previous SVG elements
        d3.select(svgRef.current).selectAll("*").remove();

        // Create the SVG container
        const svg = d3
            .select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Set scales
        const x = d3
            .scaleLinear()
            // .domain([0, d3.max(data, (d) => d.value)])
            .domain([0, 500])
            .range([0, width]);

        const y = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => d.date))
            .range([height, 0]);

        // Kernel density estimation
        const kde = kernelDensityEstimator(kernelEpanechnikov(7), y.ticks(40));
        const density = kde(data.map((d) => d.date));

        // Add the x-axis
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // Add the y-axis
        svg.append("g").call(d3.axisLeft(y));

        // Draw the density area
        svg.append("path")
            .datum(density)
            .attr("fill", "#69b3a2")
            .attr("opacity", ".8")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr(
                "d",
                d3
                    .area()
                    .curve(d3.curveBasis)
                    .x0(x(0))
                    .x1((d) => {
                        console.log("x1 value:", d[1], "mapped to:", x(d[1]));
                        return x(d[1]);
                    })
                    .y((d) => {
                        console.log("y value:", d[0], "mapped to:", y(d[0]));
                        return y(d[0]);
                    })
            );

        function kernelDensityEstimator(kernel, X) {
            return function (V) {
                return X.map((x) => {
                    return [x, d3.mean(V, (v) => kernel(x - v))];
                });
            };
        }

        function kernelEpanechnikov(k) {
            return (v) =>
                Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
        }
    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default DensityPlot;
