import "./Pager.css";
import Arrow from "../SVGs/Arrow";

const Pager = props => {
  const renderPrevious = () => {
    return props.currentPage > 1 ? <button className="c-pager__arrow" onClick={() => props.onPrevious(props.currentPage - 1)}><Arrow /></button> : <span></span>
  };

  const renderNext = () => {
    return props.currentPage !== props.totalPages  ? <button className="c-pager__arrow c-pager__arrow__next" onClick={() => props.onNext(props.currentPage + 1)}><Arrow /></button> : <span></span>
  };

  return (
    <div className="c-pager">
      {renderPrevious()}
      <span className="c-pager__pages">Page {props.currentPage} of {props.totalPages}</span>
      {renderNext()}
    </div>
  );
};

export default Pager;