import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { DatePickerModal } from "./DayPickerModal";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function ReserveModal() {
    const [checkIn, setCheckIn] = useState("2025-02-19")
    const [checkOut, setCheckOut] = useState("2025-02-26")
    const [guests, setGuests] = useState(1)
    const [gradient, setGradient] = useState("linear-gradient(90deg, #FF3366, #E61E6E)")
    const [isHovering, setIsHovering] = useState(false)
    const navigate = useNavigate()
    const { stayId } = useParams()

    const nightlyRate = 110
    const nights = 7
    const fee = 78
    const totalPrice = nightlyRate * nights + fee

    const handleMouseMove = (ev) => {
        if (!isHovering) setIsHovering(true)

        const { left, top, width, height } = ev.currentTarget.getBoundingClientRect()
        const xPos = ((ev.clientX - left) / width) * 100
        const yPos = ((ev.clientY - top) / height) * 100

        setGradient(`radial-gradient(circle at ${xPos}% ${yPos}%, rgb(255, 51, 102), #E61E6E)`)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        setGradient("linear-gradient(90deg, #FF3366, #E61E6E)")
    }

    return (
        <div className="reserve-modal">
            <div className="price-per-night">
                <span>${nightlyRate}</span>
                <span>night</span>
            </div>
            <div className="modal-info-selector">
                <div className="date-selector">
                    <div>
                        <label>CHECK-IN</label>
                        <input type="date" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
                    </div>
                    <div>
                        <label>CHECKOUT</label>
                        <input type="date" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
                    </div>
                </div>

                <div className="guest-selector">
                    <label>GUESTS</label>
                    <select value={guests} onChange={(ev) => setGuests(ev.target.value)}>
                        {[1, 2, 3].map(num => <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>)}
                    </select>
                </div>
            </div>

            <button
                onClick={() => navigate(`/${stayId}/booking`)}
                className="reserve-button"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ background: gradient }}
            >
                Reserve
            </button>

            <p className="disclaimer">You won’t be charged yet</p>
            <div className="pricing-calculate">
                <div><span className="nightly-rate-calc">${nightlyRate} x {nights} nights</span><span> ${nightlyRate * nights}</span></div>
                <div><span className="nightly-service-fee">Airbnb service fee</span><span> ${fee}</span></div>
                <hr />
                <div className="total"><span>Total</span>
                    <span>${totalPrice}</span></div>
            </div>
            <div className="date-picker-modal">
                {/* <DayPicker captionLayout="label" dir="ltr" min={1} mode="range" showOutsideDays timeZone="Asia/Jerusalem" /> */}
            </div>
        </div>
    )
}
