import Home from "./Components/Home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AllJobs from "./Components/AllJobs/AllJobs";
import StartEndJob from "./Components/StartEndJob/StartEndJob";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="all/jobs" element={<AllJobs />} />
      <Route path="job/:id" element={<StartEndJob />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
