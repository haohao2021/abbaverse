import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Treemap = ({ data }) => {
    const ref = useRef();
    const tooltipRef = useRef();

    useEffect(() => {
        if (data && data.length > 0) {
            const margin = { top: 20, right: 10, bottom: 30, left: 10 };
            const width = 350 - margin.left - margin.right;
            const height = 800 - margin.top - margin.bottom;

            // Clear the previous svg content
            d3.select(ref.current).select("svg").remove();

            const svg = d3
                .select(ref.current)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const root = d3
                .hierarchy({ children: data })
                .sum((d) => d.value)
                .sort((a, b) => b.value - a.value);

            d3.treemap().size([width, height]).padding(1)(root);

            const nodes = svg
                .selectAll("g")
                .data(root.leaves())
                .enter()
                .append("g")
                .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

            nodes
                .append("rect")
                .attr("width", (d) => d.x1 - d.x0)
                .attr("height", (d) => d.y1 - d.y0)
                .attr("fill", "black") // Changed to black
                .attr("stroke", "white") // White stroke color
                .attr("stroke-width", "2px") // Increased stroke width
                .on("mouseover", function (event, d) {
                    const tooltip = d3.select(tooltipRef.current);
                    tooltip
                        .style("display", "block")
                        .text(d.data.language)
                        .style("left", `${event.pageX + 10}px`)
                        .style("top", `${event.pageY + 10}px`);
                })
                .on("mouseout", function () {
                    d3.select(tooltipRef.current).style("display", "none");
                });

            nodes
                .append("text")
                .attr("x", (d) => (d.x1 - d.x0) / 2)
                .attr("y", (d) => (d.y1 - d.y0) / 2)
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .attr("fill", "white")
                .text((d) => {
                    const width = d.x1 - d.x0;
                    const height = d.y1 - d.y0;
                    return width > 50 && height > 20 ? d.data.language : "";
                })
                .style("pointer-events", "none");
        }
    }, [data]);

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div ref={ref} style={{ width: "100%", height: "100%" }}></div>
            <div
                ref={tooltipRef}
                style={{
                    position: "absolute",
                    display: "none",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    padding: "5px",
                    borderRadius: "3px",
                    pointerEvents: "none",
                }}
            ></div>
        </div>
    );
};

export default Treemap;
