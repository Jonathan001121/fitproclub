import "./CourseCard.css"
import { courseDetail } from "../../data/courseDetail"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const CourseCard = () => {
  const navigate = useNavigate();
  
  const handleStartNow = (exercisePath) => {
    navigate(exercisePath);
  };

  return (

   



    <div className="CourseCard">
             <div className="course-header">
            <span>Course</span>
            <span className='stroke-text'>Description</span>
        </div>
    <div className="Courses">
    {courseDetail.map((course)=>(
                <div className="Card">
                

    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={course.image}
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
      {course.courseTitle}
      </Typography>
      <Typography>Best for Age:{course.age}</Typography>
      <Typography variant="body2" color="text.secondary">
        {course.overview }
      </Typography>
    </CardContent>
    <CardActions>

    <Button size="small" onClick={() => handleStartNow(`/exercise${course.id}`)}>
        Start Now  
                           </Button>



    </CardActions>
  </Card>
  </div>
            ))}
  </div>
  </div>



  )
}

export default CourseCard