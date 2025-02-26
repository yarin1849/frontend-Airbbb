import { DashbordIsNarrowPreview } from './DashbordIsNarrowPreview'

export function DashbordIsNarrow({data, onStatusChange}) {
    return (
        <>
                    <ul className="trip-list">
                        <DashbordIsNarrowPreview data={data} onStatusChange={onStatusChange}/>
                    </ul>
                </>
    )
}