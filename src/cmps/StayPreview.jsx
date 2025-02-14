import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import image from '../assets/img/image.avif'
// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules"

export function StayPreview({ stay }) {
    const swiperRef = useRef(null) // Create a reference for Swiper

    function stopPropagation(event) {
        event.stopPropagation() // Prevents click event from bubbling up
    }

    useEffect(() => {
        const waitForSwiper = async () => {
            // Wait until Swiper initializes and buttons are available
            while (swiperRef.current?.swiper?.navigation?.nextEl === null) {
                await new Promise(resolve => setTimeout(resolve, 100)) // Wait 100ms before checking again
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

    return (
        <article className="preview">
            <Swiper
                ref={swiperRef} 
                cssMode={true}
                navigation={{hideOnClick: false}}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                slidesPerView={1}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                watchOverflow={true}
                allowSlideNext={true} 
                allowSlidePrev={true}
                className="mySwiper"
            >
                <SwiperSlide><img src={image} alt="Stay 1" /></SwiperSlide>
                <SwiperSlide><img src={image} alt="Stay 2" /></SwiperSlide>
                <SwiperSlide><img src={image} alt="Stay 3" /></SwiperSlide>
            </Swiper>

            <section className="preview-text">
                <div>
                    {stay?.host && (
                        <p>
                            Hosted by: <span>{stay.host.fullname}</span>
                        </p>
                    )}
                    <p>Lorem ipsum dolor sit.</p>
                    <p>Lorem ipsum dolor sit.</p>
                    <p>
                        Price: <span>${stay?.price || "N/A"}</span>
                    </p>
                </div>
                <div className="rating">
                    <img src="https://res.cloudinary.com/du312ufuo/image/upload/v1739453965/asset_23_rlrre4.svg" alt="" />
                    5
                </div>
            </section>
        </article>
    )
}





