import { useState } from "react";

const About = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <div className="font-sans text-gray-700">
            <img
                src={`/images/about.png`}
                alt="About"
                className="cursor-pointer"
                onClick={openModal}
            />

            {modalIsOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxHeight: "90vh" }}
                    >
                        <button
                            className="absolute top-3 right-3 text-2xl"
                            onClick={closeModal}
                        >
                            ×
                        </button>
                        <h2 className="text-3xl font-bold mb-4">
                            About the Project
                        </h2>
                        <section>
                            <h3 className="text-xl font-semibold mb-4">
                                Demo video
                            </h3>
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/NGszMrgAzrI"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="YouTube video player"
                            ></iframe>
                        </section>
                        <section>
                            <h3 className="text-xl font-semibold mt-6">Team</h3>
                            <p className="mt-2">
                                Haohao Yu, an MSc student in Media Technology at
                                KTH, is responsible for all aspects of this
                                project/website.
                                <br />
                                <a
                                    href="https://haohaoyu.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-400 hover:text-blue-300"
                                >
                                    Portfolio
                                </a>
                                &nbsp;&nbsp;
                                <a
                                    href="https://www.linkedin.com/in/haohaoyu1123/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-400 hover:text-blue-300"
                                >
                                    LinkedIn
                                </a>
                            </p>
                        </section>
                        <section>
                            <h3 className="text-xl font-semibold mt-6">
                                Project Description
                            </h3>
                            <div className="font-sans p-4">
                                <p className="mb-4">
                                    The initial idea behind this project is that
                                    serious music enthusiasts should not only
                                    rely on algorithmic recommendations but also
                                    explore music based on their favorite
                                    artists. A good example of this method in
                                    music is song covering—a cover is a tribute.
                                    Want to know who influences your favorite
                                    artists and who your favorite artists
                                    influence? Explore all the cover data about
                                    them!
                                </p>
                                <p className="mb-4">
                                    Secondhandsongs.com is a good resource for
                                    this, but it doesn’t provide a good GUI
                                    interface. Therefore, this project aims to
                                    demonstrate how information visualization
                                    can be used to design and develop a
                                    user-friendly website to help music
                                    enthusiasts learn more about their favorite
                                    artists’ music covers.
                                </p>
                                <p className="mb-4">
                                    Since the main data of cover songs on
                                    secondhandsongs.com includes location, time,
                                    and language, this website is mainly divided
                                    into these three sections: The right part is
                                    a search and filter panel to help you search
                                    for and select ABBA songs you’re interested
                                    in. The middle part is a 3D map to help you
                                    understand the spatial data of those songs.
                                    The left part includes three views: you can
                                    use the curve timeline or the dots timeline
                                    to see the time distribution of the cover
                                    data, then switch to the treemap to see the
                                    distribution of language data. Enjoy! :)
                                </p>
                            </div>
                        </section>
                        <section>
                            <h3 className="text-xl font-semibold mt-6">
                                Learning Objectives Reached
                            </h3>
                            <p className="mt-4">
                                All the following learning objectives have been
                                successfully reached with help of the Professor,
                                TAs, classmates, participated users and useful
                                online resources:
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>
                                    Create interactive information
                                    visualizations using data transformations,
                                    visual mappings, and view transformations.
                                </li>
                                <li>
                                    Justify design decisions using
                                    domain-specific knowledge.
                                </li>
                                <li>
                                    Analyze and critique information
                                    visualization systems.
                                </li>
                                <li>
                                    Present and explain my own visualizations to
                                    a diverse audience.
                                </li>
                                <li>
                                    Assess the quality and effectiveness of my
                                    visualizations.
                                </li>
                            </ul>
                        </section>
                        <section>
                            <h3 className="text-xl font-semibold mt-6">
                                Citations, References, and Sources
                            </h3>
                            <p className="mt-2">
                                <strong>Source code:</strong>{" "}
                                <a
                                    href="https://github.com/haohao2021/abbaverse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-400 hover:text-blue-300"
                                >
                                    GitHub
                                </a>
                                <br />
                                <strong>Data source:</strong>{" "}
                                <a
                                    href="https://secondhandsongs.com/artist/119"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-400 hover:text-blue-300"
                                >
                                    SecondHandSongs Artist
                                </a>
                                <br />
                                <strong>References I got help from:</strong>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>
                                        To choose appropriate visual structures:{" "}
                                        <a
                                            href="https://www.data-to-viz.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-blue-400 hover:text-blue-300"
                                        >
                                            Data-to-Viz.com
                                        </a>
                                    </li>
                                    <li>
                                        To develop certain chart with d3.js:{" "}
                                        <a
                                            href="https://d3-graph-gallery.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-blue-400 hover:text-blue-300"
                                        >
                                            D3 Graph Gallery
                                        </a>
                                    </li>
                                    <li>
                                        To make 3D bubble map:{" "}
                                        <a
                                            href="https://cobe.vercel.app/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-blue-400 hover:text-blue-300"
                                        >
                                            COBE
                                        </a>
                                    </li>
                                    <li>
                                        To add music player on web:{" "}
                                        <a
                                            href="https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-blue-400 hover:text-blue-300"
                                        >
                                            Spotify Iframe API
                                        </a>
                                    </li>
                                </ul>
                                <strong>Related works:</strong>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>
                                        Pattuelli, M. C., Weller, C., & Szablya,
                                        G. (2011, September). Linked Jazz: an
                                        exploratory pilot. In International
                                        Conference on Dublin Core and Metadata
                                        Applications (pp. 158-164).
                                    </li>
                                    <li>
                                        Behera, P. K., Jain, S. J., & Kumar, A.
                                        (2023). Visual Exploration of Literature
                                        Using Connected Papers: A Practical
                                        Approach. Issues in Science and
                                        Technology Librarianship, (104).
                                    </li>
                                </ul>
                            </p>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
