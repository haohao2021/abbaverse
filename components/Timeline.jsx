import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Modal from "./Modal";

export function Timeline({ data }) {
  const svgRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState();

  const handleDotClick = (d) => {
    setModalContent(
      <div>
        <p>
          Song:&nbsp;&nbsp;
          <a
            href={d.song_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white "
          >
            {d.song} <span className="text-sm">&#x2197;</span>
          </a>
        </p>

        <p>
          Artist:&nbsp;&nbsp;
          <a
            href={d.artist_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white"
          >
            {d.artist} <span className="text-sm">&#x2197;</span>
          </a>
        </p>

        <p>Release Year:&nbsp;&nbsp;{d.date.getFullYear()}</p>
      </div>
    );
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const timeline = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const yScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([height, 0]);

    timeline.append("g").call(d3.axisLeft(yScale));

    const randomX = d3.randomUniform(margin.left, width);

    const dotColor = "rgba(255, 255, 255, 0.5)";

    console.log(data);

    // timeline
    //   .selectAll(".dot")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("class", "dot")
    //   .attr("cx", () => randomX()) // 随机横坐标值
    //   .attr("cy", (d) => yScale(d.date)) // 确保 d.date 是一个日期对象
    //   .attr("r", 5) // 散点大小
    //   .attr("fill", dotColor);

    // 绘制散点，并保存对它们的引用
    const dots = timeline
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", () => randomX()) 
      .attr("cy", (d) => yScale(d.date)) // 确保 d.date 是一个日期对象
      .attr("r", 5) 
      .attr("fill", dotColor);


    // timeline
    //   .selectAll(".dot")
    //   .on("mouseover", (event, d) => {
    //     // 显示浮窗
    //   })
    //   .on("mouseout", (event, d) => {
    //     // 隐藏浮窗
    //   })
    //   .on("click", (event, d) => {
    //     // 弹出窗口显示歌曲的所有数据
    //   });

    // 创建一个浮窗的 div 元素
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip") 
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid #000")
      .style("padding", "10px");

    // hover event
    dots
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .text(`Song: ${d.song}, Artist: ${d.artist}`)
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      })
      .on("click", (event, d) => {
        handleDotClick(d);

        
        //     const infoWindow = window.open(
        //       "",
        //       "Info",
        //       "width=400,height=300,scrollbars=1"
        //     );
        //     const content = `
        //     <p>Song: ${d.song}</p>
        //     <p>Artist: ${d.artist}</p>
        //     <p>Release Year: ${d.date.getFullYear()}</p>
        //     <p><a href="${d.song_url}" target="_blank">Song URL</a></p>
        //     <p><a href="${d.artist_url}" target="_blank">Artist URL</a></p>
        //   `;
        //     infoWindow.document.write(content);
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

  return (
    <>
      <svg ref={svgRef}></svg>
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        children={modalContent}
      >
        {modalContent}
      </Modal>
    </>
  );
}

export default Timeline;
