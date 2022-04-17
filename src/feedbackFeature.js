import Like from './like.png';
import DisLike from './dislike.png';
import './feedbackFeature.css';
import { useState } from 'react';
import { feedbackService } from './services/feedbackService.js';


function FeedbackFeature() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [wasHelpful, setWasHelpful] = useState(null);
  const [comment, setComment] = useState("");
  const [id, setId] = useState("");
  const [msg, setMsg] = useState(null);
  const [lockTextarea, setLockTextarea] = useState(false);

  const clickedYesNo = (userChoice) => {
    if (lockTextarea) return;
    if (userChoice) {
      setYesClicked(true);
      setNoClicked(false);
    } else {
      setNoClicked(true);
      setYesClicked(false);
    }
    setWasHelpful(userChoice);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let method = id ? "PUT" : "POST";
    feedbackService.sendFeedback(id, { wasHelpful, comment }, method).then(x => {
      setId("/" + x.id);
      setMsg("sending...");
      setTimeout(() => { setMsg(null) }, 2500);
      setTimeout(() => { setMsg(x.msg) }, 4500);
      setTimeout(() => { setMsg(null) }, 7000);
      setLockTextarea(true);
    }
    );
  }

  function onEditFeedback() {
    setLockTextarea(false);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="feedback-feature">
      {/* helpful area */}
      <article className="helpful-container">
        <p className="question-p">Is this page helpful?</p>

        <div className='yesno-container'>
          <span><img src={Like} className={noClicked ? "yesno-img opacity" : "yesno-img"}
            onClick={() => clickedYesNo(true)} alt="" /> Yes </span>
          <span><img src={DisLike} className={yesClicked ? "yesno-img opacity" : "yesno-img"}
            onClick={() => clickedYesNo(false)} alt="" /> No</span>
        </div>

      </article>

      {/* additional feedback and submit buttons area */}
      <article className={yesClicked || noClicked ? "show additional-container " : "additional-container"}>

        <textarea readOnly={lockTextarea} className="textarea"
          placeholder="Any additional feedback?" value={comment}
          onChange={e => setComment(e.target.value)}
        />
        {!lockTextarea && <div className="buttons-div">
          <button className='skip-button' onClick={refreshPage}>Skip</button>
          <button className='submit-button' onClick={handleSubmit}>Submit</button></div>}

        {lockTextarea && <div className='buttons-div'>
          <button className='edit-button' onClick={onEditFeedback} > Edit feedback </button></div>}

      </article>

      {/* pop up message */}
      {msg && <section className="popup-msg">
        <p>{msg}</p></section>}


    </div>
  );
}

export default FeedbackFeature;
