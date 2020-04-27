import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";




export class interstate extends React.Component {
  

  render() {
    
    return (
      <FormGroup row>
      <FormControlLabel
        label="Inter State"
        control={
          <Switch
            name="interstate"
            checked={this.props.value==true}
            onChange={this.props.onChange.bind(this)}
            color="primary"
          />
        }
      />
    </FormGroup>
    );
  }
}

export default interstate;

