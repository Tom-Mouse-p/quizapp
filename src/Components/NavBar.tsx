import { Link, useLocation } from "react-router-dom";
import "../assets/componentStyles/navbar.css";

import { quizInfo } from "../Pages/quiz";

function NavBar() {
    const location = useLocation();
    return (
        <div id="topContainer">
            <div id="navBarContainer">
                <p id="navTitle">Quizzo</p>
                <nav id="navBar">
                    <ul>
                        <Link to="/">
                            <li>Home</li>
                        </Link>

                        <Link to="#" className="buttonPrimary">
                            <li>Login</li>
                        </Link>
                    </ul>
                </nav>
            </div>
            {location.pathname == "/quiz" ? (
                <div className="quizTitle">
                    <h3>{quizInfo.value.title}</h3>
                    <span className="questionCounter">
                        {quizInfo.value.currentIndex + 1}/{quizInfo.value.total}
                    </span>
                </div>
            ) : null}
        </div>
    );
}

export default NavBar;
