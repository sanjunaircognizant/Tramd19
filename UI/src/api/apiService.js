import ApiCall from './apiCall';
import moment from 'moment';


export const verifyRide=(vehicle)=>{
   return ApiCall.getWithData("RIDER_VALIDATION","/"+vehicle);
}

export const login=(data)=>{
   return ApiCall.post("AUTHENTICATE", data);
}

export const  getRiderRequestByDate = (date)=>{
   const fmtDate=moment(date).format('YYYY-MM-DD');
   return ApiCall.getWithData("OFFICIAL","/"+fmtDate);

}

export const  approveRide = (status,id)=>{
   return ApiCall.putWIthData("CONFIRM_RIDE","/"+id+"/"+status,"");

}

