import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

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
  // const location = useLocation()
  console.log(stay)

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
  if (!stay) return <div>...loading</div>
  return (
    <section className='stay-details full'>
      <div className='details-header'>
        <h1>{stay.name}</h1>
        <div className='action-btns'>
          <button className='action-btn' ><img src={share} alt="Main" className='action-img' />Share</button>
          <button className='action-btn'><img src={save} alt="Main" className='action-img' />Save</button>
        </div>
      </div>
      {stay && <div>
        <StayGallery stay={stay} />
        <div className='stay-main-content'>
          <div className='stay-info-content'>
            <StayDescription stay={stay} />
            <StayAmenities stay={stay} />
          </div>
          <div className='stay-booking-content'>
            <ReserveModal stay={stay} />
          </div>
        </div>
      </div>
      }
      {/* <button onClick={() => { onAddStayMsg(stay._id) }}>Add stay msg</button> */}
    </section>
  )
}