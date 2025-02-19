import { useEffect } from "react"

export function StayBookingModal({ stay }) {
    // console.log('stay', stay)

    // const { stayId } = useParams()
    // const stay = useSelector(storeState => storeState.stayModule.stay)


    // useEffect(() => {
    //     loadStay(stayId)
    // }, [])


    const nightlyRate = stay.price
    const nights = 7
    const fee = stay.price * 0.1
    const totalPrice = nightlyRate * nights + fee

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