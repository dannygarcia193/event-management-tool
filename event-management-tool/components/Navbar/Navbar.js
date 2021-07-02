import { homeIcon, settingsIcon, calendarIcon2 } from "../Icons/IconList";
import styles from "./Navbar.module.css";
import { theme } from "../../styles/theme";

const navCSS = { ...theme().space.py(0), ...theme().space.my(1) };

const Navbar = () => {
  return (
    <nav className={styles.Nav}>
      <div className={styles.NavContainer + " row"} style={navCSS}>
        <div className={styles.LinksContainer}>
          {homeIcon} {calendarIcon2} {settingsIcon}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
