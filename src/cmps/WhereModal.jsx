import { useState } from "react"



export function WhereModal({ setFilterByToEdit, FilterByToEdit }) {

    const [place, setPlace] = useState('')

    function handleClick( place ) {
        console.log(place)
        // setPlace(place)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, where: place }))
    }



    return (
        <div className="where-modal">
            <article onClick={() => { handleClick('united States') }}>
                United States <br />
                <span>State of mind</span>
            </article>
            <article onClick={() => { handleClick('Spain') }}>
                Spain <br />
                <span>Sea side tapas bar</span>
            </article>
            <article onClick={() => { handleClick('portugal') }}>
                Portugal <br />
                <span>Glass of wine in porto</span>
            </article>
            <article onClick={() => { handleClick('Brazil') }}>
                Brazil <br />
                <span>Tropical heaven vacation</span>
            </article>
        </div>
    )
}