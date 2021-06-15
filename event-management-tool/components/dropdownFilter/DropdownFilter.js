import {DateFilter, EventTypeFilter} from "./SubFilters"
import styles from "./dropdownFilter.module.css"
import {filterIcon} from "../Icons/IconList"
import React, { useRef, useEffect } from "react";

const Actions = () => {
    return (
        <div className={"col-12 "+styles.Action}>
            <button className="Btn BtnLink"> Clear Filters </button>
            <button className="Btn BtnPrimary">Submit</button> 
        </div>
    )
}


 function closeOnClickOutside(ref, setDisplay) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setDisplay(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const DropdownFilter = () => {
    const [willDisplay, setDisplay] = React.useState(false)
    const show = willDisplay ? {display:"block"} : {display:'none'}

    const wrapperRef = useRef(null);
    closeOnClickOutside(wrapperRef, setDisplay);
    return (
        <div className={styles.Dropdown} id="dropdown">
            <button className={"Btn BtnSecondary "+ styles.DropdownToggle} onClick={() => setDisplay(!willDisplay)}>
                <span>{filterIcon}</span><span className={styles.FilterTitle}>Filter</span>
            </button>
            <div ref={willDisplay ? wrapperRef : null} className={styles.DropdownMenu} style={show}>
                <form>
                    <span><EventTypeFilter /></span>
                    <span><DateFilter/></span>
                    <hr/>
                    <span><Actions /></span>
                </form>
            </div>
        </div>
    )
}

export default DropdownFilter