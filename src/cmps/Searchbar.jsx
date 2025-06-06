
import { useState, useEffect, useRef } from 'react'
import { DatePickerModal } from './DayPickerModal'
import { WhereModal } from './WhereModal'
import searchicon from '../assets/img/searchicon.svg'
import { GuestsModal } from './GuestsModal'
import { useSearchParams } from 'react-router-dom'
export function SearchBar({ setFilter, filter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filter)
    const [isOpenWhere, setIsOpenWhere] = useState(false)
    const [isOpenDate, setIsOpenDate] = useState(false)
    const [isOpenGuests, setIsOpenGuests] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [focused, setFocused] = useState(false)

    function onHandleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    function onSubmit(ev) {
        ev.preventDefault()
        onCloseModal('all')
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('where', filterByToEdit.where) 
            newParams.set('checkin', filterByToEdit.checkIn)
            newParams.set('checkout', filterByToEdit.checkOut)
            newParams.set('guests', filterByToEdit.guests.sum) 
            return newParams
        })
        setFilter(filterByToEdit)
    }

    function onOpenModal(what) {
        switch (what) {
            case 'date':
                setIsOpenDate(true)
                break
            case 'where':
                setIsOpenWhere(true)
                break
            case 'guests':
                setIsOpenGuests(true)
                break
        }
    }

    function onCloseModal(what) {
        switch (what) {
            case 'date':
                setIsOpenWhere(false)
                setIsOpenGuests(false)
                break
            case 'where':
                setIsOpenDate(false)
                setIsOpenGuests(false)
                break
            case 'guests':
                setIsOpenDate(false)
                setIsOpenWhere(false)
                break
            case 'all':
                setIsOpenDate(false)
                setIsOpenWhere(false)
                setIsOpenGuests(false)
                setFocused(false)
                break
        }
    }


    return (
        <section className={`search-bar-container ${focused ? 'focused-search': ''}`}>
            <form action="" className={`search-bar flex ${focused ? 'focused-search': ''}`} onSubmit={onSubmit}>

                <div className={`input-container flex ${isOpenWhere ? 'input-focused' : ''}`} >

                    <label htmlFor="where">
                        <div>Where</div>
                        <input type="search" id="where" placeholder="Search destination" name='where' autoComplete="off" value={filterByToEdit.where} onChange={onHandleChange} onFocus={() => { onCloseModal('where'); onOpenModal('where'); setFocused(true) }} />
                    </label>

                </div>
                <div className={`input-container flex ${isOpenDate ? 'input-focused' : ''}`}>
                    <label htmlFor="checkIn" >
                        <div>Check in</div>
                        <input type="text" id="checkIn" placeholder="Add dates" name='checkIn' autoComplete="off" value={filterByToEdit.checkIn} onChange={onHandleChange} onFocus={() => { onOpenModal('date'); onCloseModal('date') }} />
                    </label>

                </div>
                <div className='input-container flex'>
                    <label htmlFor="checkOut">
                        <div>Check out</div>
                        <input type="text" id="checkOut" placeholder="Add dates" name='checkOut' autoComplete="off" value={filterByToEdit.checkOut} onChange={onHandleChange} onFocus={() => { { onOpenModal('date'); onCloseModal('date') } }} />
                    </label>

                </div>
                <div className={`input-container flex ${isOpenGuests? 'input-focused': ''}`}>
                    <label htmlFor="guests">
                        <div>Who</div>
                    
                        <input type="text" id="guests" placeholder="Add guests" name='guests' autoComplete="off" value={filterByToEdit.guests.sum ? `${filterByToEdit.guests.sum} guests` : ''} onChange={onHandleChange} onFocus={() => { { onOpenModal('guests'); onCloseModal('guests') } }} />
                    </label>
                    <div className="btn-container">
                        <button>
                            <div className='search-icon flex'>
                                <img src={searchicon} alt="" />
                                <span>
                                    Search
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

            </form>
            {isOpenDate && <article className="date-modal">
                <DatePickerModal setFilterByToEdit={setFilterByToEdit} filterByToEdit={filterByToEdit} modifiersClassNames={{
                    inRange: "my-hovered-range",
                    hoveredRange: "my-hovered-range",
                    checkInDay: "check-in-day",
                    checkOutDay: "check-out-day",
                }} next={document.getElementById('guests')} />
            </article>}
            {isOpenWhere && <article className="where-modal">
                <WhereModal setFilterByToEdit={setFilterByToEdit} filterByToEdit={filterByToEdit} next={document.getElementById('checkIn')} />
            </article>}
            {isOpenGuests && <article className="where-modal">
                <GuestsModal setFilterByToEdit={setFilterByToEdit} filterByToEdit={filterByToEdit} />
            </article>}
        </section>
    )
}