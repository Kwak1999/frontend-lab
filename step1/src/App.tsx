import { Routes, Route, Link } from "react-router-dom";
import ButtonPage from "./pages/ButtonPage";
import StorePage from "./pages/StorePage";
import FakeStorePage from "./pages/FakeStorePage.tsx";

function Home() {
    return (
        <div style={{ padding: 24 }}>
            <h1>Step1 Home</h1>
            <p>원하는 페이지로 이동하세요.</p>

            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <Link to="/button">
                    <button>Button Page</button>
                </Link>

                <Link to="/store">
                    <button>Store Page</button>
                </Link>

                <Link to="/fakeStore">
                    <button>Fake Store Page</button>
                </Link>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/button" element={<ButtonPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/fakeStore" element={<FakeStorePage />} />
        </Routes>
    );
}
