// pages/index.js
import React, { useState, useEffect } from "react";
import Cobe from "../components/Cobe";
import Timeline from "../components/Timeline";
import FilterPanel from "../components/FilterPanel";
import SearchResults from "../components/SearchResults";
import data from "../public/data.json";

export default function Home() {
  const [songData, setSongData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [searchResults, setSearchResults] = useState({}); // 新增状态来存储搜索结果

  useEffect(() => {
    setSongData(data);
  }, []);

  const onSearch = (filteredData) => {
    setSearchResults(filteredData); // 更新搜索结果而不是直接过滤标记
  };

  const updateRender = (selectedSong) => {
    const markers = Object.values(selectedSong.covers).flatMap((cover) =>
      cover.details.map((detail) => ({
        location: cover.location,
        size: (cover.count * 0.01).toFixed(2), // 假设每个cover有count属性
      }))
    );

    const timelineData = Object.values(selectedSong.covers).flatMap((cover) =>
      cover.details.map((detail) => ({
        song: detail.song_name,
        artist: detail.artist,
        date: new Date(detail.release_year, 0), // 确保这里返回了一个对象
        song_url: detail.song_url,
        artist_url: detail.artist_url
      }))
    );

    setMarkers(markers);
    setTimelineData(timelineData);
  };

  // const updateGlobalMarkers = (selectedSong) => {
  //   const markers = Object.values(selectedSong.covers).flatMap((cover) =>
  //     cover.details.map((detail) => ({
  //       location: cover.location,
  //       size: (cover.count * 0.01).toFixed(2), // 假设每个cover有count属性
  //     }))
  //   );

  //   console.log(markers);
  //   setFilteredData(markers);
  // };

  // const updateTimeline = (selectedSong) => {
  //   const timelineData = selectedSong.covers.map(cover => {
  //     return {
  //       date: new Date(cover.release_year), // 假设每个cover有一个releaseDate属性
  //       // details: cover.details // 其他需要在时间线中显示的数据
  //     };
  //   });

  //   console.log(timelineData);
  //   setFilteredData(timelineData);
  // };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black py-4">
        <h1 className="text-center text-3xl font-bold">ABBAVERSE</h1>
      </header>

      {/* <main className="flex-grow flex justify-center items-center p-4"> */}
      <main className="flex flex-col lg:flex-row flex-grow p-4">
        <div className="w-full lg:w-1/3 xl:w-1/2">
          <Timeline data={timelineData} />
        </div>
        <div className="w-full max-w-full h-full max-h-full flex justify-center items-start">
          <Cobe markers={markers} />
        </div>
        <div className="w-full lg:w-1/3 xl:w-1/2 p-4 flex flex-col">
          <FilterPanel songData={songData} onSearch={onSearch} />
          {/* Display search results and handle song selection */}
          <div className="max-h-[60vh] overflow-auto">
            <SearchResults
              results={searchResults}
              onSelectSong={updateRender}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// =================
// import App from '../components/App';

// const HomePage = () => {
//   return <App />;
// };

// export default HomePage;

// ============

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// ===========

// import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   return (
//     <main
//       className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
//     >
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">pages/index.js</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Discover and deploy boilerplate example Next.js&nbsp;projects.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }
