import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import share from '../assets/details-action-icons/share.svg'
import save from '../assets/details-action-icons/save.svg'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
// import { StayGallery } from '../cmps/StayGallery'
import { StayDescription } from '../cmps/StayDescription'
import { StayAmenities } from '../cmps/StayAmenities'
import { ReserveModal } from '../cmps/ReserveModal'
import { HostName } from '../cmps/HostName'
import { UploadImages } from '../cmps/UploadImages'
import CheckboxLabels from '../cmps/CheckboxLabels'
import { stayService } from '../services/stay'


export function AddStay() {

    //   const { stayId } = useParams()
    const stay = useSelector(storeState => storeState.stayModule.stay)
    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())
    console.log(stayToEdit)


    //   useEffect(() => {
    //     loadStay(stayId)
    //   }, [stayId])

    async function onAddStayMsg(stayId) {
        try {
            await addStayMsg(stayId, 'bla bla ' + parseInt(Math.random() * 10))
            showSuccessMsg(`Stay msg added`)
        } catch (err) {
            showErrorMsg('Cannot add stay msg')
        }

    }

    function onHandleChange({target}) {
        const name = target.name
        const value = target.value 
    }

    function onHandleSubmit(ev) {
        ev.preventDefault()
        stayToEdit
    }
    const { name, price, imgUrls, capacity, amenities, summary, type, labels } = stayToEdit
    console.log('name', name, 'price', price, 'img', imgUrls, 'capacity', capacity, 'amenities', amenities, 'summary', summary)
    return (
        <section className="stay-details full">
            {<div>
                <form onSubmit={onHandleSubmit}>
                    <HostName />
                    <div className='action-btns'>
                        {/* <button className='action-btn' ><img src={share} alt="Main" className='action-img' /> Share</button>
                        <button className='action-btn'><img src={save} alt="Main" className='action-img' /> Save</button> */}
                    </div>
                    <UploadImages />
                    <label htmlFor="capacity">Capacity</label>
                    <input type="number" name="capacity" id="" placeholder='Capacity' value={name} onChange={onHandleChange}/>
                    <select name="stayType" id="" value={type}>
                        <option value="">Entire place</option>
                        <option value="privateroom">Private Room</option>
                        <option value="sharedroom">Shared Room</option>
                    </select>
                    <select name="PropertyType" id="" value={labels}>
                        <option value="appartment" default>Appartment</option>
                        <option value="house">House</option>
                        <option value="vila">Vila</option>
                    </select>
                    <label htmlFor="price"></label>
                    <input type="number" name="price" id="price" placeholder='price' value={price} />

                    <div>
                        <p>Entire place</p>
                        <p>house Rules</p>
                        <p>tommey is a super host</p>
                        <p>wifi</p>
                    </div>
                    <label htmlFor="summary">description</label>
                    <textarea id="description" name="summary" rows="4" cols="50" value={summary}></textarea>
                    < CheckboxLabels />

                    <button>Save</button>
                </form>
            </div>
            }
            {/* <button onClick={() => { onAddStayMsg(stay._id) }}>Add stay msg</button> */}
        </section>
    )
}