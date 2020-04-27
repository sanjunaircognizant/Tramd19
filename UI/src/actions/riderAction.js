import { RIDER_POST } from './types';
import ApiCall from '../api/apiCall'

export const postRider = (data) => dispatch => {
    ApiCall.post("SUBMIT_RIDER",data).then(res=>{
        if(!res){return;}
        dispatch({
            type: RIDER_POST,
            payload: res
          });
    }
    );
      
};