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
import { stayService } from '../services/stay'
import { useState, useEffect  } from 'react'
import { loadStays } from '../store/actions/stay.actions'
import { StayFilter } from './StayFilter'
import {useLocation} from 'react-router-dom'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const [filter, setFilter] = useState(stayService.getDefaultFilter())
	const navigate = useNavigate()
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation()
	console.log(location.pathname)
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 70) {
				setIsScrolled(true);
				document.querySelector('.app-header').classList.add('fixed')
			} else {
				setIsScrolled(false);
				document.querySelector('.app-header').classList.remove('fixed')
			}
		};

		window.addEventListener('scroll', handleScroll);


		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	function onSetFilterBy(filter) {
		setFilter(filter)
		loadStays(filter)
	}

	return (
		<>
			<header className="app-header full main-container">
				<section className='header-content flex' style = {(location.pathname.length > 1) ? {maxWidth: "1120px", justifySelf: "center"} : {maxWidth:"none"}}>
					<section className='logo'>
						<NavLink to="/" className="">
							<div className='flex'>

								<img src={airbnblogo} alt="" />
							</div>
						</NavLink>
					</section>
					{location.pathname.length > 1 || isScrolled ? <section className='small-container'>
						<SmallSearch />
					</section> :
						<section>
							<SearchBar className="search-container" setFilter={onSetFilterBy} filter={filter} />
						</section>}
					 <article className='btns-panel'>
			 <div className='globe'>	
				<img src="https://res.cloudinary.com/du312ufuo/image/upload/v1739702250/down-arrow_2_zz1obr.svg" alt="" />
				</div>
			<button className='flex menu'>
						<div className='burger'>
							<img src={burger} alt="" />
						</div>
						<div className='avatar'>
							<img src={avtar} alt="" />
						</div>
					</button>
				 </article>
			</section>
			</header>
			{location.pathname.length === 1  && <StayFilter filterBy={filter} setFilterBy={onSetFilterBy} />}
		</>
	)
}
