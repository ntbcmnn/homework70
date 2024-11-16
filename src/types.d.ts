export interface IContactForm {
  name: string;
  phone: string;
  email: string;
  image: string;
}

export interface IContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  image: string;
}

export interface IContactApi {
  [key: string]: IContact;
}