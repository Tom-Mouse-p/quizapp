import { Link } from "react-router-dom";
import "../assets/pageStyles/home.css";

function Home() {
    return (
        <>
            <div className="hero">
                <div className="titleCard">
                    <span>
                        <h1>Brainstrome with Quizzo!</h1>
                        <div>
                            <Link to="/quiz">Play a Quiz</Link>
                        </div>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Home;
