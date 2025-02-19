import { useState, useEffect } from "react"

export function GuestsModal({setFilterByToEdit, filterByToEdit}) {

    const [adults, setAdults] = useState(0)
    const [children, setChildren] = useState(0)
    const [infants, setInfants] = useState(0)
    const [pets, setPets] = useState(0)
    useEffect(() => {

        setFilterByToEdit(prevFilter => ({ ...prevFilter, guests: { adults, children, infants, pets, sum: adults+children+infants+pets } }))

    }, [adults, children, infants, pets])

    const handleIncrement = (setter, value) => {
        setter(value + 1)

    }
    const handleDecrement = (setter, value) => {
        if (value > 0) setter(value - 1)
    }

    return (
        <div className="guests-modal">
            <article className="flex">
                <div>
                    Adults <br />
                    <span className="sub-title">Ages 13 or above </span>
                </div>
                <div className="counter-controls">
                    <button
                        className={`counter-btn minus ${adults === 0 ? "disabled" : ""}`}
                        onClick={() => handleDecrement(setAdults, adults)}
                        disabled={adults === 0}> − </button>
                    <div className="value-display">

                        <span className="number">{adults}</span>

                    </div>
                    <button
                        className="counter-btn plus"
                        onClick={() => handleIncrement(setAdults, adults)}>+</button>
                </div>
            </article>
            <article className="flex">
                <div>
                    Children <br />
                    <span className="sub-title">Ages 2 - 12 </span>
                </div>
                <div className="counter-controls">
                    <button
                        className={`counter-btn minus ${children === 0 ? "disabled" : ""}`}
                        onClick={() => handleDecrement(setChildren, children)}
                        disabled={children === 0}>−</button>
                    <div className="value-display">

                        <span className="number">{children}</span>

                    </div>
                    <button
                        className="counter-btn plus"
                        onClick={() => handleIncrement(setChildren, children)}>+</button>
                </div>
            </article>
            <article className="flex">
                <div>
                    Infants <br />
                    <span className="sub-title">Under 2</span>
                </div>
                <div className="counter-controls">
                    <button
                        className={`counter-btn minus ${infants === 0 ? "disabled" : ""}`}
                        onClick={() => handleDecrement(setInfants, infants)}
                        disabled={infants === 0}>−</button>
                    <div className="value-display">

                        <span className="number">{infants}</span>

                    </div>
                    <button
                        className="counter-btn plus"
                        onClick={() => handleIncrement(setInfants, infants)}>+</button>
                </div>
            </article>
            <article className="flex">
                <div>
                    Pets <br />
                    <span className="sub-title">Bringing a service animal?</span>
                </div>
                <div className="counter-controls">
                    <button
                        className={`counter-btn minus ${pets === 0 ? "disabled" : ""}`}
                        onClick={() => handleDecrement(setPets, pets)}
                        disabled={pets === 0}>−</button>
                    <div className="value-display">


                        <span className="number">{pets}</span>



                    </div>
                    <button
                        className="counter-btn plus"
                        onClick={() => handleIncrement(setPets, pets)}> +</button>
                </div>
            </article>
        </div>
    )
}





