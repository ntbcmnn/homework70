import { IContact } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addContact, deleteContact, editContact, fetchContacts, getContactById } from '../thunks/contactsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ContactsState {
  contacts: IContact[];
  oneContact: IContact | null;
  isFetching: boolean;
  isDeleting: boolean | string;
  isCreating: boolean;
  isEditing: boolean;
  error: boolean;
}

const initialState: ContactsState = {
  contacts: [],
  oneContact: null,
  isFetching: false,
  isDeleting: false,
  isCreating: false,
  isEditing: false,
  error: false,
};

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectOneContact = (state: RootState) => state.contacts.oneContact;

export const selectFetchLoading = (state: RootState) => state.contacts.isFetching;
export const selectCreateLoading = (state: RootState) => state.contacts.isCreating;
export const selectEditLoading = (state: RootState) => state.contacts.isEditing;

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<IContact[]>) => {
        state.isFetching = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(addContact.pending, (state) => {
        state.isCreating = true;
        state.error = false;
      })
      .addCase(addContact.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addContact.rejected, (state) => {
        state.isCreating = false;
        state.error = true;
      })
      .addCase(deleteContact.pending, (state, {meta}) => {
        state.isDeleting = meta.arg;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteContact.rejected, state => {
        state.isDeleting = false;
      })
      .addCase(getContactById.pending, state => {
        state.isFetching = true;
        state.oneContact = null;
      })
      .addCase(getContactById.fulfilled, (state, action: PayloadAction<IContact | null>) => {
        state.isFetching = false;
        state.oneContact = action.payload;
      })
      .addCase(getContactById.rejected, state => {
        state.isFetching = false;
      })
      .addCase(editContact.pending, state => {
        state.isEditing = true;
      })
      .addCase(editContact.fulfilled, (state) => {
        state.isEditing = false;
        state.oneContact = null;
      })
      .addCase(editContact.rejected, state => {
        state.isEditing = false;
      });
  }
});

export default contactsSlice.reducer;