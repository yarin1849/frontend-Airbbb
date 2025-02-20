import { useEffect } from "react"
import { useParams } from "react-router"
import { useSearchParams } from "react-router-dom"

export function StayBookingModal({ stay }) {


    const [searchParams] = useSearchParams()

    const nightlyRate = parseFloat(searchParams.get("price")) || stay.price
    const nights = parseInt(searchParams.get("nights"), 10)
    const fee = parseFloat(searchParams.get("fee")) || stay.price * nights * 0.12
    const totalPrice = parseFloat(searchParams.get("totalPrice")) || (nightlyRate * nights + fee)

    if (!stay) return <div>Loading...</div>
    return (

        <div className="stay-booking-modal">
            <div className="stay-details-container">
                <div className="stay-img">
                    <img src={stay.imgUrls[0]} />
                </div>
                <div className="stay-details">
                    <div className="stay-details-text">
                        <div className="stay-details-name">
                            {stay.name}
                        </div>
                        <div className="stay-details-header">
                            {stay.type}
                        </div>
                    </div>
                    <div className="stay-details-reviews">
                        <span><img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1739453965/asset_23_rlrre4.svg"} /></span>
                        <span className="reviews-score">4.97</span>
                        <span className="reviews-number">({stay.reviews.length} reviews)</span>
                    </div>
                </div>
            </div>
            <div className="reserve-details-container">
                <hr></hr>
                <h2>
                    Price details
                </h2>
                <div className="pricing-calculate">
                    <div><span className="nightly-rate-calc">${nightlyRate} x {nights} nights</span><span> ${nightlyRate * nights}</span></div>
                    <div><span className="nightly-service-fee">Airbnb service fee</span><span> ${fee}</span></div>
                    <hr />
                    <div className="total"><span>Total</span>
                        <span>${totalPrice}</span></div>
                </div>

            </div>
        </div>
    )
}