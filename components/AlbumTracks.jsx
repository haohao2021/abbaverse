import data from "../public/data.json";

const AlbumTracks = ({ album, onSongSelect, selectedSongs }) => (
  <div className="bg-gray-800 shadow-md rounded-lg p-6">
    <h2 className="text-xl font-bold text-white mb-4">
      {album.name} - track list
    </h2>
    <ul className="list-none space-y-2">
      {Object.values(data)
        .filter((item) => item.album === album.name) 
        .map((item) => (
          <li
            key={item.original_song}
            onClick={() => onSongSelect(item)}
            className={`" bg-gray-800 text-white p-2 rounded-lg shadow-lg" ${
              selectedSongs.includes(item)
                ? "bg-blue-100 text-blue-800"
                : "hover:bg-gray-100"
            }`}
          >
            {item.original_song}
          </li>
        ))}

      {/* {album.tracks.items.map((song) => (
          <li
            key={song.name}
            onClick={() => onSongSelect(song)}
            className={`" bg-gray-800 text-white p-2 rounded-lg shadow-lg" ${selectedSongs.includes(song) ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"}`}
          >
            {song.name}
          </li>
        ))} */}
    </ul>
  </div>
);

export default AlbumTracks;
