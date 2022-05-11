import jobsData from "../../jobsData"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";


export default function Home(){
    const jobs = jobsData;
    return(
        <Box sx={{textAlign: 'center', display: 'flex', flexDirection: 'column',alignItems: 'center', justifyContent: 'center'}}>

        <Link style={{ textDecoration: 'none' }} to="/all/jobs">
            <Box sx={{border: '2px solid black', borderRadius: '9px', bgcolor: '#ebe8e8', my: 3, py: 3, width: 300}}>
            <Typography sx={{fontWeight: 'bold', fontSize: '35px', color: '#32a848'}}>
                 {jobs.length}
            </Typography>
            <Typography sx={{fontWeight: 'bold', fontSize: '25px', color: 'black'}}>
                 Today's Job
            </Typography>
             </Box>
        </Link>
        
        <Box sx={{border: '2px solid black', borderRadius: '9px', bgcolor: '#ebe8e8', my: 3, py: 3, width: 300}}>
            <Typography sx={{fontWeight: 'bold', fontSize: '35px', color: '#32a848'}}>
                 {jobs.length}
            </Typography>
            <Typography sx={{fontWeight: 'bold', fontSize: '25px'}}>
                 This Week's Jobs
            </Typography>
        </Box>
        </Box>
    )
}