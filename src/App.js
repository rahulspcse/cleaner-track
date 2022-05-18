import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllJobs from "./Components/AllJobs/AllJobs";
import StartEndJob from "./Components/StartEndJob/StartEndJob";
import { createContext, useState } from "react";
import jobsData from "./jobsData";
import JobHistory from "./Components/JobHistory/JobHistory";

export const JobsContext = createContext();

function App() {

  const [data, setData] = useState(jobsData);

  return (
    <JobsContext.Provider value={[data, setData]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="all/jobs" element={<AllJobs />} />
          <Route path="job/:id" element={<StartEndJob />} />
          <Route path="job/completed/:id" element={<JobHistory />} />
        </Routes>
      </BrowserRouter>
    </JobsContext.Provider>
  );
}

export default App;
