import { listIcon, gridIcon } from "../Icons/IconList";
import styles from "./listCalendarToggler.module.css";

const ListCalendarToggler = ({ view, handleChangeView }) => {
  return (
    <div
      className={styles.Toggler}
      type="radio"
      name="options"
      defaultValue={view}
      onChange={handleChangeView}
    >
      {view == 1 ? (
        <button className={"Btn BtnInfo " + styles.BtnInfo} value={1}>
          {listIcon}
        </button>
      ) : (
        <button
          onClick={() => handleChangeView(1)}
          className={"Btn BtnLink " + styles.BtnLink}
        >
          {listIcon}
        </button>
      )}
      {view == 2 ? (
        <button className={"Btn BtnInfo " + styles.BtnInfo} value={2}>
          {gridIcon}
        </button>
      ) : (
        <button
          onClick={() => handleChangeView(2)}
          className={"Btn BtnLink " + styles.BtnLink}
        >
          {gridIcon}
        </button>
      )}
    </div>
  );
};

export default ListCalendarToggler;
