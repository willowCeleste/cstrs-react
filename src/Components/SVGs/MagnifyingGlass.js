const MagnifyingGlass = props => {
  return (
    <svg onClick={props.onCick} className="o-icon o-icon--search" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 5.5C10.5 8.26142 8.26142 10.5 5.5 10.5C2.73858 10.5 0.5 8.26142 0.5 5.5C0.5 2.73858 2.73858 0.5 5.5 0.5C8.26142 0.5 10.5 2.73858 10.5 5.5Z" stroke="black"></path>
      <path d="M9 9L13 13" stroke="black"></path>
    </svg>
  );
};

export default MagnifyingGlass;