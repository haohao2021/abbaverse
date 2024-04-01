function SearchResults({ results, onSelectSong }) {
    return (
      <ul className="space-y-2">
        {Object.entries(results).map(([songKey, songValue]) => (
          <li key={songKey} onClick={() => onSelectSong(songValue)}
          className="cursor-pointer p-2 hover:bg-gray-700 rounded-md"
          >
            {songValue.original_song}
          </li>
        ))}
      </ul>
    );
  }
  
  export default SearchResults;


  