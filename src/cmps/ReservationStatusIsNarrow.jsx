import { ReservationStatusIsNarrowPreview } from './ReservationStatusIsNarrowPreview'

export function ReservationStatusIsNarrow({sortedUpcoming, sortedAll}) {
    return (
        <>
                    <h1 className='narrow-header'>Upcoming Trips</h1>
                    <ul className="trip-list">
                        <ReservationStatusIsNarrowPreview data={sortedUpcoming}/>
                    </ul>
                    <h1 className='narrow-header'>All Trips</h1>
                    <ul className="trip-list">
                        <ReservationStatusIsNarrowPreview data={sortedAll}/>
                    </ul>
                </>
    )
}