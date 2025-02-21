import { useState } from "react"
import locationpin from "../assets/img/locationpin.svg"

export function WhereModal({ setFilterByToEdit, FilterByToEdit }) {

    const [place, setPlace] = useState('')

    function handleClick(place) {
        console.log(place)
        // setPlace(place)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, where: place }))
    }



    return (
        <div className="where-modal">
            <article className="flex" onClick={() => { handleClick('Spain') }}>
                <img src="https://res.cloudinary.com/ddjdtcgkf/image/upload/v1740073405/spain_fnrzhg.png" alt="" />
                <div>
                    Spain <br />
                    <span>Sea side tapas bar</span>
                </div>
            </article>
            <article className="flex" onClick={() => { handleClick('Portugal') }}>
                <img src="https://res.cloudinary.com/ddjdtcgkf/image/upload/v1740073684/portugal_tg35ve.png" alt="" />
                <div>
                    Portugal <br />
                    <span>Glass of wine in porto</span>
                </div>
            </article>
            <article className="flex" onClick={() => { handleClick('Brazil') }}>
                <img src={locationpin} alt="" />
                <div>
                    Brazil <br />
                    <span>Tropical heaven vacation</span>
                </div>
            </article>
            <article className="flex" onClick={() => { handleClick('United States') }}>
                <img src={locationpin} alt="" />
                <div>
                    United States <br />
                    <span>State of mind</span>
                </div>
            </article>
        </div>
    )
}