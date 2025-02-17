
import { useState, useEffect, useRef } from 'react'
import { DatePickerModal } from './DayPickerModal'
import searchicon from '../assets/img/searchicon.svg'
export function SearchBar({ setFilter, filter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filter)
    const [isOpen, setIsOpen] = useState(false)

   
    function onHandleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    function onSubmit(ev) {
        ev.preventDefault()
        setFilter(filterByToEdit)
    }

    function onOpenModal() {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    return (
        <section >
            <form action="" className="flex search-bar" onSubmit={onSubmit}>

                <div className='input-container flex'>

                    <label htmlFor="where">
                        <div>Where</div>
                        <input type="text" id="where" placeholder="Search destination" name='where' value={filterByToEdit.where} onChange={onHandleChange} />
                    </label>

                </div>
                <div className='input-container flex'>
                    <label htmlFor="checkIn" >
                        <div>Check in</div>
                        <input type="text" id="checkIn" placeholder="Add dates" name='checkIn' value={filterByToEdit.checkIn} onChange={onHandleChange} onClick={onOpenModal} />

                    </label>

                </div>
                <div className='input-container flex'>
                    <label htmlFor="checkOut">
                        <div>Check out</div>
                        <input type="text" id="checkOut" placeholder="Add dates" name='checkOut' value={filterByToEdit.checkOut} onChange={onHandleChange} onClick={onOpenModal} />
                    </label>

                </div>
                <div className='input-container flex'>
                    <label htmlFor="guests">
                        <div>Who</div>
                        {/* <input type="text" id="who" placeholder="Add guests" name='who' value={filterByToEdit.guests} onChange={onHandleChange}/> */}
                        <input type="number" id="guests" placeholder="Add guests" name='guests' value={filterByToEdit.guests} onChange={onHandleChange} />

                    </label>
                    <div className="btn-container">
                        <button>
                            <div className='search-icon'>
                                <img src={searchicon} alt="" />
                            </div>
                        </button>
                    </div>
                </div>

            </form>
            {isOpen && <article className="date-modal">
                <DatePickerModal />
            </article>}
        </section>
    )
}