import { Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { EventPage } from "./pages/EventPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/event" element={<EventPage />} />
    </Routes>
  );
}
