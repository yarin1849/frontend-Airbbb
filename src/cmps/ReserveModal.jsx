import { useState, useEffect } from "react";

export function ReserveModal() {
    const [checkIn, setCheckIn] = useState("2025-02-19");
    const [checkOut, setCheckOut] = useState("2025-02-26");
    const [guests, setGuests] = useState(1);
    const [gradient, setGradient] = useState("");
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!isHovering) {
            setGradient("linear-gradient(90deg, #FF3366, #E61E6E)");
        }
    }, [isHovering]);

    const nightlyRate = 110;
    const nights = 7;
    const fee = 78;
    const totalPrice = nightlyRate * nights + fee;

    const handleMouseMove = (e) => {
        setIsHovering(true)
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const xPos = ((e.clientX - left) / width) * 100
        const yPos = ((e.clientY - top) / height) * 100

        setGradient(`radial-gradient(circle at ${xPos}% ${yPos}%,rgb(255, 51, 102), #E61E6E)`)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
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
                    <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                        {[1, 2, 3].map(num => <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>)}
                    </select>
                </div>
            </div>

            <button
                className="reserve-button"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ background: gradient }}>
                Reserve
            </button>

            <p className="disclaimer">You won’t be charged yet</p>
            <div className="pricing-calculate">
                <div><span>${nightlyRate} x {nights} nights</span><span> ${nightlyRate * nights}</span></div>
                <div><span>Cleaning fee</span><span> ${fee}</span></div>
                <hr />
                <div className="total"><span>Total ${totalPrice}</span></div>
            </div>
        </div>
    );
}
