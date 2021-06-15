import {Component} from "react"
import styles from "./dropdownFilter.module.css"
class DateFilter extends Component  {
    render(){
        return(
        <div className="FormGroup">
            <label className={styles.FormLabel}>Date Filter</label>
            <select className={styles.FormSelect}>
                <option>Today</option>
                <option>Yesterday</option>
                <option>Past 7 days</option>
                <option>This month</option>
                <option>This year</option>
            </select>
        </div>
        )
    }
}

class EventTypeFilter extends Component  {
    render(){
        return(
        <div className="FormGroup">
            <label className={styles.FormLabel}>Event Type Filter</label>
            <select className={styles.FormSelect}>
                <option>Meeting</option>
                <option>Lunch</option>
                <option>Random</option>
                <option>Etc</option>
            </select>
        </div>
        )
    }
}



export {DateFilter, EventTypeFilter}
export default Component