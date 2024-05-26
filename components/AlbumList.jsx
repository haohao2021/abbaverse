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
                    </div>
                ))}
                <About />
            </div>
        </>
    );
};

export default AlbumList;
