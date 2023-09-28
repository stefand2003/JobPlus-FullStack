import '../styles/form.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { parseErrors } from '../../utils/parseErrors';
import Alert from '../../alert/alert';

export default function forgot_password() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
    };

    try {
      const res = await axios.post(
        'http://localhost:1337/api/auth/forgot-password',
        data
      );

      setEmail('');

      setAlert({
        type: 'success',
        message: 'Please check your email for further instructions',
      });
    } catch (err) {
      setAlert(parseErrors(err));
    }
  };

  return (
    <>
      <Alert data={alert} />
      <form className='form form--page' onSubmit={handleSubmit}>
        <div className='form__group form__group--page'>
          <label className='form__label'>Email</label>
          <input
            className='form__field'
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form__group form__group--page'>
          <input className='form__btn' type='submit' value='Login' />
        </div>

        <footer>
          Have an account? <Link to='/login'>Login</Link>
        </footer>
      </form>
    </>
  );
}
