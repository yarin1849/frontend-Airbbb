
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
                
                </div>
                <div className='input-container flex'>
                    <label htmlFor="check-in">
                        <div>Check in</div>
                        <input type="text" id="check-in" placeholder="Add dates" />
                    </label>
                
                </div>
                <div className='input-container flex'>
                    <label htmlFor="check-out">
                        <div>Check out</div>
                        <input type="text" id="check-out" placeholder="Add dates" />
                    </label>
                
                </div>
                <div  className='input-container flex'>
                    <label htmlFor="who">
                        <div>Who</div>
                        <input type="text" id="who" placeholder="Add guests" />
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