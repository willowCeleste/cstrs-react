import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MagnifyingGlass from "../SVGs/MagnifyingGlass";

const Search = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${process.env.REACT_APP_CMS_URL}/api/v1/coaster?search=${searchTerm}`);
      const data = await result.json();
      navigate('/search', {state: {
        results: data.results,
        searchTerm: searchTerm
      }});
      setSearchTerm('');
    } catch (e) {
      console.log(e);
    }
  };

  const onInputChange = async e => {
    const value = e.target.value;
    setSearchTerm(value);
    if (props.showSuggestions) {
      if (value.length >=3) {
        try {
          const response = await fetch(`${process.env.REACT_APP_CMS_URL}/api/v1/search/suggestion?s=${value}${props.type ? `&type=${props.type}` : ''}`);
          const data = await response.json();
          setSuggestions(data.length ? data : [{ title: 'No suggestions :(', _id: 'none'}])
        } catch (e) {
          console.log(e);
        }
      } else {
        setSuggestions([]);
      }
    }
  };

  const suggestionClickHandler = suggestion => {
    props.suggestHandler(suggestion);
    setSuggestions([]);
  }

  const renderSuggestions = () => {
    if (suggestions.length) {
      return (
        <ul className="c-search__results">
          {suggestions.map(suggestion => {
            if (suggestion._id === 'none') {
              return <li key={suggestion._id}>{suggestion.title}</li>
            }
            return <li key={suggestion._id} onClick={() => suggestionClickHandler(suggestion)}>{suggestion.title} - {suggestion._park[0].title}</li>
          })}
        </ul>
      )
    }
  };

  return (
    <div className="c-search__wrapper">
      <form className="c-search" action="" onSubmit={onSearchSubmit}>
        <input className="c-search__text-input" type="text" placeholder="Search Coasters" value={searchTerm} onChange={onInputChange}/>
        <button className="c-search__submit" type="submit">
          <MagnifyingGlass />
        </button>
      </form>
      {props.showSuggestions ? renderSuggestions() : '' }
    </div>
  )
};

export default Search;