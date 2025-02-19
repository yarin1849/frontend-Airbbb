
export function WhereModal() {


    function handleClick({ place } = '') {
        console.log(place)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, where: place }))
    }

    return (
        <div className="guests-modal">
            <article className="flex">
                <div>
                Adults <br />
                <span>Ages 13 or above </span>
                </div>
            </article>
            <article>
            <div>
                Children <br />
                <span>Ages 2 - 12 </span>
                </div>
            </article>
            <article>
            <div>
                Infants <br />
                <span>Under 2</span>
                </div>
            </article>
            <article>
            <div>
                Pets <br />
                <span>Bringing a service animal?</span>
                </div>
            </article>
        </div>
    )
}