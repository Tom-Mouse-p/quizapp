import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/home";
import Quiz from "./Pages/quiz";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
            </Routes>
            <div className="gradient"></div>
            <div className="gradient2"></div>
        </>
    );
}

export default App;
