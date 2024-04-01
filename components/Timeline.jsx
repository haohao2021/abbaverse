import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export function Timeline({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    // 创建时间线容器
    const timeline = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Y轴比例尺 - 时间比例尺
    const yScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([height, 0]);

    // 绘制Y轴
    timeline.append("g").call(d3.axisLeft(yScale));

    // 随机横坐标值函数
    const randomX = d3.randomUniform(margin.left, width);

    // 散点颜色和透明度
    const dotColor = "rgba(255, 255, 255, 0.5)";

    console.log(data)
    // 绘制散点
    timeline
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", () => randomX()) // 随机横坐标值
      .attr("cy", (d) => yScale(d.date)) // 确保 d.date 是一个日期对象
      .attr("r", 5) // 散点大小
      .attr("fill", dotColor);

    // 增加hover效果
    timeline
      .selectAll(".dot")
      .on("mouseover", (event, d) => {
        // 显示浮窗
      })
      .on("mouseout", (event, d) => {
        // 隐藏浮窗
      })
      .on("click", (event, d) => {
        // 弹出窗口显示歌曲的所有数据
      });

    // 监听窗口大小变化并更新时间线
    const handleResize = () => {
      // 更新比例尺的范围、绘制新的轴等
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data]); // 仅当数据发生变化时才执行

  return <svg ref={svgRef}></svg>;
}

export default Timeline;
