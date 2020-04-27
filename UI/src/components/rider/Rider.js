import React , { Component } from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Demo from "./selectState";
import VehiclenumberText from "./vehiclenumber";
import Purpose from "./purpose";
import MobileNumber from "./mobilenumber";
import KiloMeter from "./kilometer";
import Description from "./description";
import SaveButton from "./savebuttton";
import InterState from "./interstate";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postRider}  from '../../actions/riderAction';


export class Rider extends Component {

  state={
    interState:true,
    vehicleNumber:"",
    purpose:"",
    mobileNum:"",
    approxKms:"",
    demog:{
      sourceState:"",
      sourceDistrict:"",
      destinationState:"",
      destinationDistrict:""
    },
    purposeDesc:"",
    requestedDate:new Date(),
    isLoggedIn:false
  }


  componentWillReceiveProps(next){
    console.log(next);
    if(next.postStatus){
     this.setState({...this.state,isLoggedIn:true});
    }
  }

  onChange= (e)=>{
    let val=e.target.value;
    this.setState({...this.state, [e.target.name]: val});
  }

  onSubmit=()=>{
    let val=this.state;
    let keys=Object.keys(val);
    for(var i=0;i<keys.length;i++){
      var ky=keys[i];
      var itm=val[ky];
      if(ky=='isLoggedIn'){}
      else if(itm=="" || itm==null){
        alert("All fields are mandatory "+ky);
        return;
      }else if(ky=="vehicleNumber" && !itm.match("[A-Za-z]{2}[0-9]{2}[A-Za-z]{0,3}[0-9]{1,4}")){
        alert("Enter Valid Vehicle Number eg:DL07B8899");
        return;
      }else if(ky=="mobileNum" && !itm.match("[0-9]{10,11}")){
        alert("Enter Valid Mobile Number");
        return;
      }else if(ky=="approxKms" && !itm.match("[0-9]{1,4}")){
        alert("Enter Valid Kms < 9999");
        return;
      }else if(ky=="purposeDesc" && itm.length<30){
        alert("Purpose Description should be atleast 50 Chars");
        return;
      }
    }
    this.props.postRider({...this.state,...this.state.demog});
  }


  render() {
    if(this.state.isLoggedIn){
      return <div> Ride Request has been submitted Successfully </div>
    }
    return (
      <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Rider Form
        </Typography>
        {/*<InterState value={this.state.interstate} onChange={this.onChange.bind(this)}/>*/}
        <Demo value={this.state.demog} interstate={this.state.interState} onChange={this.onChange.bind(this)}  />
        <VehiclenumberText value={this.state.vehicleNumber} onChange={this.onChange.bind(this)}  />
        <Purpose value={this.state.purpose}  onChange={this.onChange.bind(this)} />
        <MobileNumber value={this.state.mobileNum} onChange={this.onChange.bind(this)} />
        <KiloMeter value={this.state.approxKms} onChange={this.onChange.bind(this)}  />
        <Description value={this.state.purposeDesc} onChange={this.onChange.bind(this)} />

        <SaveButton onClick={this.onSubmit.bind(this)} />
      </Box>
    </Container>
    )
  }
}

Rider.propTypes = {
  postRider: PropTypes.func.isRequired,
  riderData: PropTypes.object
};

const mapStateToProps = st => ({
  riderData: st.rider.data,
  postStatus: st.rider.status
});

export default connect(mapStateToProps, { postRider })(Rider);


