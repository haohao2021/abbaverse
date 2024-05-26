import React, { useState, useEffect } from "react";
import Cobe from "../components/Cobe";
import DotsTimeline from "../components/DotsTimeline";
import FilterPanel from "../components/FilterPanel";
import SearchResults from "../components/SearchResults";
import SongList from "@/components/SongList";
import data from "../public/data.json";
import Treemap from "@/components/Treemap";
import CurveTimeline from "@/components/CurveTimeline";

export default function Home() {
    const [songData, setSongData] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [timelineData, setTimelineData] = useState([]);
    const [searchResults, setSearchResults] = useState({});
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [languageData, setLanguageData] = useState([]);
    const [activeComponent, setActiveComponent] = useState("violin"); // State to manage active component

    function mapCoverCountToSize(count) {
        if (count === 0) {
            return 0;
        } else if (count === 1) {
            return 0.05;
        } else if (count >= 50) {
            return 0.1;
        } else {
            // linear mapping
            return 0.05 + ((count - 1) * (0.1 - 0.05)) / (100 - 1);
        }
    }

    useEffect(() => {
        setSongData(data);
        const mammaMia = data["Mamma mia (ABBA)"];
        if (mammaMia) {
            handleFilteredData([mammaMia]);
        }
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const onSearch = (filteredData) => {
        if (filteredData) {
            setShowSearchResults(true);
            setSearchResults(filteredData);
        } else {
            setShowSearchResults(false);
        }
    };

    const updateRender = (selectedSongs) => {
        const markers = selectedSongs.flatMap((song) =>
            Object.values(song.covers).flatMap((cover) =>
                cover.details.map((detail) => ({
                    location: cover.location,
                    // size: 0.05,
                    // size: (cover.count * 0.01).toFixed(2), // 假设每个cover有count属性
                    size: mapCoverCountToSize(cover.count),
                }))
            )
        );

        const timelineData = selectedSongs.flatMap((song) =>
            Object.values(song.covers).flatMap((cover) =>
                cover.details.map((detail) => ({
                    song: detail.song_name,
                    artist: detail.artist,
                    date: new Date(detail.release_year, 0),
                    song_url: detail.song_url,
                    artist_url: detail.artist_url,
                    language: detail.language,
                }))
            )
        );

        setMarkers(markers);
        setTimelineData(timelineData);

        const languageCount = timelineData.reduce((acc, curr) => {
            if (curr.language) {
                acc[curr.language] = (acc[curr.language] || 0) + 1;
            }
            return acc;
        }, {});

        const languageData = Object.entries(languageCount).map(
            ([language, count]) => ({
                language,
                value: count,
            })
        );

        setLanguageData(languageData);
    };

    const handleFilteredData = (songs) => {
        setFilteredData(songs);
        updateRender(songs);
        setShowSearchResults(false);
    };

    const handleSongSelect = (song) => {
        handleFilteredData([song]);
        const iframeSrc = `https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator&theme=0`;
        document.getElementById("spotify-iframe").src = iframeSrc;
    };

    return (
        <div className="min-h-screen bg-black text-white relative">
            <header className="bg-black py-4">
                <h1 className="text-center text-3xl font-bold">ABBAVERSE</h1>
            </header>

            <main className="flex flex-col lg:flex-row flex-grow p-4">
                <div className="w-full lg:w-1/3 xl:w-1/2">
                    {activeComponent === "timeline" ? (
                        <DotsTimeline data={timelineData} />
                    ) : activeComponent === "treemap" ? (
                        <Treemap data={languageData} />
                    ) : activeComponent === "violin" ? (
                        <CurveTimeline data={timelineData} />
                    ) : null}
                </div>
                <div className="w-full max-w-full h-full max-h-full flex justify-center items-start">
                    <Cobe markers={markers} />
                </div>
                <div className="w-full lg:w-1/3 xl:w-1/2 p-4 flex flex-col">
                    <iframe
                        id="spotify-iframe"
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/track/2TxCwUlqaOH3TIyJqGgR91?utm_source=generator&theme=0"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="mb-4"
                    ></iframe>
                    <FilterPanel
                        songData={songData}
                        onSearch={onSearch}
                        className="mt-4"
                    />
                    {showSearchResults && (
                        <div className="max-h-[60vh] overflow-auto">
                            <SearchResults
                                results={searchResults}
                                onSelectSong={(song) => handleSongSelect(song)}
                            />
                        </div>
                    )}
                    {!showSearchResults && (
                        <div className="mt-8">
                            <SongList onSelectTracks={handleFilteredData} />
                        </div>
                    )}
                    <div></div>
                </div>
            </main>
            <div className="absolute bottom-4 left-4 flex space-x-4 ml-2 mb-4">
                <button
                    className={`p-2 bg-gray-700 rounded ${
                        activeComponent === "violin" ? "bg-blue-500" : ""
                    }`}
                    onClick={() => setActiveComponent("violin")}
                >
                    Curve Timeline
                </button>
                <button
                    className={`p-2 bg-gray-700 rounded ${
                        activeComponent === "timeline" ? "bg-blue-500" : ""
                    }`}
                    onClick={() => setActiveComponent("timeline")}
                >
                    Dots Timeline
                </button>
                <button
                    className={`p-2 bg-gray-700 rounded ${
                        activeComponent === "treemap" ? "bg-blue-500" : ""
                    }`}
                    onClick={() => setActiveComponent("treemap")}
                >
                    Language
                </button>
            </div>
        </div>
    );
}
