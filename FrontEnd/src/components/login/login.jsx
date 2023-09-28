import '../styles/form.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { parseErrors } from '../../utils/parseErrors';
import Alert from '../../alert/alert';
import { useNavigate } from 'react-router-dom';

export default function login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      identifier,
      password,
    };

    try {
      const res = await axios.post(
        'http://localhost:1337/api/auth/local',
        data
      );

      setIdentifier('');
      setPassword('');

      navigate('/');
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
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className='form__group form__group--page'>
          <label className='form__label'>Password</label>
          <input
            className='form__field'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='form__group form__group--page'>
          <input className='form__btn' type='submit' value='Login' />
        </div>

        <footer>
          Dont have an account? <Link to='/register'>Register</Link> or Forgot
          Password?<Link to='/forgot-password'> Reset here</Link>
        </footer>
      </form>
    </>
  );
}
