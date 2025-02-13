import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import share from '../assets/details-action-icons/share.svg'
import save from '../assets/details-action-icons/save.svg'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
import { StayGallery } from '../cmps/StayGallery'
import { StayDescription } from '../cmps/StayDescription'
import { StayAmenities } from '../cmps/StayAmenities'
import { ReserveModal } from '../cmps/ReserveModal'


export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  async function onAddStayMsg(stayId) {
    try {
      await addStayMsg(stayId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Stay msg added`)
    } catch (err) {
      showErrorMsg('Cannot add stay msg')
    }

  }

  return (
    <section className="stay-details full">
      <div className='details-header'>
        <h1>Sunset Luxury 6 Bedroom Villa with Swimming pool</h1>
        <div className='action-btns'>
          <button className='action-btn' ><img src={share} alt="Main" className='action-img' />Share</button>
          <button className='action-btn'><img src={save} alt="Main" className='action-img' />Save</button>
        </div>
      </div>
      {stay && <div>
        <StayGallery />
        <div className='stay-info flex'>
          <div className=' stay-booking flex column'>
            <StayDescription />
            <StayAmenities />
          </div>
          <ReserveModal />
        </div>
      </div>
      }
      {/* <button onClick={() => { onAddStayMsg(stay._id) }}>Add stay msg</button> */}
    </section>
  )
}