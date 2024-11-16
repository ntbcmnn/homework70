import React, { useState } from 'react';
import { IContact } from '../../types';
import ButtonSpinner from '../UI/ButtonSpinner/ButtonSpinner.tsx';
import { toast } from 'react-toastify';
import { baseImg } from '../../constants.ts';
import { useAppSelector } from '../../app/hooks.ts';
import { selectFetchLoading } from '../../store/slices/contactsSlice.ts';
import Loader from '../UI/Loader/Loader.tsx';
import { NavLink } from 'react-router-dom';

const initialState = {
  id: '',
  name: '',
  phone: '',
  email: '',
  image: '',
};

interface Props {
  formAction: (contact: IContact) => void;
  existingContact?: IContact;
  isEditing?: boolean;
  isLoading?: boolean;
}

const Form: React.FC<Props> = ({
  formAction,
  existingContact = initialState,
  isEditing = false,
  isLoading = false
}) => {

  const [form, setForm] = useState<IContact>(existingContact);
  const fetchLoading: boolean = useAppSelector(selectFetchLoading);

  const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prevState) => {
      const {name, value} = e.target;

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length === 0 || form.phone.trim().length === 0) {
      toast.warning('Fill out all fields!');
    } else {
      formAction({...form});
      if (!isEditing) {
        setForm({...initialState});
      }
    }
  };

  return (
    <>
      {fetchLoading ? <Loader/> : <>
        <h3 className="mb-4 text-center">
          {isEditing ? 'Edit contact' : 'Add new contact'}
        </h3>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone number"
              name="phone"
              value={form.phone}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image"
              name="image"
              value={form.image}
              onChange={onChange}
              required
            />
          </div>
          <div className="w-50 d-flex flex-column">
            <p className="mb-2">Image preview</p>
            <img
              id="formImgId"
              className="w-25 rounded-3 mb-4"
              src={`${form.image || baseImg}`}
              alt={form.name}
            />
          </div>
          <div className="d-flex gap-3">
            <NavLink to="/" className="btn btn-outline-dark"> <i className="bi bi-arrow-left"></i> Back </NavLink>
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-dark d-flex align-items-center"
            >
          <span className="me-2">
            {isEditing ? 'Edit' : 'Add'}
          </span>
              {isLoading ? <ButtonSpinner/> : null}
            </button>
          </div>
        </form>
      </>}
    </>
  );
};

export default Form;