import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import * as uuid from "uuid";
import {
  SET_ALTER,
  REMOVE_ALTER
} from "../types";

const AlertState = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({ type: SET_ALTER , payload:{ msg, type, id}});

    setTimeout(() => dispatch({ type:REMOVE_ALTER, payload: id}), timeout);
  }


  

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
