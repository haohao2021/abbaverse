import { useState } from "react";

const FilterPanel = ({ songData, onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    const filteredData = Object.entries(songData)
      .filter(([key, song]) =>
        song.original_song.toLowerCase().includes(inputValue.toLowerCase())
      )
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    onSearch(filteredData);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      const filteredData = Object.entries(songData)
        .filter(([key, value]) =>
          value.original_song.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      onSearch(filteredData);
    }
  };

  const handleYearChange = (event) => {
    const selectedYearValue = parseInt(event.target.value);
    setSelectedYear(selectedYearValue);

    const filteredData = Object.entries(songData)
      .filter(([key, song]) =>
        Object.values(song.covers).some((country) =>
          country.details.some(
            (detail) => detail.release_year === selectedYearValue
          )
        )
      )
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    onFilter(filteredData);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by song title"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
          className="w-full p-2 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-blue-500"
          name="searchTitle"
          id="searchTitleInput"
        />
      </div>
      {/* <div>
        <label htmlFor="year-slider" className="block text-sm font-medium text-gray-400">
          Release Year: {selectedYear}
        </label>
        <input
          type="range"
          min="1960" // 假设ABBA的最早发行年份
          max={new Date().getFullYear()} // 当前年份
          value={selectedYear}
          onChange={handleYearChange}
          className="w-full h-2 bg-gray-700 rounded-md cursor-pointer focus:outline-none focus:ring-0"
          id="year-slider"
        />
      </div> */}
    </div>
  );
  
};

export default FilterPanel;
