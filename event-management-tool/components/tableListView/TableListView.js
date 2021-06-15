import TableContainer from "./Table"
import { format} from 'date-fns'
import Loading from "../loading/Loading"
import Error from "../error/Error"

const getData = row => {
    return {
        start: format(new Date(row.start),'Pp'), speaker: row.speaker,
        title: row.title,status: row.status, 
         city:row.city, state:row.state,
        }
}

const ListView =  ({data, errMess, isLoading}) =>  {
    if (errMess) return <Error errMess={errMess} />
    else if (isLoading) return <Loading />
    else if (data){
        const listData = data.map(row => getData(row))
        return <TableContainer  serverData={listData} />
    }
}

export default ListView