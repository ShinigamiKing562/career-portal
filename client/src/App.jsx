import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
import Careers from "@/features/careers/pages/Careers";
import JobDetails from "@/features/careers/pages/JobDetails";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Careers />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
