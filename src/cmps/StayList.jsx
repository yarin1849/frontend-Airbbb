import { useNavigate, useParams } from 'react-router'
import { userService } from '../services/user'
import { StayPreview } from './StayPreview'
import { StayFilter } from './StayFilter'
import { useEffect, useState } from 'react'
import { loadStays } from '../store/actions/stay.actions'
import { useSearchParams } from 'react-router-dom'


export function StayList({ stays, onRemoveStay, onUpdateStay }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    function shouldShowActionBtns(stay) {
        const user = userService.getLoggedinUser()

        if (!user) return false
        if (user.isAdmin) return true
        return stay.host?._id === user._id
    }

    function onHandleClick(stayId) {
        const currentParams = searchParams.toString()
        navigate(`/details/${stayId}?${currentParams}`)
    }

    
    return <section>
        <ul className="stay-list">
            {stays.map(stay =>
                <li key={stay._id} onClick={() => onHandleClick(stay._id)}>
                    <StayPreview stay={stay} />
                </li>)
            }
        </ul>
    </section>
}