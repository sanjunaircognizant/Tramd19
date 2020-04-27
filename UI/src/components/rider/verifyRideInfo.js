import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TimerIcon from '@material-ui/icons/Timer';
import EventIcon from '@material-ui/icons/Event';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Radium, {StyleRoot} from 'radium';
import { tada,rubberBand } from 'react-animations'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  slot:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "25rem"
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));


const styles = {
    anim: {
      animation: 'x 1s',
      animationName: Radium.keyframes(rubberBand, 'tada')
    }
  }

export default function VerifyRideInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {props.value.source.toUpperCase()} <ArrowForwardIcon/> {props.value.dest.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item>
          
            <Typography  gutterBottom variant="h6">
            <StyleRoot> <div style={styles.anim}>{props.value.status}</div></StyleRoot>
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="h6" className={classes.slot}>
        <Chip className={classes.chip} color="primary" label="Slot" /> <EventIcon/> {props.value.date}<TimerIcon/> {props.value.fromTime} <NavigateNextIcon/> {props.value.toTime}
        </Typography>
      </div>
      <Divider variant="middle" />
      
      <div className={classes.section3}>
        {props.value.status =='APPROVED' && <Button color="primary">Print Authorization</Button>}
      </div>
    </div>
  );
}