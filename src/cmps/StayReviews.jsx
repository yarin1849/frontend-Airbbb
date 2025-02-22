import { getRandomIntInclusive } from "../services/util.service"

function formatMonthYear(dateString) {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long' }
    return date.toLocaleDateString('en-US', options)
}


export function StayReviews({ stay }) {
    return (
        <div className="stay-reviews">
            <hr />
            <div></div>
            {stay.reviews.map((review, idx) => (
                <div key={idx} className="review-container">
                    <div className="review-user-details">
                        <div className="review-user-img"><img src={review.by.imgUrl} /></div>
                        <div className="review-user-info">
                            <div>{review.by.fullname}</div>
                            <div>{getRandomIntInclusive(1, 15)} years on Airbnb</div>
                        </div>
                    </div>
                    <div className="review-info">
                        <span className="review-stars">{[1, 2, 3, 4, 5].map((index) => (
                            <img
                                key={index}
                                src="https://res.cloudinary.com/du312ufuo/image/upload/v1739453965/asset_23_rlrre4.svg"
                                alt="star"
                            />
                        ))} </span>
                        ·
                        <span className="review-date"> {formatMonthYear(review.at)}</span>
                    </div>
                    <div className="review-text">{review.txt}</div>
                </div>
            ))}
            <hr />

        </div>
    )
}