import logo from './logo.svg';
import Like from './like.png';
import DisLike from './dislike.png';
import './App.css';
import { useState } from 'react';
import { feedbackService } from './services/feedbackService.js';


function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [wasHelpful, setWasHelpful] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false);
  const [commentText, setCommentText] = useState("")

  const clickedYesNo = (userChoice) => {
    // (userChoice) ? setYesClicked(!yesClicked) : setNoClicked(!noClicked);
    if (userChoice) {
      setYesClicked(true);
      setNoClicked(false);
    } else {
      setNoClicked(true);
      setYesClicked(false);
    }
    setWasHelpful(userChoice);
    setShowFeedback(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    feedbackService.sendFeedback(commentText, wasHelpful);
  }

  return (
    <div className="app">
      <main className='main-container'>



        <article className="helpful-container">
          <h2>Is this page helpful?</h2>
          <div>
            <img src={Like} className={noClicked ? "opacity" : null}
              onClick={() => clickedYesNo(true)} /> Yes
            <img src={DisLike} className={yesClicked ? "opacity" : null}
              onClick={() => clickedYesNo(false)} /> No
          </div>
        </article>
        <article className={showFeedback ? "additional-container show" : "additional-container"}>
          <textarea className="textarea-div" placeholder="any additional feedback?" value={commentText}
            onChange={e => setCommentText(e.target.value)} />
          <div className="buttons-div"><button>Skip</button> <button onClick={handleSubmit}>Submit</button></div>
        </article>

      </main>
    </div>
  );
}

export default App;
