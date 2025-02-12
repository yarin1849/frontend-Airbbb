// import image from '../../assets/img/image.avif'
import image from '../assets/img/image.avif'



export function StayGallery() {

    const images = [
        image,
        image,
        image,
        image,
        image
    ]
    return (
        <div className="stay-gallery">
            <img src={image} alt="Main" className='stay-img' />
            {images.slice(1).map((image, index) => (
                <img key={index} src={image} alt={`Gallery ${index + 1}`} />
            ))}
        </div>
    );
}