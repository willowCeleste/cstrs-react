import "./ListCard.css";
import Title from "../Title/Title";
import Arrow from "../SVGs/Arrow";
import Trash from "../SVGs/Trash";

const ListCard = props => {
  return <div className={`c-list-card${props.type === 'checklist' && props.completed ? ' c-list-card--completed' : ''}`}>
    {props.edit ? <button className="c-list-card__delete" onClick={() => props.onDelete(props.id)}><Trash /></button> : ''}
    {props.type === 'checklist' 
      ? <input className="c-list-card__checkbox" type="checkbox" checked={props.completed} disabled /> 
      : (
          props.type === 'unranked' 
            ? ''
            : (
              <div className="c-list-card__rank">{props.rank}</div>
        )
    )}
    <div>
      <Title text={props.title} size="small" />
      {props.subtitle ? <h3 className="c-list-card__subtitle">{props.subtitle}</h3> : ''}
      {props.description ? <p className="o-paragraph o-paragraph--small">{props.description}</p>: ''}
    </div>
    {props.edit && (
      <div className="c-list-card__buttons">
        {props.rank !== 1 && <button className="c-list-card__button c-list-card__button--up" onClick={() => props.onMove(props.id, 'up')}><Arrow /></button> }
        <button className="c-list-card__button c-list-card__button--down" onClick={() => props.onMove(props.id, 'down')}><Arrow /></button>
      </div>
    )}
  </div>
};

export default ListCard;