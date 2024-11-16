import React, { useState } from 'react';
import { IContact } from '../../types';
import { NavLink } from 'react-router-dom';
import { baseImg } from '../../constants.ts';
import Modal from '../UI/Modal/Modal.tsx';

interface Props {
  contact: IContact;
  onDeleteContact: React.MouseEventHandler;
}

const ContactCard: React.FC<Props> = ({contact, onDeleteContact}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Modal show={showModal} closeModal={() => setShowModal(!showModal)} defaultModalBtn>
        <div className="d-flex card-body justify-content-center align-items-center gap-2 p-4">
          <div className="w-50">
            <img className="w-75 rounded-3" src={contact.image || baseImg} alt={contact.name}/>
          </div>
          <div className="d-flex flex-column align-items-start">
            <h4 className="mb-2">{contact.name}</h4>
            <div className="d-flex gap-2">
              <i className="bi bi-telephone"></i>
              <p className="m-0 mb-2 p-0">{contact.phone}</p>
            </div>
            <div className="d-flex gap-2">
              {contact.email ?
                <>
                  <i className="bi bi-envelope"></i>
                  <p className="m-0 mb-2 p-0">{contact.email}</p>
                </> : null
              }
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <NavLink to={`/contacts/${contact.id}/edit`} className="btn btn-dark d-inline-flex gap-2">
                Edit
                <i className="bi bi-pen"></i>
              </NavLink>
              <button className="btn btn-dark d-inline-flex gap-2" onClick={onDeleteContact}>
                Delete
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="card mb-4 w-25" onClick={() => setShowModal(!showModal)}>
        <img src={contact.image || baseImg} className="card-img-top" alt={contact.name}/>
        <div className="card-body">
          <h5 className="card-title text-center">{contact.name}</h5>
        </div>
      </div>
    </>
  );
};

export default ContactCard;