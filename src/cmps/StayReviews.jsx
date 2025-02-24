import { useState } from "react"
import { getRandomIntInclusive } from "../services/util.service"
import { ShowAllReviews } from "../cmps/StayShowAllReviews"

export function StayReviews({ stay }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const maxTextLength = 200

    return (
        <div className="stay-reviews">
            <hr />
            <div className="stay-reviews-data">
                {stay.reviews.slice(0, 6).map((review, idx) => (
                    <div key={idx} className="review-container">
                        <div className="review-user-details">
                            <div className="review-user-img">
                                <img src={review.by.imgUrl} alt={review.by.fullname} />
                            </div>
                            <div className="review-user-info">
                                <div className="review-user-fullname">{review.by.fullname}</div>
                                <div className="review-user-seniority">
                                    {getRandomIntInclusive(1, 15)} years on Airbbb
                                </div>
                            </div>
                        </div>
                        <div className="review-info">
                            <span className="review-stars">
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <img
                                        key={index}
                                        src="https://res.cloudinary.com/du312ufuo/image/upload/v1739453965/asset_23_rlrre4.svg"
                                        alt="star"
                                    />
                                ))}
                            </span> · <span className="review-date">{formatMonthYear(review.at)}</span>
                        </div>
                        <div className="review-text">
                            {review.txt.length > maxTextLength ? (
                                <>
                                    {`${review.txt.slice(0, maxTextLength)}... `}
                                    <button className="expand-review-btn" onClick={() => setIsModalOpen(true)}>
                                        Show more
                                    </button>
                                </>) : (review.txt)}
                        </div>
                    </div>
                ))}
            </div>

            {stay.reviews.length > 4 && (
                <button className="show-reviews-btn" onClick={() => setIsModalOpen(true)}>
                    Show all {stay.reviews.length} reviews
                </button>
            )}

            {isModalOpen && <ShowAllReviews stay={stay} onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}

function formatMonthYear(dateString) {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "long" }
    return date.toLocaleDateString("en-US", options)
}
