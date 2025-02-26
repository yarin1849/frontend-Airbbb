import { DashbordTablePreview } from './DashbordTablePreview'

export function DashbordTable({ data, onStatusChange }) {
    return (
        <>
            <h1>Reservations</h1>
            <DashbordTablePreview data={data} onStatusChange={onStatusChange}/>
        </>
    )
}