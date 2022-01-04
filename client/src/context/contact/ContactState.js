import React, { useReducer } from 'react';
import * as uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            { 
                id: 1,
                name: 'Ted',
                email: 'ted@gmail.com',
                phone: '111-111-1111',
                type: 'personal',
            },
            { 
                id: 2,
                name: 'Sara',
                email: 'sara@gmail.com',
                phone: '222-222-2222',
                type: 'professional',
            },
            { 
                id: 3,
                name: 'Harry',
                email: 'harry@gmail.com',
                phone: '333-333-3333',
                type: 'personal',
            }
        ],
        current: null, // update contact obj will be stored
        filtered: null // an array of filtered contacts
    };
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }

    //delete contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    }

    //Set current contacts
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    //clear current contacts
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    //update Contacts
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact})
    };

    //Filter contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text})
    };

    //clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    };

    return (
        <ContactContext.Provider
        value = {{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;