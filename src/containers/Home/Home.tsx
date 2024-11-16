import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectContacts, selectFetchLoading } from '../../store/slices/contactsSlice.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import Contacts from '../../components/Contacts/Contacts.tsx';
import { useCallback, useEffect } from 'react';
import { deleteContact, fetchContacts } from '../../store/thunks/contactsThunk.ts';

const Home = () => {
  const isLoading = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);

  const fetchAllContacts: () => Promise<void> = useCallback(async () => {
    await dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchAllContacts();
    }
  }, [fetchAllContacts]);

  const removeContact: (id: string) => Promise<void> = useCallback(async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      await dispatch(deleteContact(id));
      await fetchAllContacts();
    }
  }, [dispatch, fetchAllContacts]);

  return (
    <>
      {isLoading ? <Loader/> :
        <>
          <div className="mb-2">
            {contacts.length > 0 ?
              <Contacts contacts={contacts} deleteContact={removeContact}/>
              : <p>Not contacts found</p>
            }
          </div>
        </>
      }
    </>
  );
};

export default Home;