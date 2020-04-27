
import React, { Component } from 'react';
import Calendar from './calendar';
import RiderRequests from './RiderRequest';
import Statitics from './statitics';
import ApprovalPane from './approvalPane';
import {getRiderRequestByDate} from '../../api/apiService';
import {approveRide} from '../../api/apiService';


export class Dashboard extends Component {
    
    state={
        popup:false,
        riderListFlag:false,
        selectedDate: null,
        officials:{ 
        	manualApprovalRiders : []
        },
        riderCounts:{},
        popUpData:{},
        indx:-1
    }

    onClickApprove=(status,id)=>{

        
        approveRide(status,id).then(res=>{
            let newVal=this.state.officials.manualApprovalRiders.filter(el=>{
               return el._id != id
            })
            this.setState({...this.state, popup:false,officials:{manualApprovalRiders:newVal}});
            this.handleDateChange(this.state.selectedDate);
        });
        
    }

    onClickView=(data,indx)=>{
        this.setState({...this.state, popup:true, popUpData:data,indx});
    }

    onClickClose=()=>{
        this.setState({...this.state,popup:false});
    }
   
    
    handleDateChange = (date) => {
               
        getRiderRequestByDate(date).then((res)=>{ 
            if(!res){return;}
            //let [riderCounts, manualApprovalRiders] =res.data; 
            
            this.setState({...this.state, selectedDate : date ,riderCounts: res.data.riderCounts, officials:{manualApprovalRiders:res.data.manualApprovalRiders}} );
          
        });
      }

      
  onChange= (e)=>{
    let val=e.target.value;
    if(val===true || val === false){
      val= !this.state[e.target.name];
    }
    this.setState({...this.state, [e.target.name]: val});
  }


    render() {
        
        return (
            <div>
                <h2>Dashboard</h2>
                <Calendar value={this.state.selectedDate} onChange={this.handleDateChange.bind(this)} />
                {this.state.selectedDate && <Statitics value={this.state.riderCounts}/> }
                {this.state.popup && <ApprovalPane value={this.state.popUpData} onClickClose={this.onClickClose.bind(this)} onClickApprove={this.onClickApprove.bind(this)} />}
                {this.state.selectedDate && <RiderRequests popup={this.state.popup} onClickView={this.onClickView.bind(this)} riders={this.state.officials.manualApprovalRiders} />}
            </div>
        )
    }
}

export default Dashboard
