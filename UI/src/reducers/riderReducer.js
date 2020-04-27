import { RIDER_POST } from '../actions/types';

const initialState = {

    data:{},
    status:null

};

export default function(state = initialState, action) {
  switch (action.type) {
    case RIDER_POST:
      return {
        ...state,
        data: action.payload.data,
        status:action.payload.status
      };    
    default:
      return state;
  }
}