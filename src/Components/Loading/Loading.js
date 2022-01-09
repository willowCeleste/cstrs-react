import "./Loading.css";

const Loading = () => {
  return <div className="c-loading">
    <div className="c-loading__inner">
      <span className="c-loading__text">Hang on!</span>
      <div className="c-loading__bubble"></div>
      <div className="c-loading__bubble"></div>
    <div className="c-loading__bubble"></div>
    </div>
  </div>
};

export default Loading;