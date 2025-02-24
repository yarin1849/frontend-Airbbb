import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import debounce from 'lodash/debounce'
import { categories } from '../services/util.service'
import { stayService } from "../services/stay"

import { useSearchParams } from 'react-router-dom'
export function StayFilter({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(stayService.getDefaultFilter())
    const [selectedFilter, setSelectedFilter] = useState(null) // Track selected filter
    const scrollRef = useRef(null)
    const rightBtn = useRef(null)
    const leftBtn = useRef(null)
    const [currentScroll, setCurrentScroll] = useState(0)
    const [itemsPerScroll, setItemsPerScroll] = useState(17)
    const [scrollAmount, setScrollAmount] = useState(992)
    const totalScrolls = Math.ceil(categories.length / itemsPerScroll)
    const [searchParams, setSearchParams] = useSearchParams()

    const updateItemsPerScroll = () => {
        const screenWidth = window.innerWidth

        // // Example screen width adjustments
        // if (screenWidth < 600) {
        //     setItemsPerScroll(5)
        //     setScrollAmount(440)
        // } else if (screenWidth < 900) {
        //     setItemsPerScroll(10)
        //     setScrollAmount(740)
        // } else if (screenWidth < 1500) {
        //     setItemsPerScroll(20)
        //     setScrollAmount(1340)
        // } else {
        //     setItemsPerScroll(28)
        //     setScrollAmount(1400)
        // }
    }

    useEffect(() => {
        const handleResize = debounce(() => {
            updateItemsPerScroll()
        }, 200)

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const scroll = (direction) => {
        const filterBar = scrollRef.current
        if (!filterBar) return

        const isRight = direction === "right"
        if ((isRight && currentScroll >= totalScrolls - 1) || (!isRight && currentScroll <= 0)) return

        const offset = isRight ? -scrollAmount : scrollAmount
        filterBar.style.transition = "transform 0.8s ease-in-out"
        filterBar.style.transform = `translateX(${offset}px)`

        setTimeout(() => {
            setCurrentScroll(prev => prev + (isRight ? 1 : -1))
            filterBar.style.transition = "none"
            filterBar.style.transform = "translateX(0)"
        }, 500)
    }

    const visibleFilters = categories.slice(
        currentScroll * itemsPerScroll,
        (currentScroll + 1) * itemsPerScroll
    )

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    function onSetFilter(filterName) {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('type', filterName); // Update filter type
            return newParams;
        });
    
        // Merge existing search params with the new filter type
        setFilterToEdit(prevFilter => {
            const updatedFilter = { ...prevFilter, type: filterName };
    
            // Merge search params into the filter object
            for (const [key, value] of searchParams.entries()) {
                updatedFilter[key] = value;
            }
    
            return updatedFilter;
        });
    
        setSelectedFilter(filterName);
    }
    

    return (
            <section style={{ display: "flex", justifyContent: "space-between" }} className="stay-filter">
                <div className="icon-filter">
                    {/* Left Arrow Button */}
                    {currentScroll > 0 && (
                        <button className="left-arrow btn" ref={leftBtn} onClick={() => scroll("left")}>
                            <ChevronLeft size={18} style={{ transform: "translate(-20.6%, 1.5%)" }} />
                        </button>)}

                    <div ref={scrollRef} className="filter-bar">
                        {/* Render visible filters */}
                        {visibleFilters.map((filter, index) => (
                            <button
                                key={index}
                                className={`filter-icon ${selectedFilter === filter.name ? "selected" : ""}`}
                                onClick={() => onSetFilter(filter.name)}
                            >
                                <img src={filter.src} alt={filter.name} className="w-6 h-6" />
                                <span className="icon-name">{filter.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right Arrow Button */}
                    {currentScroll < totalScrolls - 1 &&
                        (<button className="right-arrow btn" ref={rightBtn} onClick={() => scroll("right")}>
                            <ChevronRight size={18} style={{ transform: "translate(-20.6%, 1.5%)" }} />
                        </button>)}
                </div>

                <button className="filter-btn">
                    <img src="https://res.cloudinary.com/dswenk4wc/image/upload/v1739776625/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImRpc3BsYXk6YmxvY2s7ZmlsbDpub25lO2hlaWdodDoxNnB4O3dpZHRoOjE2cHg7c3Ryb2tlOmN1cnJlbnRDb2xvcjtzdHJva2Utd2lkdGg6Mzt_adziw5.svg" alt="" />
                    Filters
                </button>
            </section>
    )
}
