import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import share from '../assets/details-action-icons/share.svg'
import save from '../assets/details-action-icons/save.svg'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
import { StayGallery } from '../cmps/StayGallery'
import { StayDescription } from '../cmps/StayDescription'
import { StayAmenities } from '../cmps/StayAmenities'
import { ReserveModal } from '../cmps/ReserveModal'
import GoogleMap from '../cmps/GoogleMap'

export function StayDetails() {
  const { stayId } = useParams()
  const [searchParams] = useSearchParams()

  const stay = useSelector(storeState => storeState.stayModule.stay)

  const checkin = searchParams.get('checkin')
  const checkout = searchParams.get('checkout')
  const guests = searchParams.get('guests')

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  console.log(`Check-in: ${checkin}, Check-out: ${checkout}, Guests: ${guests}`)

  if (!stay) return <div>...loading</div>

  return (
    <section className='stay-details full'>
      <div className='details-header'>
        <h1>{stay.name}</h1>
        <div className='action-btns'>
          <button className='action-btn'><img src={share} alt="Share" className='action-img' />Share</button>
          <button className='action-btn'><img src={save} alt="Save" className='action-img' />Save</button>
        </div>
      </div>
      {stay && (
        <div>
          <StayGallery stay={stay} />
          <div className='stay-main-content'>
            <div className='stay-info-content'>
              <StayDescription stay={stay} />
              <StayAmenities stay={stay} />
            </div>
            <div className='stay-booking-content'>
              <ReserveModal stay={stay} checkin={checkin} checkout={checkout} guests={guests} />
            </div>
          </div>
          <GoogleMap />

        </div>
      )}
    </section>
  )
}
