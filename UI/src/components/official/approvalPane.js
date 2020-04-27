
import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import TimelineIcon from '@material-ui/icons/Timeline';
import EventIcon from '@material-ui/icons/Event';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import './approvePane.css';

export class ApprovalPane extends Component {

    state={
        data:[
            {key:"Source State", value: "Karnataka"},
            {key:"Source District", value: "Banglore"},
            {key:"Destination State", value: "Kerala"},
            {key:"Destination District", value: "Kannur"},
            {key:"Vechicle Number", value: "KA 08 B 8899"},
            {key:"Mobile Number", value: "9876543210"},
            {key:"Approximate Kms", value: "300"},
            {key:"purpose", value: "Job"},
            {key:"Preferred Date", value: "30/04/2020"},
            {key:"Purpose in detail", value: "'FormControlLabel' is defined but never used 'FormControlLabel' is defined but never used 'FormControlLabel' is defined but never used 'FormControlLabel' is defined but never used  'FormControlLabel' is defined but never used  'FormControlLabel' is defined but never used  'FormControlLabel' is defined but never used"},
        ]
    }

    render() {
        let val=this.props.value;
        //console.log(this.state);
        
        return (
            <div>

            <Box color="text.primary" className="paneBox">
                <div className="paneClose" ><Button color="secondary" onClick={this.props.onClickClose.bind(this)}><CloseIcon/></Button></div>
                <div className="paneItems">
                    <Typography title="Travel Direction" className="paneElement" variant="h6"> {val.sourceDistrict} | {val.sourceDistrict} <ArrowForwardIcon/> {val.destinationState} | {val.destinationDistrict}  </Typography>
                    <Typography title="Vehicle Number" className="paneElement" variant="h6"> <DriveEtaIcon/> {val.vehicleNumber}  </Typography>
                    <Typography title="Mobile Number" className="paneElement" variant="h6"> <PhoneAndroidIcon/> {val.mobileNum}  </Typography>
                    <Typography title="Approx. Kms" className="paneElement" variant="h6"> <TimelineIcon/> {val.approxKms}  </Typography>
                    <Typography title="Preffered Date" className="paneElement" variant="h6"> <EventIcon/> {val.requestedDate} </Typography>
                    <Typography title="Purpose" className="paneElement" variant="h6"> <NotListedLocationIcon/> {val.purpose}  </Typography>
                    <div title="Purpose Description" className="paneElDesc">{val.purposeDesc}
                    </div>


                    <div className="paneBtn">
                    <Button variant="contained" color="secondary" onClick={this.props.onClickApprove.bind(this,"Approved",val._id)}>APPROVE</Button>
                    <Button color="secondary" onClick={this.props.onClickApprove.bind(this,"Rejected",val._id)}>REJECT</Button>
                    </div>
                </div>
            </Box>


                
            </div>
        )
    }
}

export default ApprovalPane
