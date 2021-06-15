import styles from './Navbar.module.css'
import {searchIcon} from "../Icons/IconList"
import { BtnSecondary } from "../GlobalStyles/Global"
const SearchBar = () => {
    return (
    <div className={styles.InputGroup} >
        <input className={styles.Input} type="text" placeholder="Search for an event"  aria-label="Search for an Event"/>
        <BtnSecondary>{searchIcon}</BtnSecondary>
    </ div>
    )
}

export default SearchBar