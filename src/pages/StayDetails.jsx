import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
    <section className="stay-details">
      {/* <Link to="/stay">Back to list</Link> */}
      <h1>Sunset Luxury 6 Bedroom Villa with Swimming pool</h1>
      {stay && <div>
        <StayGallery />
        <StayDescription />
        <StayAmenities />
        <ReserveModal />
      </div>
      }
      {/* <button onClick={() => { onAddStayMsg(stay._id) }}>Add stay msg</button> */}

    </section>
  )
}