import { useEffect, useState } from 'react'
import { stayService } from '../services/stay/stay.service.local'

export function StayGallery() {
    const [imgUrls, setImgUrls] = useState([])

    useEffect(() => {
        async function loadStayImages() {
            const stays = await stayService.query()
            if (stays.length > 0) setImgUrls(stays[0].imgUrls)
        }
        loadStayImages()
    }, [])

    return (
        <div className="stay-gallery">
            {imgUrls.length > 0 ? (
                <>
                    <img src={imgUrls[0]} alt="Main" className="stay-img" />
                    {imgUrls.slice(1).map((imgUrl, index) => (
                        <img key={index} src={imgUrl} alt={`Gallery ${index + 1}`} />
                    ))}
                </>
            ) : (
                <p>Loading images...</p>
            )}
        </div>
    )
}
