import { useEffect, useState } from 'react'
import { stayService } from '../services/stay/stay.service.local'

export function StayGallery({ stay }) {


    return (
        <div className="stay-gallery">
            {stay.imgUrls.length > 0 ? (
                <>
                    <img src={stay.imgUrls[0]} alt="Main" className="stay-img" />
                    {stay.imgUrls.slice(1).map((imgUrl, index) => (
                        <img key={index} src={imgUrl} alt={`Gallery ${index + 1}`} />
                    ))}
                </>
            ) : (
                <p>Loading images...</p>
            )}
        </div>
    )
}
