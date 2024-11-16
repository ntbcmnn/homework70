import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../api/axiosAPI.ts';
import { IContact, IContactApi, IContactForm } from '../../types';
import { AxiosResponse } from 'axios';

export const fetchContacts = createAsyncThunk<IContact[], void>(
  'contacts/fetchContacts',
  async () => {
    const response: AxiosResponse<IContactApi> = await axiosAPI.get<IContactApi>('contacts.json');

    if (response.data) {
      const contactsApi: IContact[] = Object.keys(response.data).map((contactKey: string) => {
        return {
          ...response.data[contactKey],
          id: contactKey
        };
      });
      return contactsApi.reverse();
    }
    return [];
  });

export const addContact = createAsyncThunk<void, IContactForm>(
  'contacts/addContact',
  async (contact) => {
    await axiosAPI.post('contacts.json', {...contact});
  }
);

export const deleteContact = createAsyncThunk<void, string>(
  'contacts/deleteContact',
  async (contactId: string) => {
    await axiosAPI.delete(`contacts/${contactId}.json`);

  }
);

export const getContactById = createAsyncThunk<IContact | null, string>(
  'contacts/getContactById',
  async (contactId: string) => {
    const response = await axiosAPI.get<IContact | null>(`contacts/${contactId}.json`);
    if (!response.data) return null;
    return response.data || null;
  }
);

export const editContact = createAsyncThunk<void, { id: string, contact: IContact }>(
  'contacts/editContact',
  async ({id, contact}) => {
    await axiosAPI.put(`contacts/${id}.json`, {...contact});
  }
);