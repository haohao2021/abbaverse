import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { useSpring } from 'react-spring';

export function Cobe({ markers }) {
  const canvasRef = useRef();
  const globeRef = useRef();
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [scale, setScale] = useState(1); // 初始缩放值
  const [{ phi }, api] = useSpring(() => ({
    phi: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateGlobe = () => {
      let width = canvas.offsetWidth;

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
        markerColor: [0 / 255, 191 / 255, 255 / 255], 
        glowColor: [0.8, 0.8, 0.8],
        markers: markers, // 使用props中的markers
        scale: scale, // 使用scale状态
        opacity: 0.7,
        // offset: [0, width * 2 * 0.4 * 0.6],
        offset: [0, -150],
        // offset: [0, width * 2 ] // 改变乘数

        onRender: (state) => {
          // This prevents rotation while dragging
          if (!pointerInteracting.current) {
            // Called on every animation frame
            // Phi is updated by the animation spring
            state.phi = phi.get();
          } else {
            state.phi = phi.get();
          }
          // Ensure the width and height are updated on resize
          state.width = width * 2;
          state.height = width * 2;
        },
      });

      canvasRef.current.style.opacity = '1';
    };

    updateGlobe();

    // const handleWheel = (e) => {
    //   e.preventDefault();
    //   setScale((prevScale) => Math.max(0, prevScale - e.deltaY * 0.001));
    // };

    // canvasRef.current.addEventListener('wheel', handleWheel, { passive: false });

    // canvas.addEventListener('wheel', handleWheel, { passive: false });

    window.addEventListener('resize', updateGlobe);

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }

      // if (canvas) {
      //   canvas.removeEventListener('wheel', handleWheel);
      // }
      window.removeEventListener('resize', updateGlobe);

      // window.removeEventListener('resize', onResize);
      // canvasRef.current.removeEventListener('wheel', handleWheel);
    };
  }, [phi, scale, markers]); // Update dependencies

  return (
    <div className="w-full h-full mx-auto relative" style={{ aspectRatio: '1 / 1' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-100 transition-opacity duration-1000 ease-in-out"
        style={{ aspectRatio: '1 / 1', contain: 'layout paint size' }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current.style.cursor = 'grab';
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            const currentX = e.clientX;
            const delta = currentX - pointerInteracting.current;
        
            // Add the delta to the phi value for real-time feedback
            // This part assumes you have a state variable or ref that onRender uses to set the rotation
            const newPhi = phi.get() + delta / 10; // You might need to adjust this calculation
            api.start({ phi: newPhi }); // This will cause the component to re-render and onRender to be called with the new value
        
            pointerInteractionMovement.current = newPhi;
            pointerInteracting.current = currentX;
          }
        }}
        
      />
    </div>
  );
}

export default Cobe;


//================
// import React, { useEffect, useRef, useState } from "react";
// import createGlobe from "cobe";

// export function Cobe({ markers }) {
//   const canvasRef = useRef();
//   const globeRef = useRef();
//   const [scale, setScale] = useState(2.5); // 初始缩放值

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const onResize = () => {
//       if (canvasRef.current) {
//         updateGlobe(); // 确保updateGlobe已经定义
//       }
//     };

//     // 将updateGlobe定义移动到useEffect内部的顶部，并确保在它被引用之前定义
//     const updateGlobe = () => {
//       let width = canvasRef.current.offsetWidth;
//       if (globeRef.current) {
//         globeRef.current.destroy(); // 如果已有实例，先销毁
//       }

//       globeRef.current = createGlobe(canvasRef.current, {
//         devicePixelRatio: 2,
//         width: width * 2,
//         height: width * 2 * 0.4,
//         phi: 0,
//         theta: 0.3,
//         dark: 1,
//         diffuse: 3,
//         mapSamples: 16000,
//         mapBrightness: 1.2,
//         baseColor: [1, 1, 1],
//         markerColor: [251 / 255, 100 / 255, 21 / 255],
//         glowColor: [1.2, 1.2, 1.2],
//         markers: markers, // 使用props中的markers
//         scale: scale, // 使用scale状态
//         // offset: [0, width * 2 * 0.4 * 0.6],
//         offset: [0, -300],
//         // offset: [0, width * 2 ] // 改变乘数

//       });
//     };

//     window.addEventListener('resize', onResize);
//     updateGlobe(); // 首次渲染地球

//     const handleWheel = (e) => {
//       e.preventDefault();
//       setScale((prevScale) => Math.max(0, prevScale - e.deltaY * 0.01));
//     };

//     canvasRef.current.addEventListener('wheel', handleWheel, { passive: false });

//     return () => {
//       if (globeRef.current) {
//         globeRef.current.destroy();
//       }
//       window.removeEventListener('resize', onResize);
//       canvasRef.current.removeEventListener('wheel', handleWheel);
//     };
//   }, [scale, markers]); // 依赖于scale和markers，确保它们改变时可以更新地球

//   return (
//     <div className="w-full h-full mx-auto relative" style={{ aspectRatio: '1 / 1' }}>
//       <canvas
//         ref={canvasRef}
//         className="w-full h-full opacity-100 transition-opacity duration-1000 ease-in-out"
//         style={{
//           aspectRatio: '1 / 1', 
//           contain: 'layout paint size',
//         }}
//       />
//     </div>
//   );
  
// }

// export default Cobe;
