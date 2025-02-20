import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { DatePickerModal } from "./DayPickerModal"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"

export function ReserveModal({ stay, checkin, checkout, guests }) {
    const navigate = useNavigate()
    const { stayId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const parsedGuests = Math.max(1, parseInt(guests) || 1)

    const [checkIn, setCheckIn] = useState(checkin)
    const [checkOut, setCheckOut] = useState(checkout)
    const [numGuests, setNumGuests] = useState(parsedGuests)
    const [gradient, setGradient] = useState("linear-gradient(90deg, #FF3366, #E61E6E)")
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const params = new URLSearchParams()
        params.set("checkin", checkIn)
        params.set("checkout", checkOut)
        params.set("guests", numGuests)
        setSearchParams(params)
    }, [checkIn, checkOut, numGuests, setSearchParams])


    const nightlyRate = stay.price
    const nights = Math.max((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24), 1)
    const fee = parseInt(stay.price * nights * 0.12)
    const totalPrice = nightlyRate * nights + fee


    const handleReserve = () => {
        const params = new URLSearchParams()
        params.set('checkin', checkIn)
        params.set('checkout', checkOut)
        params.set('guests', guests)
        params.set("price", nightlyRate)
        params.set("nights", nights)
        params.set("fee", fee)
        params.set("totalPrice", totalPrice)
        navigate(`/${stayId}/booking?${params.toString()}`)
    }

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
                    <select value={numGuests} onChange={(ev) => setNumGuests(Number(ev.target.value))}>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                                {num} guest{num > 1 ? "s" : ""}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                onClick={handleReserve}
                className="reserve-button"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ background: gradient }}>
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
