
import TableListView from "./tableListView/TableListView"
import CardView from "./cardView/CardView"

const ViewController = ({view,data, errMess, isLoading }) => {
      if (view===1){
        return <TableListView data={data}  errMess={errMess} isLoading={isLoading} />
      }else if(view===2){
        return <CardView data={data}  errMess={errMess} isLoading={isLoading} />
      }
  }
  
  
export default ViewController