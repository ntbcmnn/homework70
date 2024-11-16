import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectEditLoading, selectFetchLoading, selectOneContact } from '../../store/slices/contactsSlice.ts';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { editContact, getContactById } from '../../store/thunks/contactsThunk.ts';
import { IContact } from '../../types';
import { toast } from 'react-toastify';
import Loader from '../../components/UI/Loader/Loader.tsx';
import Form from '../../components/Form/Form.tsx';

const Edit = () => {
  const contact: IContact | null = useAppSelector(selectOneContact);
  const fetchLoading: boolean = useAppSelector(selectFetchLoading);
  const editLoading: boolean = useAppSelector(selectEditLoading);
  const navigate: NavigateFunction = useNavigate();
  const params = useParams<{ contactId: string }>();
  const dispatch = useAppDispatch();

  const getContact: () => Promise<void> = useCallback(async () => {
    if (params.contactId) dispatch(getContactById(params.contactId));
  }, [dispatch, params.contactId]);

  useEffect(() => {
    void getContact();
  }, [getContact]);

  const edit: (contact: IContact) => Promise<void> = async (contact: IContact) => {
    if (params.contactId) await dispatch(editContact({id: params.contactId, contact}));
    navigate('/');
    toast.success('Contact edited successfully!');
  };

  return (
    <>
      {fetchLoading ? <Loader/> :
        <>
          {contact ?
            <Form formAction={edit} existingContact={contact} isEditing isLoading={editLoading}/> : navigate('/')}
        </>
      }
    </>
  );
};

export default Edit;