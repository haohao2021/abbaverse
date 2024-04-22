const AlbumList = ({ albums, onAlbumClick }) => (
  <div className="grid grid-cols-3 gap-4 p-4">
    {albums.map((album) => (
      <div
        key={album.id}
        className="album-cover cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105"
        onClick={() => onAlbumClick(album.id)}
      >
        <img
          src={album.images[1].url}
          alt={`Cover of ${album.name}`}
          className="w-full"
        />
        {/* <div className="p-2 bg-gray-700 text-white">
          <h3 className="text-lg font-semibold">{album.name}</h3>
          <p className="text-sm">{album.release_date}</p>
        </div> */}
      </div>
    ))}
  </div>
);

export default AlbumList;
