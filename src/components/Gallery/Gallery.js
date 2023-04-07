import React, { useState, useEffect } from "react";

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`https://api.unsplash.com/photos?page=${pageNumber}&per_page=30&client_id=hFm1A2z013VKJAtyrOEwYEXNCGUV49U1JmNs3Ow8E8Y`);
            const data = await response.json();
            setImages((prevImages) => [...prevImages, ...data]);
        };
        fetchImages();
    }, [pageNumber]);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
    };

    return (
        <div className="image-gallery" onScroll={handleScroll}>
            {images.map((image) => (
                <img key={image.id} src={image.urls.regular} alt={image.alt_description} />
            ))}
        </div>
    );
};

export default ImageGallery;