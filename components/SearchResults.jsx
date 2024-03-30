

function SearchResults({ results, onSelectSong }) {
    return (
      <ul>
        {Object.entries(results).map(([songKey, songValue]) => (
          <li key={songKey} onClick={() => onSelectSong(songValue)}>
            {songValue.original_song}
          </li>
        ))}
      </ul>
    );
  }
  
  export default SearchResults;
  