import { useState } from "react";
import About from "./About";

const AlbumList = ({ albums, onAlbumClick }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-4 p-4 -m-4">
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
                <div>
                    <img
                        src={`/images/about.png`}
                        alt="About"
                        className="cursor-pointer"
                        onClick={openModal}
                    />
                    {modalIsOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                            onClick={closeModal}
                        >
                            <div
                                className="bg-gray-900 text-white p-5 rounded shadow-lg max-w-md w-full relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-2 right-2 text-white"
                                    onClick={closeModal}
                                >
                                    ×
                                </button>
                                <About />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AlbumList;
