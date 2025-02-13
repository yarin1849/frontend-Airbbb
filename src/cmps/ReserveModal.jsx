import { useState } from "react";

export function ReserveModal() {
    const [checkIn, setCheckIn] = useState("2025-02-19")
    const [checkOut, setCheckOut] = useState("2025-02-26")
    const [guests, setGuests] = useState(1)

    const nightlyRate = 110
    const nights = 7
    const fee = 78;
    const totalPrice = nightlyRate * nights + fee;

    return (
        <div className="reserve-modal">
            <span className="price">${nightlyRate} night</span>

            <div className="date-selector">
                <label>CHECK-IN</label>
                <input type="date" value={checkIn} onChange={(ev) => { setCheckIn(ev.target.value) }} />
                <label>CHECK-OUT</label>
                <input type="date" vale={checkOut} onChange={(ev) => { setCheckOut(ev.target.value) }} />
            </div>
            <div className="guest-selector">
                <label>GUESTS</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                    {[1, 2, 3].map(num => <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>)}
                </select>
            </div>
            <button className="reserve-button">Reserve</button>
            <p className="disclaimer">You won’t be charged yet</p>
            <div className="pricing-calculate">
                <div><span>${nightlyRate} x {nights} nights</span><span> ${nightlyRate * nights}</span></div>
                <div><span>Cleaning fee</span><span> ${fee}</span></div>
                <hr />
                <div className="total"><span>Total ${totalPrice}</span></div>
            </div>
        </div>

    )
}
