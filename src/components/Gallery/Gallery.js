import React, { useState, useEffect } from "react";
import classes from "./Gallery.module.css";

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(
                `https://api.unsplash.com/photos?page=${pageNumber}&per_page=30&client_id=hFm1A2z013VKJAtyrOEwYEXNCGUV49U1JmNs3Ow8E8Y`
            );
            const data = await response.json();
            setImages((prevImages) => [...prevImages, ...data]);
        };
        fetchImages();
    }, [pageNumber]);

    const handleLoadMore = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
    };
    const handleHover = (id) => {
        setHovered(id);
    };

    const handleLeave = () => {
        setHovered(null);
    };

    return (
        <>
            <div className={classes.imageGallery} onScroll={handleScroll}>
                {images.map((image) => (
                    <figure key={image.id} className={classes.imageCard}>
                        <img
                            src={image.urls.regular}
                            alt={image.alt_description}
                            className={classes.image}
                            onMouseEnter={() => handleHover(image.id)}
                            onMouseLeave={handleLeave}
                        />
                        {hovered === image.id && (
                            <figcaption className={classes.label}>{image.alt_description}</figcaption>
                        )}
                    </figure>
                ))}

            </div>
            <button onClick={handleLoadMore} className={classes.loadMore}>
                Load More
            </button>
        </>
    );
};

export default ImageGallery;