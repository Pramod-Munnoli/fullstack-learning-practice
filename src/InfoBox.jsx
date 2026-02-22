import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './App.css'; 
import Thunderstormlcon from '@mui/icons-material/Thunderstorm' ;
import AcUnitIcon from '@mui/icons-material/AcUnit' ;
import WbSunnyIcon from '@mui/icons-material/WbSunny' ;
export default function Info({info}){
    const rainUrl = "https://images.unsplash.com/photo-1519694318318-ecaa6b32c5a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const hotUrl = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const coldUrl = "https://images.unsplash.com/photo-1477468582062-ed2d778a9195?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const imgUrl = "https://images.unsplash.com/photo-1673191898695-8252d409d82c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia    
        sx={{ height: 140 }}
        image={info.weather === "clear sky" ? imgUrl : info.weather === "rain" ? rainUrl : info.weather === "hot" ? hotUrl : coldUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {info.country} {info.city}  {info.weather === "clear sky" ? 
         <WbSunnyIcon /> : info.weather === "rain" ?
          <Thunderstormlcon /> : info.weather === "hot" ? 
          <AcUnitIcon /> : <AcUnitIcon />}
           
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Temperature: {info.temp}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Min Temperature: {info.tempMin}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Max Temperature: {info.tempMax}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Humidity: {info.humidity}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Weather: {info.weather}
        </Typography>
      </CardContent>
    </Card>
  );



 

    // return(
    //     <div>
    //         {/* <p>Weather Info</p>
    //         <p>Temperature: {result.temp}</p>
    //         <p>Min Temperature: {result.tempMin}</p>
    //         <p>Max Temperature: {result.tempMax}</p>
    //         <p>Humidity: {result.humidity}</p>
    //         <p>Weather: {result.weather}</p> */}

    //          <p>Weather Info</p>
    //         <p>Temperature: {info.temp}</p>
    //         <p>Min Temperature: {info.tempMin}</p>
    //         <p>Max Temperature: {info.tempMax}</p>
    //         <p>Humidity: {info.humidity}</p>
    //         <p>Weather: {info.weather}</p> 
            
    //     </div>
    // )
}