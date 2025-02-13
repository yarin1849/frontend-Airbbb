
import searchicon from '../assets/img/searchicon.svg'
export function SearchBar() {

    return (
        <section >
            <form action="" className="flex search-bar">
               
                <div className='input-container flex'>
                
                    <label htmlFor="Where">
                        <div>Where</div>
                        <input type="text" id="Where" placeholder="Search destination" />
                    </label>
                <div className="seperator"></div>
                </div>
                <div className='input-container flex'>
                    <label htmlFor="">
                        <div>Check in</div>
                        <input type="text" id="" placeholder="Add dates" />
                    </label>
                <div className="seperator"></div>
                </div>
                <div className='input-container flex'>
                    <label htmlFor="">
                        <div>Check out</div>
                        <input type="text" id="Where" placeholder="Add dates" />
                    </label>
                <div className="seperator"></div>
                </div>
                <div  className='input-container flex'>
                    <label htmlFor="">
                        <div>Who</div>
                        <input type="text" id="Where" placeholder="Add guests" />
                    </label>
                <div className="btn-container">
                    <button>
                        <div className='search-icon'>
                            <img src= {searchicon} alt="" />
                        </div>
                    </button>
                </div>
                </div>

            </form>
        </section>
    )
}