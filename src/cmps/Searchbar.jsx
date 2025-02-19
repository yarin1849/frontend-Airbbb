
import { useState, useEffect, useRef } from 'react'
import { DatePickerModal } from './DayPickerModal'
import { WhereModal } from './WhereModal'
import searchicon from '../assets/img/searchicon.svg'

// import { useSearchParams } from 'react-router-dom'
export function SearchBar({ setFilter, filter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filter)
    const [isOpenWhere, setIsOpenWhere] = useState(false)
    const [isOpenDate, setIsOpenDate] = useState(false)
    const [isOpenGuests, setIsOpenGuests] = useState(false)
    // const [searchParams, setSearchParams] = useSearchParams()

    function onHandleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    function onSubmit(ev) {
        ev.preventDefault()
        onCloseModal('all')
        setFilter(filterByToEdit)
    }

    function onOpenModal(what) {
        console.log(what)
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
                    break
            }
        }

// console.log(filterByToEdit)
        return (
            <section>
                <form action="" className="flex search-bar" onSubmit={onSubmit}>

                    <div className='input-container flex'>

                        <label htmlFor="where">
                            <div>Where</div>
                            <input type="search" id="where" placeholder="Search destination" name='where' autocomplete="off" value={filterByToEdit.where} onChange={onHandleChange} onFocus={() => { onCloseModal('where'); onOpenModal('where') }} />
                        </label>

                    </div>
                    <div className='input-container flex'>
                        <label htmlFor="checkIn" >
                            <div>Check in</div>
                            <input type="text" id="checkIn" placeholder="Add dates" name='checkIn' autocomplete="off" value={filterByToEdit.checkIn} onChange={onHandleChange} onFocus={() => { onOpenModal('date'); onCloseModal('date') }} />
                        </label>

                    </div>
                    <div className='input-container flex'>
                        <label htmlFor="checkOut">
                            <div>Check out</div>
                            <input type="text" id="checkOut" placeholder="Add dates" name='checkOut' autocomplete="off" value={filterByToEdit.checkOut} onChange={onHandleChange} onFocus={() => { { onOpenModal('date'); onCloseModal('date') } }} />
                        </label>

                    </div>
                    <div className='input-container flex'>
                        <label htmlFor="guests">
                            <div>Who</div>
                            {/* <input type="text" id="who" placeholder="Add guests" name='who' value={filterByToEdit.guests} onChange={onHandleChange}/> */}
                            <input type="number" id="guests" placeholder="" name='guests' autocomplete="off" value={filterByToEdit.guests} onChange={onHandleChange} onFocus={() => { { onOpenModal('guests'); onCloseModal('guests') } }} />
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
                    <DatePickerModal setFilterByToEdit={setFilterByToEdit} filterByToEdit={filterByToEdit}/>
                </article>}
                {isOpenWhere && <article className="where-modal">
                    <WhereModal setFilterByToEdit={setFilterByToEdit} filterByToEdit={filterByToEdit} />
                </article>}
            </section>
        )
    }