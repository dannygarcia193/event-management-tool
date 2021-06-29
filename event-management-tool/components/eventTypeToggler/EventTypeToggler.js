import styles from "./eventTypeToggler.module.css";
import React from "react";

const ToggleButtons = ({
  eventType,
  items,
  toggleEventType,
  setCurrentValue,
  currentValue,
  fetchData,
}) => {
  return items.map((item, idx) => {
    const currId = idx + 1;

    function resolveAfter2Seconds(currId) {
      return new Promise((resolve) => {
        setCurrentValue(currId);
        resolve(toggleEventType(currId));
      });
    }

    async function sequentialStart(currId) {
      await resolveAfter2Seconds(currId);
      fetchData();
    }
    const ButtonType = () =>
      eventType === currId ? (
        <button
          onClick={() => toggleEventType(currId)}
          className={"Btn BtnPrimary " + styles.BtnPrimary}
          as="label"
          htmlFor="option2"
        >
          {item}
        </button>
      ) : (
        <button
          onClick={() => {
            sequentialStart(currId);
          }}
          className={"Btn BtnLink " + styles.BtnLink}
        >
          {item}
        </button>
      );
    return (
      <div key={idx}>
        <input
          className={styles.RadioButton}
          value={currId}
          type="radio"
          name="options"
          id="option1"
          autoComplete="off"
          checked={eventType === currId ? true : false}
          onChange={() => setCurrentValue(id)}
        />
        <ButtonType />
      </div>
    );
  });
};

const EventTypeToggler = ({ eventType, fetchData, toggleEventType }) => {
  const [currentValue, setCurrentValue] = React.useState(1);
  const items = ["Upcoming Events", "Past Events", "All Events"];

  return (
    <div
      id="eventType"
      className={styles.BtnGroup}
      role="group"
      aria-label="Basic radio toggle button group"
      value={currentValue}
      onChange={fetchData}
    >
      <ToggleButtons
        eventType={eventType}
        items={items}
        toggleEventType={toggleEventType}
        setCurrentValue={setCurrentValue}
        currentValue={currentValue}
        fetchData={fetchData}
      />
    </div>
  );
};
export default EventTypeToggler;
