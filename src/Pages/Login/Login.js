import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Title from "../../Components/Title/Title";
import Button from "../../Components/Button/Button";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]= useState(false);
  const [userContext, setUserContext] = useContext(UserContext);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', "credentials": "include"},
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      if (!response.ok) {
        alert('Invalid username or password');
        setError(true);
      } else {
        const data = await response.json();
        setUserContext(prev => {
          return {...prev, token: data.token, user: data.user}
        });
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (userContext.token) {
      navigate('/');
    }
  });

  return (
    <div>
      <Title text="Login" />
      <form className="c-login__form" onSubmit={submitHandler}>
        <div>
          <input 
            className={`o-input${error ? ' o-input--error' : ''}`} 
            type="text" id="username" name="username" 
            onChange={e => setUsername(e.target.value)} 
            placeholder="username"
            required />
        </div>
        <br />
        <div>
          <input 
            className={`o-input${error ? ' o-input--error' : ''}`} 
            type="password" id="password" name="password" 
            onChange={e => setPassword(e.target.value)} 
            placeholder="password"
            required />
        </div>
        <Button className="c-login__submit" type="submit" label="Log In" />
      </form>
      <Link className="o-link" to="/sign-up">Sign Up</Link>
    </div>
  );
};

export default Login;