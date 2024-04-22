import React, { useState, useEffect } from "react";
import AlbumList from "./AlbumList";
import AlbumTracks from "./AlbumTracks";
import discog from "../public/discog.json";
import data from "../public/data.json";

// const albums = [
//   // This should be filled with actual album data including id, cover image URL, and song list
//   // For example: { id: 'album1', cover: 'url_to_album_cover_1', songs: ['Song 1', 'Song 2'] }
// ];

const SongList = ({ onSelectTracks }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);



  useEffect(() => {
    if (selectedSongs.length > 0) {
      onSelectTracks(selectedSongs)
    }
  }, [selectedSongs]);



  const handleAlbumClick = (albumId) => {
    const album = discog.albums.find((a) => a.id === albumId);
    setSelectedAlbum(album);
  };

  const handleSongSelect = (song) => {
    setSelectedSongs((prevSelected) => {
      if (prevSelected.includes(song)) {
        return prevSelected.filter((s) => s !== song);
      } else {
        return [...prevSelected, song];
      }
    });
  };

  const handleBackClick = () => {
    setSelectedAlbum(null);
  };

  return (
    <div>
      {!selectedAlbum ? (
        <div className="album-list">
          <AlbumList albums={discog.albums} onAlbumClick={handleAlbumClick} />
        </div>
      ) : (
        <div className="song-list">
          <button onClick={handleBackClick}>← Back to albums</button>
          <AlbumTracks
            album={selectedAlbum}
            onSongSelect={handleSongSelect}
            selectedSongs={selectedSongs}
          />
        </div>
      )}
    </div>
  );
};

export default SongList;
