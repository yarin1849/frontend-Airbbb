import { NavLink } from "react-router-dom"

export function UserMenu({onLogout}) {

    return (
        <div className="user-menu">
            <article className="link" >
                <NavLink to="/login" className='login'>Log in</NavLink>
            </article>
            <article className="link" >
                <NavLink to="/reserve-status">Trips</NavLink>
            </article>
            <article className="link">
                <NavLink to="/dashboard">Dashboard</NavLink>
            </article >
            <article className="link">
                <NavLink to="/login" className='login' onClick={onLogout}>Log out</NavLink>
            </article >
        </div>
    )
}

