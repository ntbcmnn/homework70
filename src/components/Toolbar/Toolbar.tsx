import { NavLink } from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark p-3">
      <div className="container d-flex align-items-center justify-content-between">
        <NavLink className="navbar-brand text-white" to="/">Contacts</NavLink>
        <NavLink
          className="navbar-nav text-decoration-none text-white d-inline-flex gap-2 align-items-center"
          to="/contacts/add-contact"
        >
          Add contact
          <i className="bi bi-person-plus-fill fs-5"></i>
        </NavLink>
      </div>
    </nav>
  );
};

export default Toolbar;