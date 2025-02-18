import { useNavigate } from 'react-router'
import { userService } from '../services/user'
import { StayPreview } from './StayPreview'
import { StayFilter } from './StayFilter'
import { useEffect, useState } from 'react'
import { loadStays } from '../store/actions/stay.actions'


export function StayList({ stays, onRemoveStay, onUpdateStay }) {
    // const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
    const navigate = useNavigate()

    // useEffect(() => {
    //     loadStays(filterBy)
    // }, [filterBy])

    function shouldShowActionBtns(stay) {
        const user = userService.getLoggedinUser()

        if (!user) return false
        if (user.isAdmin) return true
        return stay.host?._id === user._id
    }

    function onHandleClick(stayId) {
        navigate(`/details/${stayId}`)
    }
console.log(stays)
    return <section>
        {/* <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
        <ul className="stay-list">
            {stays.map(stay =>
                <li key={stay._id} onClick={() => onHandleClick(stay._id)}>
                    <StayPreview stay={stay} />
                    {shouldShowActionBtns(stay) && <div className="actions">
                        <button onClick={() => onUpdateStay(stay)}>Edit</button>
                        <button onClick={() => onRemoveStay(stay._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}