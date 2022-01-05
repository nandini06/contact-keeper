import {SET_ALTER, REMOVE_ALTER} from '../types';

//eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case SET_ALTER:
            return [...state, action.payload];
        case REMOVE_ALTER:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
}