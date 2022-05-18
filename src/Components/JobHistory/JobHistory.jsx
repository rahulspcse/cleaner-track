import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useParams } from "react-router-dom";
import { JobsContext } from "../../App";
import { useContext } from "react";


export default function JobHistory(){
    const {id} = useParams();
    const [data, setData] = useContext(JobsContext);
    const job = data.find((item) => item.id == id);
    return(
        <>
        <Box sx={{ display: 'flex',width:'100%', flexDirection: 'column',mx: 'auto', justifyContent: 'center', my: 4}}>
            <Typography sx={{ml:2, fontSize: '16px', color: '#535353'}}>
                 Site Name <span style={{marginLeft: '5px', backgroundColor: '#4A934A', color: 'white', borderRadius: '6px', padding: '5px 10px'}}>Completed</span>
            </Typography>
            <Typography sx={{ml: 2,fontWeight: 'bold', fontSize: '24px', my: 2 }}>
                 {job.name}
            </Typography>
            <Typography sx={{px:2, py:1, fontWeight: 'bold',bgcolor:'#F5F3FF', fontSize: '20px', color: '#535353', mb: 2}}>
            Job Overview
            </Typography>
            <Typography sx={{ml:2, fontSize: '16px',  color: '#535353'}}>
                <span style={{fontWeight: 'bold', marginRight:'3px'}}>Start Time:</span>{job.startDetails.startTime}
            </Typography>
            <Typography sx={{ml:2, my:1, fontSize: '16px', color: '#535353'}}>
                <span style={{fontWeight: 'bold', marginRight:'3px'}}>End Time:</span>{job.endDetails.endTime}
            </Typography>
            <Typography sx={{ml:2, fontSize: '16px', color: '#535353'}}>
                <span style={{fontWeight: 'bold', marginRight:'3px'}}>Time spend:</span>{job.totalTime}
            </Typography>
        </Box>
        </>
    )
}