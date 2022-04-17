import likeImg from '../styles/images/like.png';
import disLikeImg from '../styles/images/dislike.png';
import '../styles/css/feedbackFeature.css';
import { useState } from 'react';
import { createFeedback, updateFeedback } from '../services/feedbackService.js';
import useLocalStorage from '../hooks/localStorage';

const EMPTY_FEEDBACK = { id: null, wasHelpful: null, comment: '' }

function FeedbackFeature() {
  const [ feedback, setFeedback ] = useLocalStorage('userFeedback', EMPTY_FEEDBACK);
  const { id, wasHelpful, comment } = feedback;
  const [msg, setMsg] = useState(null);
  const [isFormLocked, setIsFormLocked] = useLocalStorage('isFormLock', false);

  const clickedYesNo = (userChoice) => {
    if (isFormLocked) return;
    setFeedback({ id, wasHelpful: userChoice, comment });
  }

  const sendFeedback = async () => {
    try {
      setIsFormLocked(true);
      const createOrUpdateFunc = id ? updateFeedback : createFeedback;
      const data = await createOrUpdateFunc({ wasHelpful, comment }, id);
      setFeedback(data);
    } catch (err) {
      setIsFormLocked(false);
    }
  }

  function onEditFeedback() {
    setIsFormLocked(false);
  }

  function skip() {
    setFeedback(EMPTY_FEEDBACK);
    setIsFormLocked(false);
  }

  return (
    <div className="feedback-feature">
      {/* helpful area */}
      <article className="helpful-container">
        <p className="question-p">Is this page helpful?</p>

        <div className='yesno-container'>
          <span><img src={likeImg} className={wasHelpful === false ? "yesno-img opacity" : "yesno-img"}
            onClick={() => clickedYesNo(true)} alt="" /> Yes </span>
          <span><img src={disLikeImg} className={wasHelpful === true ? "yesno-img opacity" : "yesno-img"}
            onClick={() => clickedYesNo(false)} alt="" /> No</span>
        </div>

      </article>

      {/* additional feedback and submit buttons area */}
      <article className={wasHelpful !== null ? "show additional-container " : "additional-container"}>

        <textarea readOnly={isFormLocked} className="textarea"
          placeholder="Any additional feedback?" value={comment}
          onChange={e => setFeedback({ id, wasHelpful, comment: e.target.value })}
        />
        {!isFormLocked && <div className="buttons-div">
          <button className='skip-button' onClick={skip}>Skip</button>
          <button className='submit-button' onClick={sendFeedback}>Submit</button></div>}

        {isFormLocked && <div className='buttons-div'>
          <button className='edit-button' onClick={onEditFeedback} > Edit feedback </button></div>}

      </article>

      {/* pop up message */}
      {msg && <section className="popup-msg">
        <p>{msg}</p></section>}


    </div>
  );
}

export default FeedbackFeature;
