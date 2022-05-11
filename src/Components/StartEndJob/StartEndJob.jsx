import { useParams } from "react-router-dom";
import jobsData from "../../jobsData";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import useGeoLocation from "../useGeoLocation";

export default function StartEndJob() {
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();
  const { id } = useParams();
  const data = jobsData;
  const job = data.find((item) => item.id == id);

  const handlePreview = (e) => {
    setFile(e.target.files);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  
  const location = useGeoLocation();
  const [value, setValue] = useState({ 
    lat: 22.33895932186688,
    lng: 91.84356541651367,
    distance: 500,
  });
  const [difference, setDifference] = useState("");

  const [result, setResult] = useState();

 
  useEffect(() => {
    if (location.loaded && location.coordinates) {
      const center = new window.google.maps.LatLng(value.lat, value.lng);

      const to = new window.google.maps.LatLng(
        location.coordinates.lat,
        location.coordinates.lan
      );
      const contains =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          center,
          to
        ) <= value.distance;

      const actualDifference =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          center,
          to
        );

      setDifference(actualDifference);

      if (contains) {
        setResult(true);
      } else {
        setResult(false);
      }
    }
  }, [location]);


  const handleCheck = () => {

    if (location.loaded && location.coordinates) {
      const center = new window.google.maps.LatLng(value.lat, value.lng);

      const to = new window.google.maps.LatLng(
        location.coordinates.lat,
        location.coordinates.lan
      );
      const contains =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          center,
          to
        ) <= value.distance;

      const actualDifference =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          center,
          to
        );

      setDifference(actualDifference);

      if (contains) {
        setResult(true);
      } else {
        setResult(false);
      }
    }
  }
 
  const [startJobDetails, setStartJobDetails]= useState(
    {
      startTime: '',
      location: '',
    }
  );

  const startJobSubmit=()=>{
    const startCurrentLocation = location;
    const newObj = {};
    newObj.location= startCurrentLocation;
    newObj.startTime= moment().format('DD-MM-YYYY h:mm:ss a');
    setStartJobDetails(newObj);
  }

  const [endJobDetails, setEndJobDetails]= useState(
    {
      endTime: '',
      location: '',
    }
  );

  const [totalTime, setTotalTime]= useState();

  const endJobSubmit=()=>{
    const endCurrentLocation = location;
    const newObj = {};
    newObj.location= endCurrentLocation;
    newObj.endTime= moment().format('DD-MM-YYYY h:mm:ss a');
    const tempObj= moment.duration(moment(newObj.endTime).diff(moment(startJobDetails.startTime)))._data;
    const temp_total= `${tempObj.hours} hours ${tempObj.minutes} minutes ${tempObj.seconds} seconds`
    setTotalTime(temp_total);
    setEndJobDetails(newObj);
  }


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "35px",
          my: 4,
        }}
      >
        {job.name}
      </Typography>

      <Box sx={{ mx: 'auto',mt: 1, width: 300, height: 399 }}>
        <InputLabel sx={{ fontSize: 18, fontWeight: 'bold', my: 1 }} id="demo-simple-select-label">Site Latitude</InputLabel>
        <TextField defaultValue={value.lat} onChange={(e) => setValue({ ...value, lat: parseFloat(e.target.value) })} size="small" id="outlined-basic" placeholder='Latitude' variant="outlined" />
        <InputLabel sx={{ fontSize: 18, fontWeight: 'bold', my: 1 }} id="demo-simple-select-label">Site Langitude</InputLabel>
        <TextField defaultValue={value.lng} onChange={(e) => setValue({ ...value, lng: parseFloat(e.target.value) })} size="small" id="outlined-basic" placeholder='Langitude' variant="outlined" />
        <InputLabel sx={{ fontSize: 18, fontWeight: 'bold', my: 1 }} id="demo-simple-select-label">Distance</InputLabel>
        <TextField defaultValue={value.distance} sx={{ mb: 2 }} onChange={(e) => setValue({ ...value, distance: parseFloat(e.target.value) })} size="small" id="outlined-basic" placeholder='Distance' variant="outlined" />
        <br />
        <Button sx={{my: 2}} onClick={handleCheck} variant="contained">Submit</Button>
        <h3>Output: {difference}</h3>
      </Box>

      <input type="file" onChange={(e) => handlePreview(e)} />
      <img style={{marginTop: '20px', height: '300px', width: '350px'}} src={preview} />

      { 
      result ? 
            <Button
            sx={{ width: 150, my: 2, bgcolor: '#20bd2d' }}
            variant="contained"
            color="success"
            onClick={startJobSubmit}
            >
            {job.startStatus ? 'End Job' : 'Start Job'}
            </Button>
        :
        <></>
        
      }

        {
        startJobDetails.location ?
        <Box sx={{m:5}}>
            <h3>Start Job:</h3>
            <h5>Lat: {location.coordinates.lat} Lan: {location.coordinates.lan}</h5>
            <h6>Start Time: {startJobDetails.startTime}</h6>
        </Box>
        :
        <></>
        }
      
    </Box>
  );
}
