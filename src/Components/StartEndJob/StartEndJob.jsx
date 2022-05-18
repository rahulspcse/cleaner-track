import { useParams } from "react-router-dom";
import jobsData from "../../jobsData";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createRef, useContext, useEffect, useState } from "react";
import moment from "moment";
import useGeoLocation from "../useGeoLocation";
import { JobsContext } from "../../App";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

export default function StartEndJob() {
  const [data, setData] = useContext(JobsContext);
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();
  let fileRef = createRef();
  const { id } = useParams();
  const job = data.find((item) => item.id == id);

  const click = (e) => {
    // console.log(e)
    fileRef.current.click();
  };

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
  };

  const [startJobDetails, setStartJobDetails] = useState({
    startTime: "",
    location: "",
  });

  const startJobSubmit = () => {
    const startCurrentLocation = location;
    const newObj = {};
    newObj.location = startCurrentLocation;
    newObj.startTime = moment().format("DD-MM-YYYY h:mm:ss a");
    job.startDetails = newObj;
    job.status = true;
    const temp_data = data.filter((item) => item.id != id);
    setData([...temp_data, job]);
    setStartJobDetails(newObj);
  };

  const [endJobDetails, setEndJobDetails] = useState({
    endTime: "",
    location: "",
  });

  const [totalTime, setTotalTime] = useState();

  const endJobSubmit = () => {
    const endCurrentLocation = location;
    const newObj = {};
    newObj.location = endCurrentLocation;
    newObj.endTime = moment().format("DD-MM-YYYY h:mm:ss a");
    const tempObj = moment.duration(
      moment(newObj.endTime, "DD-MM-YYYY h:mm:ss a").diff(
        moment(job.startDetails.startTime, "DD-MM-YYYY h:mm:ss a").format()
      )
    )._data;
    const temp_total = `${tempObj.hours} hours ${tempObj.minutes} minutes ${tempObj.seconds} seconds`;
    job.endDetails = newObj;
    job.totalTime = temp_total;
    job.status = "completed";
    const temp_data = data.filter((item) => item.id != id);
    setData([...temp_data, job]);
    setTotalTime(temp_total);
    setEndJobDetails(newObj);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "black",
        height: "100vh",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "35px",
          my: 4,
          color: "#ffffff",
        }}
      >
        {job.name}
      </Typography>

      {/* <Box sx={{ mx: 'auto',mt: 1, width: 300, height: 399 }}>
        <InputLabel sx={{ fontSize: 18, fontWeight: 'bold', my: 1 }} id="demo-simple-select-label">Site Latitude</InputLabel>
        <TextField defaultValue={value.lat} onChange={(e) => setValue({ ...value, lat: parseFloat(e.target.value) })} size="small" id="outlined-basic" placeholder='Latitude' variant="outlined" />
        <InputLabel sx={{ fontSize: 18, fontWeight: 'bold', my: 1 }} id="demo-simple-select-label">Site Langitude</InputLabel>
        <TextField defaultValue={value.lng} onChange={(e) => setValue({ ...value, lng: parseFloat(e.target.value) })} size="small" id="outlined-basic" placeholder='Langitude' variant="outlined" />
        <InputLabel sx={{ fontSize: 18, fontWeight: 'bold', my: 1 }} id="demo-simple-select-label">Distance</InputLabel>
        <TextField defaultValue={value.distance} sx={{ mb: 2 }} onChange={(e) => setValue({ ...value, distance: parseFloat(e.target.value) })} size="small" id="outlined-basic" placeholder='Distance' variant="outlined" />
        <br />
        <Button sx={{my: 2}} onClick={handleCheck} variant="contained">Submit</Button>
        <h3>Output: {difference}</h3>
      </Box> */}
      {!file && (
        <CameraAltOutlinedIcon
          sx={{
            color: "#ffffff",
            fontSize: "40px",
            "&:hover": { cursor: "pointer" },
          }}
          onClick={(e) => click(e)}
        />
      )}
      <input
        style={{ display: "none" }}
        ref={fileRef}
        type="file"
        onChange={(e) => handlePreview(e)}
      />
      {file && (
        <img
          style={{
            objectFit: "contain",
            marginBottom: "30px",
            height: "300px",
            width: "350px",
          }}
          src={preview}
        />
      )}
      {file && (
        <Button
          sx={{
            width: 150,
            my: 2,
            bgcolor: "#4383BB",
            "&:hover": { bgcolor: "#4383BB" },
          }}
          variant="contained"
          color="success"
          onClick={(e) => click(e)}
        >
          Retake Photo
        </Button>
      )}

      {job.status ? (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            my: 2,
            color: "#ffffff",
          }}
        >
          Take a snap or upload an image then End the job
        </Typography>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            my: 2,
            color: "#ffffff",
          }}
        >
          Take a snap or upload an image then Start the job
        </Typography>
      )}

      {!result && (
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: { xs: "14px", sm: "20px" },
            color: "red",
            my: 4,
          }}
        >
          You need to be in the site before starting a job
        </Typography>
      )}

      {result ? (
        job.status == false ? (
          <Button
            sx={{
              width: 250,
              mb: 2,
              bgcolor: "#3D3D96",
              "&:hover": { bgcolor: "#3D3D96" },
            }}
            variant="contained"
            color="success"
            onClick={startJobSubmit}
          >
            Start Job
          </Button>
        ) : (
          <Button
            sx={{
              width: 250,
              mb: 2,
              bgcolor: "#C74F4F",
              "&:hover": { bgcolor: "#C74F4F" },
            }}
            variant="contained"
            color="success"
            onClick={endJobSubmit}
          >
            End Job
          </Button>
        )
      ) : (
        <></>
      )}

      {/* 
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

        {
        endJobDetails.location ?
        <Box sx={{m: 5}}>
            <h3>End Job:</h3>
            <h5>Lat: {location.coordinates.lat} Lan: {location.coordinates.lan}</h5>
            <h6>End Time: {endJobDetails.endTime}</h6>
            <h6>Total Time: {totalTime}</h6>

        </Box>
        :
        <></>
        } */}
    </Box>
  );
}
