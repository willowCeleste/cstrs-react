import { useState } from 'react';

const AddCoaster = props => {
  const [name, setName ] = useState('');
  const [drop, setDrop] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    props.onAddItem({ 
      _id: Math.random().toString(),
      name: name,
      drop: parseFloat(drop)
    });
    setName('');
    setDrop('')
  }

  const onNameInputChange = e => {
    setName(e.target.value);
  }

  const onDropInputChange = e => {
    setDrop(e.target.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="coaster name" onChange={onNameInputChange} value={name} />
      <input type="number" min="0.01" step="0.01" placeholder="biggest drop" onChange={onDropInputChange} value={drop}/>
      <input type="submit" value="Add Coaster" />
    </form>
  );
}

export default AddCoaster;