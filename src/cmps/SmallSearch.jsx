

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
                                <img src='https://res.cloudinary.com/dswenk4wc/image/upload/v1739694003/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_gw4jon.svg' alt="" />
                            </div>
                        </button>
                    </div>
                </div>

            </form>
        </section>
    )
}