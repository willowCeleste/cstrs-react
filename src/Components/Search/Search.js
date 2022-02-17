import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getSearchSuggestions } from "../../lib/cms";
import { getFullSearch } from "../../lib/cms";
import { Navigate } from "react-router";
import "./Search.css";
import MagnifyingGlass from "../SVGs/MagnifyingGlass";

const Search = props => {
  const { sendRequest: suggestions, status: suggestionsStatus, data: loadedSuggestions, error: suggestionsError } = useHttp(getSearchSuggestions, true);
  const { sendRequest: search, status: searchStatus, data: searchResults, error: searchError } = useHttp(getFullSearch, true)
  const [searchTerm, setSearchTerm] = useState('');
  // const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      const res = await search(searchTerm);
      console.log('res in function', res);
    }

    // useEffect - redirect to results page
    // try {
    //   const result = await fetch(`${process.env.REACT_APP_CMS_URL}/api/v1/coaster?search=${searchTerm}`);
    //   const data = await result.json();
    //   navigate('/search', {state: {
    //     results: data.results,
    //     searchTerm: searchTerm
    //   }});
    //   setSearchTerm('');
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const onInputChange = async e => {
    const value = e.target.value;
    setSearchTerm(value);
    if (props.showSuggestions) {
      if (value.length >=3) {
        await suggestions(value);
      } else {
        // loadedSuggestions = [];
      }
    }
  };

  const suggestionClickHandler = suggestion => {
    props.suggestHandler(suggestion);
    // setSuggestions([]);
  }

  const renderSuggestions = () => {
    if (loadedSuggestions && loadedSuggestions.length) {
      return (
        <ul className="c-search__results">
          {loadedSuggestions.map(suggestion => {
            if (suggestion._id === 'none') {
              return <li key={suggestion._id}>{suggestion.title}</li>
            }
            return <li key={suggestion._id} onClick={() => suggestionClickHandler(suggestion)}>{suggestion.title}{suggestion._park && suggestion._park.length ? ` -  ${suggestion._park[0].title}` : ''}</li>
          })}
        </ul>
      )
    }
  };

  return (
    <div className={`c-search__wrapper${props.variation === 'header' ? ' c-search__wrapper--header' : ''}`}>
      { searchResults && <Navigate to='/info' /> }
      { console.log('res in template', searchResults) }
      <form className="c-search" action="" onSubmit={onSearchSubmit}>
        <input 
          className="c-search__text-input"
          type="text" placeholder="Search Coasters"
          value={searchTerm}
          onChange={onInputChange}
          autoFocus />
        {props.showIcon && (
          <button className="c-search__submit" type="submit">
            <MagnifyingGlass />
          </button>
        ) }
        
      </form>
      {props.showSuggestions ? renderSuggestions() : '' }
    </div>
  )
};

export default Search;