import wifi from '../assets/amenities-icons/wifi.svg'
import kitchen from '../assets/amenities-icons/kitchen.svg'
import sharedBeachAccess from '../assets/amenities-icons/shared-beach-access.svg'
import airConditioner from '../assets/amenities-icons/air-conditioner.svg'

export function StayAmenities() {
    return (
        <section className="stay-amenities">
            <h2>What this place offers</h2>
            <div className="amenities-container">
                <div className="amenity"><img src={sharedBeachAccess} alt="Main" className='amenities-img' />Shared beach access</div>
                <div className="amenity"><img src={wifi} alt="Main" className='amenities-img' /> Wifi</div>
                <div className="amenity"><img src={kitchen} alt="Main" className='amenities-img' /> Kitchen</div>
                <div className="amenity"><img src={airConditioner} alt="Main" className='amenities-img' /> Air conditioning</div>
            </div>
            <button className='show-amenities-btn'>Show all 67 amenities</button>
        </section>
    );
}
