import { getSearchSuggestions } from "../../lib/cms";
import useHttp from "../../hooks/use-http";
import { uiActions } from "../../store/ui";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import RideCard from "../../Components/RideCard/RideCard";

const Search = () => {
  const dispatch = useDispatch();
  const { sendRequest: suggestions, status, data: loadedSuggestions, error } = useHttp(getSearchSuggestions);
  const onInputChange = async e => {
    const value = e.target.value;
    console.log(value);
    if (value.length >=3) {
      await suggestions(value);
    } 
  };

  const renderSuggestions = () => {
    if (loadedSuggestions && loadedSuggestions.length) {
      return (
        <ul>
          { loadedSuggestions.map(suggestion => {
            return <li key={suggestion._id}>
              <Link to={`/coaster/${suggestion._id}`}>
                <RideCard key={suggestion._id} coaster={suggestion.title} park={suggestion._park ? suggestion._park[0].title : ''} />
              </Link>
            </li>
          }) }
        </ul>
      )
    }
  }

  if (error) {
    console.log(error);
    // dispatch(uiActions.showAlert('There was a problem getting your search results'));
    return <p>There was a probem getting your search results</p>  //TODO: fire off dismissable alert here
  }

  return (
    <div>
      <input className="o-input c-search__input" type="text" placeholder="Search" onChange={onInputChange} />
      { status === 'pending' ? <p>Loading</p> : renderSuggestions() }
    </div>
  )
};

export default Search;