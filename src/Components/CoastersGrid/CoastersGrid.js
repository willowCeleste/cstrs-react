import { sortArray } from "../../Helpers";
import './CoastersGrid.css';

const CoastersGrid = props => {
  const mappedCoasters = sortArray(props.coasters, 'title').map(coaster => {
    let imageUrl;
    if (coaster.images && coaster.images.items.length) {
      const attachment = coaster.images.items[0]._image[0].attachment;
      imageUrl = `http://localhost:3000/uploads/attachments/${attachment._id}-${attachment.name}.${attachment.extension}`;
    }
    return (
      <div key={coaster._id}>
        <div className="c-coasters-grid__image-wrapper">
          <div className="c-coasters-grid__image-wrapper-inner">
          <img className="c-coasters-grid__image" src={imageUrl || 'https://via.placeholder.com/800x600.png' } alt="" />
          </div>
        </div>
        <h2>{coaster.title}</h2>
        <p>{coaster._park[0].title}</p>
        {/* <p>{coaster._manufacturer[0].title}</p> */}
      </div>
    )
  })
  return (
    <div className="c-coasters-grid">{ mappedCoasters }</div>
  )
}

export default CoastersGrid;