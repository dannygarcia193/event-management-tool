import styles from "./header.module.css";
import { plusIcon } from "../Icons/IconList";

const Header = () => {
  return (
    <div className={"row " + styles.Header}>
      <div className="col-6">
        <h1>Your event list</h1>
      </div>
      <div className="col-6">
        <div className={styles.HeadingContainer}>
          <div className="Btn BtnPrimary">
            <span>{plusIcon}</span>
            <span>{" Create Event"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
