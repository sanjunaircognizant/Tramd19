import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function BasicTextFields(props) {
  const classes = useStyles();
  return (
    <FormControl required className={classes.formControl}>
      <TextField id="mobile-number" label="Mobile Number"  name="mobileNum"  value={props.value} onChange={props.onChange.bind(this)} />
      <FormHelperText>Required</FormHelperText>
    </FormControl>
  );
}
