import React, { Fragment, useContext, useEffect } from "react";
import Spinner from '../layout/Spinner';
import {
  CSSTransition,
  TransitionGroup
} from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  },[]);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a Contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
              // <h3>{contact.name}</h3>
            ))}
      </TransitionGroup>
      ) : <Spinner />}
      
    </Fragment>
  );
};

export default Contacts;
