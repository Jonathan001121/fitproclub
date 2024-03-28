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
import homepage_model from "../../assets/homepage_model.png";

import { useLocation } from 'react-router-dom';
const GameCard = () => {

    const [open, setOpen] = React.useState();
    const handleClick = () => {

        setOpen(!open);
    };

    const navigate = useNavigate();

    const handleStartNow = (gamePath) => {
        navigate(gamePath);
      };
    


    return (
        <Card sx={{ maxWidth: 350, maxHeight: 450 ,minHeight: 600}}>

            <CardMedia
                sx={{ height: 300, maxwidth: 200 }}
                image={homepage_model}
                title="homepage_model"
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Cardio Interactive Game
                </Typography>
                <Typography>Category: Cardio</Typography>

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


                                <ListItemText primary="Hi how are you " />
                            </ListItemButton>
                        </List>

                    </Collapse>
                    <Button size="small" onClick={() => handleStartNow('/cardiogame')}>
                        Start Now
                    </Button>
                </List>
            </CardContent>


        </Card>


    );
};

export default GameCard;
