import _ from 'lodash';

import StatList from './StatList';
import './Stats.css';
import { sortArray } from '../Helpers';

const Stats = props => {
  const data = props.data;
  // const favoriteManufacturers = data.slice(0, 5);
  const favoriteManufacturers = () => {
    let result = [];

    props.manufacturers.forEach(manufacturer => {
      result.push({
        name: manufacturer.name,
        value: data.filter(coaster => coaster.manufacturerId === manufacturer._id).length
      });
    });
    return result.sort((a, b) => {
      return b.value - a.value;
    }).slice(0, 5);
  };

  const tallest = data.sort((a, b) => {
    return b.drop - a.drop;
  }).slice(0, 5);

  const mostRidden = rides => {
    const ids = rides.map(ride => ride.coasterId);
    let result = [];
    _.uniq(ids).forEach(id => {   
      result.push({
        name: props.data.find(coaster => coaster._id === id).name,
        count: rides.filter(ride => id === ride.coasterId).length
      });
    })
  };
  mostRidden(props.rides);
  
  return (
    <div className="c-stats">
      <div className="c-stats__container">
        <StatList title="Favorite Manufacturers" items={favoriteManufacturers()} />
        
        <div>
          <h3>Tallest</h3>
            <ol className="c-stats__list">
              { tallest.map(coaster => <li className="c-stats__list-item--ordered" key={coaster._id}><span>{ coaster.name }</span><span>{ coaster.drop } ft.</span></li>) }
            </ol>
        </div>
        <div>
          <h3>Most Ridden</h3>
            <ol className="c-stats__list">
              {/* { mostRidden().map(ride => <li>hi</li> ) } */}
            </ol>
        </div>
      </div>
    </div>
  );
}

export default Stats;