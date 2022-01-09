import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Title from "../../Components/Title/Title";
import Button from "../../Components/Button/Button";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);

  const emailChangeHandler = e => {
    setEmail(e.target.value);
  };

  const usernameChangeHandler = e => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = e => {
    setPassword(e.target.value);
  }

  const confirmPasswordChangeHanlder= e => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (password.trim() !== confirmPassword.trim()) {
      alert('Passwords must match!')
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          username,
          password
        })
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      console.log(data);
      setUserContext(prev => {
        return {...prev, token: data.token}
      });
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Title text="Sign Up" />
      <form className="c-login__form" onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input className="o-input" type="email" id="email" name="email" placeholder="your@email.com" onChange={emailChangeHandler} />
        </div>
        <br />
        <div>
          <label htmlFor="username">Username</label>
          <input className="o-input" type="text" id="username" name="username" placeholder="username" onChange={usernameChangeHandler} />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <input className="o-input" type="password" id="password" name="password" placeholder="**********" onChange={passwordChangeHandler} />
        </div>
        <div>
          <label htmlFor="password">Confirm Password</label>
          <input className="o-input" type="password" id="confirmPassword" name="confirmPassword" placeholder="**********" onChange={confirmPasswordChangeHanlder} />
        </div>
        <Button className="" type="submit" label="Sign Up"/>
      </form>
      <Link className="o-link" to="/login">Login</Link>
    </div>
  );
};

export default Register;