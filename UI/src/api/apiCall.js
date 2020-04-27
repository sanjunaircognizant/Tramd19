
import axios from 'axios';
import SnackbarContent from '@material-ui/core/SnackbarContent';

//const apiRoot="http://localhost:8080/";
const apiRoot="https://tramd19be-appreciative-ratel-lg.eu-gb.mybluemix.net/";

const contextUrl={
    POST_RIDER:"api/v1/create",
    AUTHENTICATE:"authenticate",
    REGISTER:"register",
    SUBMIT_RIDER:"riders",
    RIDER_VALIDATION:"riders/verify",
    OFFICIAL:"officials",
    RIDER_STATUS:"officials/confirmRiderStatus/{id}/{status}",
    CONFIRM_RIDE:"officials/confirmRiderStatus"
}




class ApiCall {

    static getHeaders(){
        const headers={ "Content-Type":"application/json"};
        const token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = 'Bearer '+token;
        }
        return  {headers};
    }

    static get(key){        
       return axios.get(apiRoot+contextUrl[key],this.getHeaders()).then(res=>{ return res;}).catch(err=>{
        alert("Connection Error");
    });
    }

    static getWithData(key, data){
        return axios.get(apiRoot+contextUrl[key]+data,this.getHeaders()).then(res=>{ return res;}).catch(err=>{
            console.log("ERROR",err.isAxisError,err.request,err.config,err.response,err.toJSON);
            alert("Connection Error");
        });
     }

   static post (key,data) {
        return axios.post(apiRoot+contextUrl[key],data,this.getHeaders()).then(res=>{ return res;}).catch(err=>{
            console.log();
            if(err.response.status == "401"){
                alert("Invalid Credentails");
            }else{
                alert("Connection Error");
            }

        })
    }

    static put (key,data) {
        return axios.put(apiRoot+contextUrl[key],data,this.getHeaders()).then(res=>{ return res;}).catch(err=>{
            //console.log();
            if(err.response.status == "401"){
                alert("Invalid Credentails");
            }else{
                alert("Connection Error");
            }

        })
    }

    static putWIthData (key,append,data) {
        return axios.put(apiRoot+contextUrl[key]+append,data,this.getHeaders()).then(res=>{ return res;}).catch(err=>{
            //console.log();
            if(err.response.status == "401"){
                alert("Invalid Credentails");
            }else{
                alert("Connection Error");
            }

        })
    }

}

export default ApiCall;


