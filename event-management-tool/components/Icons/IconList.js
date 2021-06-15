
import * as I from './Icons' 
import styles from "./Icon.module.css"

// Create, Update, Delete, and Filter Icons
const defaultPlaceholder = ''

const iconList = [I.faEdit, I.faTrash, I.faPlus, I.faList,I.faCalendar, I.faFilter, I.faGrid, I.faSearch]
const [editIcon, trashIcon, plusIcon, listIcon, calendarIcon, filterIcon, gridIcon, searchIcon] = iconList.map(icon => icon)


const cardIconList = [I.faClock, I.faMapMarker, I.faChartBar]
const [clockIcon, mapMarkerIcon, chartIcon] = cardIconList.map(icon => icon)

const headIcons = [I.faHome, I.faCalendar, I.faWrench]
const [homeIcon, calendarIcon2, settingsIcon] = headIcons.map(icon => {
    return <a className={styles.Icon} href="/">{icon}</a>
})

export {editIcon, trashIcon, plusIcon, listIcon, calendarIcon,
     filterIcon, gridIcon, homeIcon, calendarIcon2, settingsIcon,
     clockIcon, mapMarkerIcon, chartIcon, searchIcon
    }
export default defaultPlaceholder
