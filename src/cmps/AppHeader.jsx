import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import airbnblogo from '../assets/img/airbnblogo.svg'
import burger from '../assets/img/burger.svg'
import avtar from '../assets/img/avtar.svg'
import { SearchBar } from './Searchbar'
import { SmallSearch } from './SmallSearch'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full main-container">
			<section className='logo'>
				<NavLink to="/" className="">
					<div className='flex'>

						<img src={airbnblogo} alt="" />
					</div>
				</NavLink>
			</section>
			<section className='small-container'>
			<SmallSearch/>
			</section>
			{/* <section>
			<SearchBar className="search-container"/> 
			 </section> */}
			<button className='flex menu '>
				<div className='burger'>	
				<img src={burger} alt="" />
				</div>
				<div className='avatar'>
				<img src={avtar} alt="" />
				</div>
			</button>
		</header>
	)
}
