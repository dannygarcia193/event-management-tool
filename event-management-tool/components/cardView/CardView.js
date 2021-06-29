import { format } from "date-fns";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import CardContainer from "./CardContainer";

const getData = (row) => {
  return {
    id: row.id,
    date: format(new Date(row.start), "MMM d"),
    time: format(new Date(row.start), "p"),
    name: row.title,
    address: row.address,
    city: row.city,
    state: row.state,
    zip_code: row.zip_code,
  };
};

const CardView = ({ data, errMess, isLoading }) => {
  if (errMess) return <Error errMess={errMess} />;
  else if (isLoading) return <Loading />;
  else if (data) {
    const cardData = data.map((row) => getData(row));
    return <CardContainer cardData={cardData} />;
  }
};

export default CardView;
