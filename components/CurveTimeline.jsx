import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CurveTimeline = ({ data }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    d3.select(ref.current).selectAll("svg").remove(); // 清除旧的 SVG 元素

    const svg = d3.select(ref.current)
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

    // 数据处理：按年份分组并计算每年的记录数量
    const countPerYear = d3.rollups(data, v => v.length, d => new Date(d.date).getFullYear())
                           .sort((a, b) => b[0] - a[0]); // 按年份递减排序

    // Y轴：年份（递减顺序）
    const y = d3.scaleBand()
                .domain(countPerYear.map(d => d[0]))
                .range([0, height])
                .padding(0.1);
    svg.append("g").call(d3.axisLeft(y));

    // X轴：数量
    const x = d3.scaleLinear()
                .domain([0, d3.max(countPerYear, d => d[1])])
                .range([0, width]);
    svg.append("g")
       .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(x));

    // 定义 tooltip
    const tooltip = d3.select(ref.current)
                      .append("div")
                      .style("position", "absolute")
                      .style("background", "none")
                      .style("color", "white")
                      .style("padding", "5px")
                      .style("display", "none")
                      .style("pointer-events", "none");

    // 绘制平滑折线图
    const line = d3.line()
                   .x(d => x(d[1]))
                   .y(d => y(d[0]) + y.bandwidth() / 2) // 对齐到每个条带的中心
                   .curve(d3.curveBasis); // 使用更平滑的曲线

    svg.append("path")
       .datum(countPerYear)
       .attr("fill", "none")
       .attr("stroke", "white")
       .attr("stroke-width", 2)
       .attr("d", line);

    // 添加透明的交互层
    svg.append("rect")
       .attr("width", width)
       .attr("height", height)
       .style("fill", "none")
       .style("pointer-events", "all")
       .on("mousemove", (event) => {
         const [mouseX, mouseY] = d3.pointer(event);
         const mouseYear = y.domain().reduce((a, b) => Math.abs(y(b) + y.bandwidth() / 2 - mouseY) < Math.abs(y(a) + y.bandwidth() / 2 - mouseY) ? b : a);
         const closestData = countPerYear.find(d => d[0] === mouseYear);
         tooltip.style("display", "block")
                .html(`Year: ${closestData[0]}<br>Count: ${closestData[1]}`)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`);
       })
       .on("mouseout", () => {
         tooltip.style("display", "none");
       });

  }, [data]); // 仅当数据发生变化时才执行

  return <div ref={ref}></div>;
};

export default CurveTimeline;
