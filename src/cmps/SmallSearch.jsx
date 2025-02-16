import searchicon from '../assets/img/searchicon.svg'

export function SmallSearch() {

    return (
        <section >
            <form action="" className="small-search flex">

                <div className='label-container flex'>

                    <label htmlFor="Where">
                        <div> Any where</div>
                    </label>

                </div>

                <div className='label-container flex'>
                    <label htmlFor="">
                        <div>Any week</div>
                    </label>

                </div>
                <div className='label-container flex'>
                    <label htmlFor="">
                        <div>Add guests</div>
                    </label>
                    <div className="btn-container">
                        <button>
                            <div className='search-icon'>
                                 <img src={searchicon} alt="" />
                            </div>
                        </button>
                    </div>
                </div>

            </form>
        </section>
    )
}