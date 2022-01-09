const Filters = props => {
  const onFilterSelect = e => {
    props.onFilter(e.target.value);
  };

  return (
    <div>
      <select onChange={onFilterSelect}>
        <option value="0">All Manufacturers</option>
        { props.items.map(item => <option key={item._id} value={item._id}>{item.name}</option>) }
      </select>
    </div>
  );
};

export default Filters;