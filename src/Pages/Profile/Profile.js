import { useState, useEffect, useCallback, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import Title from '../../Components/Title/Title';
import Button from '../../Components/Button/Button';
import './Profile.css';

const Profile = props => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchProfileHandler = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/pages/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext.token}`
        }
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setProfile(data.user);
    } catch (e) {
      console.log(e);
    }
  }, [userContext.token]);

  useEffect(() => {
    fetchProfileHandler();
  }, [fetchProfileHandler]);

  const firstChangeHandler = e => {
    setProfile(prev => {
      return {...prev, firstName: e.target.value};
    })
  };

  const lastChangeHandler = e => {
    setProfile(prev => {
      return {...prev, lastName: e.target.value};
    })
  };

  const locationChangeHandler = e => {
    setProfile(prev => {
      return {...prev, location: e.target.value};
    })
  };

  const bioChangeHandler = e => {
    setProfile(prev => {
      return {...prev, bio: e.target.value}
    })
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/edit`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext.token}`
        },
        body: JSON.stringify(profile)
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      };
      const data = await response.json();
      setProfile(data.user);
      props.onNotification('Profile saved!');
    } catch (e) {
      alert('Something went wrong');
      console.log(e);
    }
    
  }

  const renderProfileForm = () => {
    return (
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div className="c-form__field-wrapper">
          <label className="c-form__label" htmlFor="">First Name</label>
          <input className="o-input" type="text" value={profile.firstName} onChange={firstChangeHandler} />
        </div>
        <div className="c-form__field-wrapper">
          <label className="c-form__label" htmlFor="lastName">Last Name</label>
          <input className="o-input" type="text" value={profile.lastName} onChange={lastChangeHandler} />
        </div>
        <div className="c-form__field-wrapper">
          <label className="c-form__label" htmlFor="location">Location</label>
          <input className="o-input" type="text" value={profile.location} onChange={locationChangeHandler} />
        </div>
        <div className="c-form__field-wrapper">
          <label className="c-form__label" htmlFor="bio">Bio</label>
          <textarea className="o-input--textarea" rows="10" value={profile.bio} onChange={bioChangeHandler} />
        </div>
        <Button type="submit" label="Save Profile" />
      </form>
    );
  }

  return <div>
    <Title text="Profile" />
    {!profile ? <div>There was a problem getting your profile</div> : (
      <div>
        <Title text={profile.username} size="small" />
        {renderProfileForm()}
      </div>
    )}
  </div>
};

export default Profile;