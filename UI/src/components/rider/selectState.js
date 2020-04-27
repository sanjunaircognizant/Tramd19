import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {statesMaster} from '../../model/master';
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  const handleChange = event => {
    
    let demog =props.value;
    demog[event.target.name] = event.target.value;    
    props.onChange({target:{name:'demog',value:demog}});    

  };

  const isInterState=props.interstate ;
  console.log(isInterState,"STTE");
  return (
    <div>
      <FormControl required className={classes.formControl}>
        <InputLabel id="source-state">Source State</InputLabel>
        <Select
          labelId="source-state"
          id="source-state-required"
          value={props.value.sourceState}
          name="sourceState"
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
         {Object.keys(statesMaster).map(st=>{
           return (<MenuItem value={st}>
           {st}
         </MenuItem>);
         })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl required className={classes.formControl}>
        <InputLabel id="source-district">Source District</InputLabel>
        <Select
          labelId="source-district"
          id="source-district-required"
          value={props.value.sourceDistrict}
          name="sourceDistrict"
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {statesMaster[props.value['sourceState']] && statesMaster[props.value['sourceState']].map(st=>{
            return (<MenuItem value={st}>
            {st}
          </MenuItem>);
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      { isInterState && <FormControl required className={classes.formControl}>
        <InputLabel id="destination-state">Destination State</InputLabel>
        <Select
          labelId="destination-state"
          id="destination-state-required"
          value={props.value.destinationState}
          name="destinationState"
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Object.keys(statesMaster).map(st=>{
            return (<MenuItem value={st}>
            {st}
          </MenuItem>);
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>}
      <FormControl required className={classes.formControl}>
        <InputLabel id="destination-district">Destination District</InputLabel>
        <Select
          labelId="destination-district"
          id="destination-district-required"
          value={props.value.destinationDistrict}
          name="destinationDistrict"
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {statesMaster[props.value['destinationState']] && statesMaster[props.value['destinationState']].map(st=>{
            return (<MenuItem value={st}>
            {st}
          </MenuItem>);
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
}
