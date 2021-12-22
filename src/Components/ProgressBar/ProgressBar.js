import "./ProgressBar.css";

const ProgressBar = props => {
  const width = (props.progress /parseInt(props.max)) * 100;

  return <div className="c-progress-bar">
    <div className="c-progress-bar__inner" style={{width: width + '%'}}></div>
  </div>
};

export default ProgressBar;