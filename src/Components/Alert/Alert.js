import './Alert.css';
import { useDispatch } from 'react-redux'
import { uiActions } from '../../store/ui';

const Alert = props => {
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(uiActions.hideAlert());
  }, props.time || 3000);
  return <div className="c-alert c-alert__show">{ props.message }</div>
};

export default Alert;