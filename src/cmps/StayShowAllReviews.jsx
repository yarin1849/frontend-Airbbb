import { getRandomIntInclusive } from "../services/util.service"

function formatMonthYear(dateString) {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "long" }
    return date.toLocaleDateString("en-US", options)
}

export function ShowAllReviews({ stay, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>✖</button>
                <h2>{stay.reviews.length} Reviews</h2>

                <div className="reviews-list">
                    {stay.reviews.map((review, idx) => (
                        <div key={idx} className="full-review-container">
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
                            <p className="full-review-text">{review.txt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
