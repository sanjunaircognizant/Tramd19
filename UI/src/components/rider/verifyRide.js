import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VerifyRideInfo from './verifyRideInfo';
import {verifyRide} from '../../api/apiService'

import './verifyRide.css';

export class VerifyRide extends Component {
    state={
        details: false,
        vehicle:"",
        detailsData:[{
            source:"BANGLORE",
            dest:"MYSORE",
            status:"APPROVED",
            date:"12/05/2020",
            fromTime:"10:00",
            toTime:"14:00"
        }]
    }
    verify=()=>{
        let vehicle=this.state.vehicle;
        if(vehicle.length< 7 || !vehicle.match("[A-Za-z]{2}[0-9]{2}[A-Za-z]{0,3}[0-9]{1,4}")  ){
            alert("Enter valid Vechicle Number without spaces");
            return;
        }
        this.setState({...this.state, details:false } );
        verifyRide(vehicle).then((res)=>{      
            console.log(res.data);
           let data= res.data.map(data=>{
               return ({
                    source: data.sourceDistrict,
                    dest: data.destinationDistrict,
                    status: data.riderStatus.toUpperCase(),
                    date: data.requestedDate,
                    fromTime: "10:00",
                    toTime: "14:00"
                }) ;
            })
            
            this.setState({...this.state, details:true, detailsData:data } );
        });        
    }

    onChange=(e)=>{
        this.setState({...this.state,vehicle:e.target.value});
    }

    render() {
        return (
            <div className="verify-outer-box">
                <div className="verifySearch">
                <Typography variant="h6" className="titleTextVerify"> Verify Ride Application Status </Typography>
                <TextField value={this.state.vehicle} id="outlined-basic" label="Vehicle Number" onChange={this.onChange.bind(this)} variant="outlined" />
                <Button variant="outlined" color="primary" onClick={this.verify.bind(this)}> VERIFY </Button>
                </div>
                {this.state.details && 
                    this.state.detailsData.map(dt=>{
                        return  <VerifyRideInfo value={dt} />;
                    })
                   }

                   {
                    this.state.detailsData.length==0 && <p> No records found</p>
                   }
            </div>
        )
    }
}

export default VerifyRide
