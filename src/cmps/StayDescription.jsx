import { useState } from "react"
import { ShowAllReviews } from "../cmps/StayShowAllReviews"


export function StayDescription({ stay }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const fullText = stay.summary
    const maxLength = 200
    const reviews = stay.reviews.length

    return (
        <div className="stay-description">
            <div className="stay-description-title">
                <h2>{stay.type}</h2>
                <p>{stay.capacity} guests · {stay.bedrooms} bedrooms · {stay.bedrooms} beds · {stay.bathrooms} baths</p>
            </div>
            <div className="review-container">
                <div className="guest-favorite">
                    <img src={images[0].src} alt="Guest Favorite" className="guest-icon" />
                    <div className="guest-text">
                        <span>Guest</span>
                        <span>favorite</span>
                    </div>
                    <img src={images[1].src} alt="Guest Favorite" className="guest-icon" />
                </div>
                <div className="review-container-description">
                    One of the most loved homes on Airbnb, according to guests
                </div>
                <div className="rank-details">
                    <span className="review-score">4.97</span>
                    <div className="review-stars">{[1, 2, 3, 4, 5].map((index) => (
                        <img
                            key={index}
                            src="https://res.cloudinary.com/du312ufuo/image/upload/v1739453965/asset_23_rlrre4.svg"
                            alt="star"
                        />
                    ))}</div>
                </div>
                <div className="divider"></div>
                <div className="review-details">
                    <div className="review-count">
                        {reviews}
                    </div>
                    <div className="review-text">
                        <button className="review-text" onClick={() => { setIsModalOpen(true) }}>
                            Reviews
                        </button>
                    </div>
                </div>
            </div>
            <div className="home-highlights">
                <div className="host-info">
                    <div>
                        <div className="host-img">
                            <img src={stay.host.thumbnailUrl} />
                        </div>
                        <div className="host-description">
                            <h3>Hosted by {stay.host.fullname}</h3>
                            <span>blalalal</span>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            </div>
            <div className="text-description">
                <p>{fullText}</p>
                {fullText.length > maxLength && (
                    <button className="btn-description" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? "Show less" : "Show more"}
                        <img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1739735073/right-arrow_ydaxfw.svg"} />
                    </button>
                )}
                <hr></hr>
            </div>
            {isModalOpen && <ShowAllReviews stay={stay} onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}

const images = [
    {
        name: "asset_5",
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739454694/asset_5_vzip4n.png"
    },
    {
        name: "asset_6",
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739453962/asset_6_d8prrd.png"
    },
    {
        name: "star",
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739453965/asset_23_rlrre4.svg"
    }
]