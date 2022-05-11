import jobsData from "../../jobsData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function AllJobs() {
  const jobs = jobsData;
  return (
    <Box sx={{ my: 3 }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "35px" }}
      >
        Today's Job
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
        {
            jobs.map((job)=>(
                <Box
          sx={{
            border: "2px solid black",
            borderRadius: "9px",
            bgcolor: "#ebe8e8",
            my: 3,
            py: 3,
            width: 360,
          }}
        >
          <Typography sx={{ ml: 3, fontWeight: "bold", fontSize: "15px" }}>
            Site Name
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
              color: "black",
            }}
          >
            {job.name}
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Link style={{ textDecoration: 'none' }} to={`/job/${job.id}`}>
            <Button
              sx={{ width: 300, my: 2,  bgcolor: '#20bd2d'}}
              variant="contained"
              color="success"
            >
              {job.startStatus ? 'End Job' : 'Start'}
            </Button>
            </Link>
          </Box>
        </Box>
            ))
        }
       
      </Box>
    </Box>
  );
}
