import EventTypeToggler from "../eventTypeToggler/EventTypeToggler";
import ViewController from "../ViewController";
import ListCalendarToggler from "../listCalendarToggler/ListCalendarToggler";
import styles from "./contentContainer.module.css";

const ContentContainer = ({
  eventType,
  view,
  data,
  handleChangeView,
  errMess,
  fetchData,
  isLoading,
  toggleEventType,
}) => {
  return (
    <>
      {/* Togglers */}
      <div className={styles.Togglers}>
        <EventTypeToggler
          eventType={eventType}
          fetchData={fetchData}
          toggleEventType={toggleEventType}
        />
        <ListCalendarToggler view={view} handleChangeView={handleChangeView} />
      </div>

      {/* Main controller. Outputs the selected view with associated data */}
      <ViewController
        view={view}
        data={data}
        isLoading={isLoading}
        errMess={errMess}
      />
    </>
  );
};
export default ContentContainer;
