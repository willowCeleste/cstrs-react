import './CoasterList.css';

const CoasterList = props => {
  return (
    <>
      <h2>Coasters</h2>
      <table className="c-coaster-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Drop</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
        { props.items.map(coaster => {
          return (
            <tr key={ coaster._id }>
              <td>{ coaster.name }</td>
              <td>{ coaster.drop } ft.</td>
              <td>{ coaster.manufacturer }</td>
            </tr>
          )
        }) }
        </tbody>
      </table>
    </>
  )
};

export default CoasterList;