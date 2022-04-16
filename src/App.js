import logo from './logo.svg';
import Like from './like.png';
import DisLike from './dislike.png';
import './App.css';
import { useState } from 'react';
import { feedbackService } from './services/feedbackService.js';


function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [wasHelpful, setWasHelpful] = useState(null);
  const [comment, setComment] = useState("");
  const [id, setId] = useState("");

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
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("you clicked submit", id);
    let method = id ? "PUT" : "POST";
    feedbackService.sendFeedback(id, { wasHelpful, comment }, method).then(x => {
      console.log(x);
      setId("/" + x.id);
    }
    );
  }

  return (
    <div className="app">
      <main className='main-container'>

        <article className="helpful-container">
          <h2>Is this page helpful?</h2>
          <div>
            <img src={Like} className={noClicked ? "opacity" : null}
              onClick={() => clickedYesNo(true)} alt="" /> Yes
            <img src={DisLike} className={yesClicked ? "opacity" : null}
              onClick={() => clickedYesNo(false)} alt="" /> No
          </div>
        </article>
        <article className={yesClicked || noClicked ? "additional-container show" : "additional-container"}>
          <textarea className="textarea" placeholder="any additional feedback?" value={comment}
            onChange={e => setComment(e.target.value)} />
          <div className="buttons-div"><button>Skip</button> <button onClick={handleSubmit}>Submit</button></div>
        </article>
        
      </main>
    </div>
  );
}

export default App;
