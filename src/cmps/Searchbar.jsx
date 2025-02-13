
import searchicon from '../assets/img/searchicon.svg'
export function SearchBar() {

    return (
        <section>
            <form action="" className="flex search-bar">
                <div>
                    <label htmlFor="Where">
                        <div>Where</div>
                        <input type="text" id="Where" placeholder="Search destination" />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        <div>Check in</div>
                        <input type="text" id="" placeholder="Add dates" />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        <div>Check out</div>
                        <input type="text" id="Where" placeholder="Add dates" />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        <div>who</div>
                        <input type="text" id="Where" placeholder="Add gusts" />
                    </label>
                </div>
                <div className="btn-container">
                    <button>
                        <div className='search-icon'>
                            <img src= {searchicon} alt="" />
                        </div>
                    </button>
                </div>
            </form>
        </section>
    )
}