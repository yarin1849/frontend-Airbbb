import wifi from '../assets/amenities-icons/wifi.svg'
import kitchen from '../assets/amenities-icons/kitchen.svg'
import sharedBeachAccess from '../assets/amenities-icons/shared-beach-access.svg'
import airConditioner from '../assets/amenities-icons/air-conditioner.svg'
import { DayPicker } from 'react-day-picker'

export function StayAmenities() {
    return (
        <section className="stay-amenities">
            <h2>What this place offers</h2>
            <div className="amenities-container">
                <div className="amenity"><img src={kitchen} alt="Main" className='amenities-img' /> Kitchen</div>
                <div className="amenity"><img src={wifi} alt="Main" className='amenities-img' /> Wifi</div>
                <div className="amenity"><img src={sharedBeachAccess} alt="Main" className='amenities-img' />Shared beach access</div>
                <div className="amenity"><img src={airConditioner} alt="Main" className='amenities-img' /> Air conditioning</div>
                <div className="amenity"><img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1739783100/car_xn1gym.svg"} alt="Main" className='amenities-img' />Free parking on premises</div>
                <div className="amenity"><img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1739783099/balcony_pxvmkj.svg"} alt="Main" className='amenities-img' />Patio or balcony</div>
                <div className="amenity"><img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1739783099/TV_em79pn.svg"} alt="Main" className='amenities-img' />TV</div>
                <div className="amenity"><img src={"https://res.cloudinary.com/du312ufuo/image/upload/v1739783099/flower_mnatgc.svg"} alt="Main" className='amenities-img' />Private backyard – Not fully fenced</div>
            </div>
            <button className='show-amenities-btn'>Show all 67 amenities</button>
            {/* <div className="date-picker-modal-amenities">
                <DayPicker captionLayout="label" dir="ltr" min={1} mode="range" showOutsideDays timeZone="Asia/Jerusalem" />
            </div> */}
            <hr></hr>
        </section>
    )
}
