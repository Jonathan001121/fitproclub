
import { errorDetail } from "../../data/errorDetail"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ErrorCard = (props) => {
  const navigate = useNavigate();
  
  const handleStartNow = (exercisePath) => {
    navigate(exercisePath);
  };

  return (

   



    <div className="CourseCard">
             <div className="course-header">
            <span>Common Error</span>
        </div>
    <div className="Courses">
    {errorDetail.map((error)=>{
        if (error.eid == props.num) {
          return(
                <div className="Card">
                

    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 250 }}
      image={error.image}
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
      {error.errorTitle}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {error.errorDescription }
      </Typography>
    </CardContent>
    <CardActions>



    </CardActions>
  </Card>
  </div>
        )}})}
  </div>
  </div>



  )
}

export default ErrorCard