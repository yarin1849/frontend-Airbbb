// import image from '../../assets/img/image.avif'
import image from '../assets/img/image.avif'



export function UploadImages() {
    return (
        <div className="stay-imgs">
            <label htmlFor="upload-img">
                <input type='file' id="upload-img" className='stay-img btn'></input>
                Upload Image
            </label>
            <label htmlFor="upload-img">
                <input type='file' id="upload-img" className='stay-img btn'></input>
                Upload Image
            </label>
            <label htmlFor="upload-img">
                <input type='file' id="upload-img" className='stay-img btn'></input>
                Upload Image
            </label>
            <label htmlFor="upload-img">
                <input type='file' id="upload-img" className='stay-img btn'></input>
                <p>Upload Image</p>
            </label>
            <label htmlFor="upload-img">
                <input type='file' id="upload-img" className='stay-img btn'></input>
                Upload Image
            </label>
        </div>
    );
}