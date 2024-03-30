import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

export function Cobe({ markers }) {
  const canvasRef = useRef();
  const globeRef = useRef();
  const [scale, setScale] = useState(2.5); // 初始缩放值

  useEffect(() => {
    if (!canvasRef.current) return;

    const onResize = () => {
      if (canvasRef.current) {
        updateGlobe(); // 确保updateGlobe已经定义
      }
    };

    // 将updateGlobe定义移动到useEffect内部的顶部，并确保在它被引用之前定义
    const updateGlobe = () => {
      let width = canvasRef.current.offsetWidth;
      if (globeRef.current) {
        globeRef.current.destroy(); // 如果已有实例，先销毁
      }

      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2 * 0.4,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 3,
        mapSamples: 16000,
        mapBrightness: 1.2,
        baseColor: [1, 1, 1],
        markerColor: [251 / 255, 100 / 255, 21 / 255],
        glowColor: [1.2, 1.2, 1.2],
        markers: markers, // 使用props中的markers
        scale: scale, // 使用scale状态
        offset: [0, width * 2 * 0.4 * 0.6],
      });
    };

    window.addEventListener('resize', onResize);
    updateGlobe(); // 首次渲染地球

    const handleWheel = (e) => {
      e.preventDefault();
      setScale((prevScale) => Math.max(0, prevScale - e.deltaY * 0.01));
    };

    canvasRef.current.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      window.removeEventListener('resize', onResize);
      canvasRef.current.removeEventListener('wheel', handleWheel);
    };
  }, [scale, markers]); // 依赖于scale和markers，确保它们改变时可以更新地球

  return (
    <div style={{
      width: '100%',
      height: '100%',
      aspectRatio: 1/1,
      margin: 'auto',
      position: 'relative',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          aspectRatio: '1/1', 
          contain: 'layout paint size',
          opacity: 1,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  );
}

export default Cobe;
