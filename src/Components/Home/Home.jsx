import jobsData from "../../jobsData"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";


export default function Home(){
    const jobs = jobsData;
    return(
        <Box sx={{textAlign: 'center', display: 'flex', flexDirection: 'column',alignItems: 'center', justifyContent: 'center'}}>

             <img width="200px" height="130px" src="https://citysight.com.au/wp-content/uploads/2020/11/400dpiLogo-JPG-1024x619.jpg" alt="logo" />

        <Link style={{ textDecoration: 'none' }} to="/all/jobs">
            <Box sx={{ borderRadius: '9px', bgcolor: '#3D3D96', '&:hover': { bgcolor: '#15155A'}, my: 1, py: 5, width: 300}}>
            <Typography sx={{fontWeight: 'bold', fontSize: '3.5rem', color: 'white'}}>
                 {jobs.length}
            </Typography>
            <Typography sx={{ fontSize: '25px', color: 'white'}}>
                 Today's Job
            </Typography>
             </Box>
        </Link>
        
        <Box sx={{ borderRadius: '9px', bgcolor: '#4383BB','&:hover': { bgcolor: '#104069'}, my: 3, py: 5, width: 300}}>
            <Typography sx={{fontWeight: 'bold', fontSize: '3.5rem', color: 'white'}}>
                 {jobs.length}
            </Typography>
            <Typography sx={{fontSize: '25px', color: 'white'}}>
                 This Week's Jobs
            </Typography>
        </Box>
        </Box>
    )
}