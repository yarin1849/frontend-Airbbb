import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import image from '../assets/img/image.avif'
// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules"
import { Loading } from "./Loading"

export function StayPreview({ stay }) {

    const swiperRef = useRef(null)

    function stopPropagation(event) {
        event.stopPropagation()
    }

    useEffect(() => {
        const waitForSwiper = async () => {
            // Wait until Swiper initializes and buttons are available
            while (swiperRef.current?.swiper?.navigation?.nextEl === null) {
                await new Promise(resolve => setTimeout(resolve, 100))
            }

            const swiperInstance = swiperRef.current.swiper
            const buttons = [swiperInstance.navigation.nextEl, swiperInstance.navigation.prevEl]

            buttons.forEach(button => {
                if (button) button.addEventListener("click", stopPropagation)
            })

            return () => {
                buttons.forEach(button => {
                    if (button) button.removeEventListener("click", stopPropagation)
                })
            }
        }

        waitForSwiper()

        return () => {
            if (swiperRef.current?.swiper?.navigation) {
                const buttons = [swiperRef.current.swiper.navigation.nextEl, swiperRef.current.swiper.navigation.prevEl]
                buttons.forEach(button => {
                    if (button) button.removeEventListener("click", stopPropagation)
                })
            }
        }
    }, [])
    
    let address =  `${stay.loc.city}, ${stay.loc.country}`
    address = (stay?.loc?.country?.length + stay?.loc?.city?.length > 23) ? address.slice(0, 23) + '...' : address
    const isLong = stay?.loc?.country?.length + stay?.loc?.city?.length > 23
    // const hostName = (stay?.host?.fullname?.length > 7) ? stay.host.fullname.slice(0, 7) + '...' : stay?.host?.fullname

    
    return (
        <section className="preview">
            <Swiper
                ref={swiperRef}
                cssMode={true}
                navigation={{ hideOnClick: false }}
                pagination={{
                    clickable: true,
                    bulletActiveClass: "swiper-pagination-bullet-active-custom"
                }}
                mousewheel={true}
                keyboard={true}
                slidesPerView={1}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                watchOverflow={true}
                allowSlideNext={true}
                allowSlidePrev={true}
                className="my-swiper"
            >
                {stay.imgUrls && stay.imgUrls.length > 0 ? (
                    stay.imgUrls.map((imgSrc, index) => (
                        <SwiperSlide key={index}>
                            <img src={imgSrc} alt={`Stay ${index + 1}`} />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <img src={image} alt="Placeholder Image" />
                    </SwiperSlide>
                )}
            </Swiper>

            <img src="https://res.cloudinary.com/dswenk4wc/image/upload/v1739610424/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiB_1_p4bb2a.svg" alt="" className="heart-img" />
            <div className="preview-text-par">
            <p 
    className={`preview-text-bold preview-text-first ${isLong ? 'smaller-text' : ''}`}>{address}</p>
                <p className="gray">{stay?.loc?.city}</p>
                <p className="preview-date gray">1-6 May</p>
                <p className="preview-text-last"><span className="preview-text-bold">${stay.price}</span> night</p>
            </div>
            <div className="rating">
                <img src="https://res.cloudinary.com/du312ufuo/image/upload/v1739453965/asset_23_rlrre4.svg" alt="" />
                {/* <span className="rating-text">{(Math.random() * 4 + 1).toFixed(2)}</span> */}
                <span className="rating-text">5.0</span>
            </div>
        </section>
    )
}





