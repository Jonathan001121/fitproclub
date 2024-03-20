import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const ExerciseCard= (props) => {

    const [open, setOpen] = React.useState();
    const handleClick = () => {
                    
        setOpen(!open);
    };
   
    const navigate = useNavigate();
  
    const handleStartNow = (exercisePath) => {
      navigate(exercisePath ,{ state: { fbx: props.fbx , exerciseName: props.exercise} });
    };


    return (
        <Card sx={{ minWidth:250, minHeight:450}}>
            <Typography variant="h4">Exercise{props.num}</Typography>
                <CardMedia
                    sx={{ height: 140 }}
                    // image={image}
                    title="green iguana"
                    />

                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.exercise}
                </Typography>
                <Typography>Category: {props.category}</Typography>

                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                <ListItemButton onClick={handleClick}>
                <ListItemText primary="Instruction" />
                {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 0 }}>


            <ListItemText primary={props.Instruction} />
          </ListItemButton>
        </List>
        
      </Collapse>
      <Button size="small" onClick={() => handleStartNow(`/mediapipe`)}>
                    Start Now  
                    </Button>
    </List>
                        </CardContent>

                      
                      </Card>
                      
                      
                );
    };

export default ExerciseCard
