

export function StayGallery() {

    const images = [
        "https://source.unsplash.com/600x400/?castle",
        "https://source.unsplash.com/600x400/?villa",
        "https://source.unsplash.com/600x400/?mansion",
        "https://source.unsplash.com/600x400/?pool",
        "https://source.unsplash.com/600x400/?architecture"
    ]
    return (
        <div className="stay-gallery">
            <img src={images[0]} alt="Main" />
            {images.slice(1).map((image, index) => (
                <img key={index} src={image} alt={`Gallery ${index + 1}`} />
            ))}
        </div>
    );
}