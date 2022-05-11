import jobsData from "../../jobsData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function AllJobs() {
  const jobs = jobsData;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column',alignItems: 'center', justifyContent: 'center', mx: 2 }}>
    
     <img width="200px" height="130px" src="https://citysight.com.au/wp-content/uploads/2020/11/400dpiLogo-JPG-1024x619.jpg" alt="logo" />
     <Box sx={{display: 'flex', width: { xs: 300, sm: 360} }}>

       <Link to="/"> <ArrowBackIcon sx={{fontSize: {xs:"32px", sm:"34px"}, mt: 0.8, color: '#535353'}}/> </Link>
        <Typography
          sx={{ ml: {xs: 5, sm: 7}, color: '#535353', fontWeight: "bold", fontSize: {xs:"28px", sm:"30px"} }}
        >
          Today's Job
        </Typography>
      </Box>

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
            borderRadius: "9px",
            bgcolor: "#F6F4FF",
            my: 1.3,
            py: 3,
            px: 1,
            width: { xs: 280, sm: 360},
          }}
        >
          <Box sx={{mx: 4}}>
          <Typography sx={{ color: '#535353', fontSize: "15px" }}>
            Site Name
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {xs: '20px', sm:"25px"},
              color: "black",
            }}
          >
            {job.name}
          </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Link style={{ textDecoration: 'none' }} to={`/job/${job.id}`}>
            <Button
              sx={{ width: {xs: 250, sm: 298}, mt: 2,  bgcolor: job.startStatus ? '#f73123' : '#3D3D96', '&:hover': {bgcolor: job.startStatus ? '#f73123' : '#3D3D96'}}}
              variant="contained"
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
