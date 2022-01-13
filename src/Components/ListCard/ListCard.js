import "./ListCard.css";
import Title from "../Title/Title";
import Arrow from "../SVGs/Arrow";

const ListCard = props => {
  return <div className="c-list-card">
    <div className="c-list-card__rank">
      {props.rank}
    </div>
    <div>
      <Title text={props.title} size="small" />
      {props.subtitle ? <h3>{props.subtitle}</h3> : ''}
      {props.description ? <p class="o-paragraph o-paragraph--small">{props.description}</p>: ''}
    </div>
    <div className="c-list-card__buttons">
      {props.rank !== 1 && <button className="c-list-card__button c-list-card__button--up" onClick={() => props.onMove(props.id, 'up')}><Arrow /></button> }
      <button className="c-list-card__button c-list-card__button--down" onClick={() => props.onMove(props.id, 'down')}><Arrow /></button>
    </div>
  </div>
};

export default ListCard;