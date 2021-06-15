const placeholder = ''
const classNames = ["bi-trash-fill","bi-pencil-square","bi-plus-lg", "bi-list-ul", "bi-calendar-fill", 
"bi-funnel-fill", "bi-house-fill", "bi-wrench","bi-grid-fill", "bi-clock-fill","bi-map-fill",
"bi-bar-chart-fill","bi-search"]

const [faTrash,faEdit,faPlus, faList, faCalendar,faFilter,
    faHome,  faWrench, faGrid, faClock, faMapMarker,
    faChartBar, faSearch] = classNames.map(icon => <i className={icon} role="img" aria-label="GitHub" />) 

export  {faTrash,faEdit,faPlus, faList, faCalendar,faFilter,faHome,
    faWrench, faGrid, faClock, faMapMarker,faChartBar, faSearch} 
export default placeholder