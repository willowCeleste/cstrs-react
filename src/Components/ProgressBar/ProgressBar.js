import "./ProgressBar.css";

const ProgressBar = props => {
  const width = (props.progress /parseInt(props.max)) * 100;
  return (
    <>
      <div className="c-progress-bar">
        <div className="c-progress-bar__inner" key={width} style={{width: width + '%'}}>
        </div>
      </div>
      <div className="c-progress-bar__labels">
        <span>{props.minLabel}</span>
        <span>{props.maxLabel}</span>
      </div>
    </>
  )
  
};

export default ProgressBar;