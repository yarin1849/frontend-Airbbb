
import { useState, useEffect, useRef } from 'react'
import { DatePickerModal } from './DayPickerModal'
import { WhereModal } from './WhereModal'
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
        onCloseModal()
        setFilter(filterByToEdit)
    }

    function onOpenModal() {
        setIsOpen(true)
    }
    function onCloseModal() {
        setIsOpen(false)
    }

    return (
        <section>
            <form action="" className="flex search-bar" onSubmit={onSubmit}>

                <div className='input-container flex'>

                    <label htmlFor="where">
                        <div>Where</div>
                        <input type="search" id="where" placeholder="Search destination" name='where' value={filterByToEdit.where} onChange={onHandleChange} onFocus={onCloseModal} />
                        
                    </label>

                </div>
                <div className='input-container flex'>
                    <label htmlFor="checkIn" >
                        <div>Check in</div>
                        <input type="text" id="checkIn" placeholder="Add dates" name='checkIn' value={filterByToEdit.checkIn} onChange={onHandleChange} onFocus={onOpenModal} />
                    </label>

                </div>
                <div className='input-container flex'>
                    <label htmlFor="checkOut">
                        <div>Check out</div>
                        <input type="text" id="checkOut" placeholder="Add dates" name='checkOut' value={filterByToEdit.checkOut} onChange={onHandleChange} onFocus={onOpenModal} />
                    </label>

                </div>
                <div className='input-container flex'>
                    <label htmlFor="guests">
                        <div>Who</div>
                        {/* <input type="text" id="who" placeholder="Add guests" name='who' value={filterByToEdit.guests} onChange={onHandleChange}/> */}
                        <input type="number" id="guests" placeholder="" name='guests' value={filterByToEdit.guests} onChange={onHandleChange} onFocus={onCloseModal} />
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
            {isOpen && <article className="date-modal">
                <DatePickerModal />
            </article>}
                <WhereModal/>
        </section>
    )
}