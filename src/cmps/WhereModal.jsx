import { useEffect } from "react"


export function WhereModal({setFilterByToEdit, FilterByToEdit}) {
// useEffect(()=>{
//     handleClick()
// },[FilterByToEdit])

function handleClick({place} = ''){
    console.log(place)
    setFilterByToEdit(prevFilter => ({ ...prevFilter, where: place }))
}

    return (
        <div className="where-modal">
            <article onClick={handleClick(()=>{'united States'})}>
                United States <br />
                <span>State of mind</span>
            </article>
            <article onClick={handleClick(()=>{'spain'})}>
                Spain <br />
                <span>Sea side tapas bar</span>
            </article>
            <article onClick={handleClick(()=>{'ortugal'})}>
                Portugal <br />
                <span>Glass of wine in porto</span>
            </article>
            <article onClick={handleClick(()=>{'brazil'})}>
                Brazil <br />
                <span>Tropical heaven vacation</span>
            </article>
        </div>
    )
}