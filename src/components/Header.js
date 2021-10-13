import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faBars,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import logoIcon from "../assets/logo.png";
import appsIcon from "../assets/apps.png";

import SearchBar from "./SearchBar";
function Header({ handleVideoList, callAPI }) {
  return (
    <header>
      <div className="header_container container flex">
        <ul className="left_nav flex">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faBars} />
            </a>
          </li>

          <li>
            <a href="#" className="youtube-logo">
              <img src={logoIcon} alt="logo" />
            </a>
          </li>
        </ul>

        <SearchBar handleVideoList={handleVideoList} callAPI={callAPI} />

        <ul className="right_nav flex">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faVideo} />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={appsIcon} alt="logo" />
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faBell} />
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faUserCircle} size="lg" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
