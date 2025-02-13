import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import debounce from 'lodash/debounce'
import { categories } from '../services/util.service'

export function StayFilter() {
    const scrollRef = useRef(null)
    const rightBtn = useRef(null)
    const leftBtn = useRef(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(25)
    const [scrollAmount, setScrollAmount] = useState(992)
    // const scrollAmount = 992 
    const totalPages = Math.ceil(categories.length / itemsPerPage)


    const updateItemsPerPage = () => {
        const screenWidth = window.innerWidth

        if (screenWidth < 600) {
            setItemsPerPage(5)
            setScrollAmount(440)
        } else if (screenWidth < 900) {
            setItemsPerPage(10)
            setScrollAmount(740)
        } else if (screenWidth < 1500) {
            setItemsPerPage(20)
            setScrollAmount(1340)
        } else {
            setItemsPerPage(28)
            setScrollAmount(1400)
        }
    }

    
    useEffect(() => {
        const handleResize = debounce(() => {
          updateItemsPerPage()
        }, 200)
      
        window.addEventListener("resize", handleResize)
      
        return () => {
          window.removeEventListener("resize", handleResize)
        }
      }, [])

    const scroll = (direction) => {

        const filterBar = scrollRef.current
        if (filterBar) {

            if (direction === "right" && currentPage < totalPages - 1) {

                // Slide the page out to the left and then slide the next one in
                filterBar.style.transition = "transform 0.8s ease-in-out"
                filterBar.style.transform = `translateX(-${scrollAmount}px)`


                // After the animation completes, change the page
                setTimeout(() => {
                    setCurrentPage(currentPage + 1)
                    filterBar.style.transition = "none"
                    filterBar.style.transform = `translateX(0)`
                }, 500)
            }

            if (direction === "left" && currentPage > 0) {
                // Slide the page out to the right and then slide the previous one in
                filterBar.style.transition = "transform 0.8s ease-in-out"
                filterBar.style.transform = `translateX(${scrollAmount}px)`

                // After the animation completes, change the page
                setTimeout(() => {
                    setCurrentPage(currentPage - 1)
                    filterBar.style.transition = "none"
                    filterBar.style.transform = `translateX(0)`
                }, 500)
            }
        }
    }

    const visibleFilters = categories.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )
    return (
        <div className="stay-filter">
            {/* Left Arrow Button */}
            {currentPage > 0 && (
                <button className="left-arrow button" ref={leftBtn} onClick={() => scroll("left")}>
                <ChevronLeft size={15} style={{transform: "translate(-36.5%, -16%)"}}/>
            </button>)}
            <div ref={scrollRef} className="filter-bar" style={{ display: 'flex', overflowX: 'hidden' }}>

                {/* Render visible filters */}
                {visibleFilters.map((filter, index) => (
                    <button key={index} className="filter-icon">
                        <img src={filter.src} alt={filter.name} className="w-6 h-6" />
                        <span>{filter.name}</span>
                    </button>
                ))}

            </div>
            {/* Right Arrow Button */}
            {currentPage < totalPages - 1 && 
            (<button className="right-arrow button" ref={rightBtn} onClick={() => scroll("right")}>
                <ChevronRight size={15} style={{transform: "translate(-36.5%, -16%)"}}/>
            </button>)}
        </div>
    )
}