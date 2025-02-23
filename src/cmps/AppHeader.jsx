import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import airbnblogo from '../assets/img/airbnblogo.svg'
import airbbblogo from '../assets/img/airbbb.png'
import burger from '../assets/img/burger.svg'
import avtar from '../assets/img/avtar.svg'
import { SearchBar } from './Searchbar'
import { SmallSearch } from './SmallSearch'
import { stayService } from '../services/stay'
import { useState, useEffect } from 'react'
import { loadStays } from '../store/actions/stay.actions'
import { StayFilter } from './StayFilter'
import { useLocation } from 'react-router-dom'
import { UserMenu } from './UserMenu'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const [filter, setFilter] = useState(stayService.getDefaultFilter())
	const navigate = useNavigate()
	const [isScrolled, setIsScrolled] = useState(false)
	const [isOpenMenu, setIsOpenMenu] = useState(false)
	const location = useLocation()
	// console.log(isOpenMenu)
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 70) {
				setIsScrolled(true);
				document.querySelector('.app-header').classList.add('fixed')
				if (location.pathname.length === 1) document.querySelector('.stay-filter').classList.add('fixed')
			} else {
				setIsScrolled(false);
				document.querySelector('.app-header').classList.remove('fixed')
				if (location.pathname.length === 1) document.querySelector('.stay-filter').classList.remove('fixed')
			}
		};

		window.addEventListener('scroll', handleScroll);


		return () => {
			window.removeEventListener('scroll', handleScroll);
		}
	}, [])

	function onToggleModal(ev) {
		console.log('open the menu')
		ev.preventDefault()
		ev.stopPropagation()
		setIsOpenMenu(prevIsOpenMenu => !prevIsOpenMenu)
		// console.log('ontoggle:', isOpenMenu)
	}
	async function onLogout() {
		console.log('hii')
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
	 console.log(user)
	return (
		<>
			<header className="app-header full main-container" onClick={() => setIsOpenMenu(false)}>
				<section className='header-content flex' style={location.pathname.includes('/details') || location.pathname.includes('/booking')? { maxWidth: "1120px", justifySelf: "center" } : {}} >
					<section className='logo'>
						<NavLink to="/" className="">
							<div className='flex'>

								<img src={airbbblogo} alt="" />
							</div>
						</NavLink>
					</section>
					{location.pathname.length === 1 && !isScrolled ? <section className='big-search'>
						<h1>Homes</h1>
						<SearchBar className="search-container" setFilter={onSetFilterBy} filter={filter} />
					</section> :
						<section className='small-container'>
							<SmallSearch setFilter={onSetFilterBy} filter={filter}/>
						</section>
					}
					<article className='btns-panel'>
						
						<button className='flex menu' onClick={onToggleModal}>
							<div className='burger'>
								<img src={burger} alt="" />
							</div>
							<div className='avatar'>

								{user? <img src={user.imgUrl} alt="" /> :<img src={avtar} alt="" />}
							</div>
						</button>
					</article>
					{isOpenMenu && <UserMenu onLogout={onLogout} user={user}/>}
				</section>
			</header>
			{location.pathname.length === 1 && <StayFilter filterBy={filter} setFilterBy={onSetFilterBy} />}
		</>
	)
}
