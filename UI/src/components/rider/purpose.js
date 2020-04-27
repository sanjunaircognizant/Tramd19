import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {purposeMaster} from '../../model/master';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  
 

  return (
      <FormControl required className={classes.formControl}>
        <InputLabel id="purpose">Purpose</InputLabel>
        <Select
          labelId="purpose"
          id="purpose-required"
          name="purpose"
          value={props.value}
          onChange={props.onChange.bind(this)}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {purposeMaster.map((pu)=>{
            return (<MenuItem value={pu}>{pu}</MenuItem>);
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
  );
}
