import React from 'react';
import { IContact } from '../../types';
import ContactCard from '../ContactCard/ContactCard.tsx';

interface Props {
  contacts: IContact[];
  deleteContact: (id: string) => void;
}

const Contacts: React.FC<Props> = ({contacts, deleteContact}) => {
  return (
    <div className="d-flex flex-column align-items-center">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} onDeleteContact={() => deleteContact(contact.id)}/>
      ))}
    </div>
  );
};

export default Contacts;