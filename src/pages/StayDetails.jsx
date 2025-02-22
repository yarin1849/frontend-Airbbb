import { useEffect, useState } from 'react'
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
import { DayPicker } from 'react-day-picker'
import { Loading } from '../cmps/Loading'
import { StayReviews } from '../cmps/StayReviews'

export function StayDetails() {
  const { stayId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const reviews = useSelector(storeState => storeState.reviewModule.review)

  // Get check-in & check-out from query params
  const checkin = searchParams.get('checkin')
  const checkout = searchParams.get('checkout')

  // Convert query params to Date objects
  const [selectedRange, setSelectedRange] = useState({
    from: checkin ? new Date(checkin) : undefined,
    to: checkout ? new Date(checkout) : undefined,
  })

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  // 🔹 **Auto-Update `DayPicker` When Query Params Change**
  useEffect(() => {
    setSelectedRange({
      from: checkin ? new Date(checkin) : undefined,
      to: checkout ? new Date(checkout) : undefined,
    })
  }, [checkin, checkout])

  // Function to update query params when selecting new dates
  const handleDateSelect = (range) => {
    if (!range?.from || !range?.to) return

    const formattedCheckIn = range.from.toISOString().split('T')[0]
    const formattedCheckOut = range.to.toISOString().split('T')[0]

    setSelectedRange(range)

    const params = new URLSearchParams(searchParams)
    params.set('checkin', formattedCheckIn)
    params.set('checkout', formattedCheckOut)
    setSearchParams(params)
  }

  if (!stay) return <Loading />

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
              <div className="date-picker-modal-details">
                <DayPicker
                  captionLayout="label"
                  numberOfMonths={2}
                  dir="ltr"
                  mode="range"
                  showOutsideDays
                  timeZone="Asia/Jerusalem"
                  pagedNavigation
                  fixedWeeks
                  selected={selectedRange}
                  onSelect={handleDateSelect}
                  modifiers={{
                    selectedRange: selectedRange.from && selectedRange.to
                      ? { from: selectedRange.from, to: selectedRange.to }
                      : undefined,
                  }}
                  modifiersClassNames={{
                    selectedRange: "my-hovered-range",
                  }}
                />
              </div>
            </div>
            <div className='stay-booking-content'>
              <ReserveModal stay={stay} checkin={checkin} checkout={checkout} guests={searchParams.get('guests')} />
            </div>
          </div>
          <StayReviews stay={stay} />
        </div>
      )
      }
    </section>
  )
}
