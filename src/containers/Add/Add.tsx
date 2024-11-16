import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCreateLoading } from '../../store/slices/contactsSlice.ts';
import { IContactForm } from '../../types';
import { addContact, fetchContacts } from '../../store/thunks/contactsThunk.ts';
import { toast } from 'react-toastify';
import Form from '../../components/Form/Form.tsx';

const Add = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const createContactLoading: boolean = useAppSelector(selectCreateLoading);

  const addNewContact: (contact: IContactForm) => Promise<void> = async (contact: IContactForm) => {
    await dispatch(addContact({...contact}));
    navigate('/');
    await dispatch(fetchContacts());
    toast.success('Contact added successfully!');
  };

  return (
    <>
      <Form formAction={addNewContact} isLoading={createContactLoading}/>
    </>
  );
};

export default Add;