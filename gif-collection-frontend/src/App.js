import "./App.css";
import { useState, useCallback, useEffect } from "react";
import { addGif, getGifs, updateGif } from "./utils/collections";
import { login } from "./utils/near";
import { Buffer } from "buffer";

window.Buffer = Buffer;

const App = () => {
  const account = window.walletConnection.account();
  const [gifs, setGifs] = useState([]);
  const [inputValue, setInputValue] = useState("");


  const fetchGifs = useCallback(async () => {
    if (account.accountId) setGifs(await getGifs());
  }, []);

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={login}
    >
      Connect to Wallet
    </button>
  );

  const onInputChange = event => {
    const { value } = event.target;
    setInputValue(value)
  }

  const sendGif = async () => {
    if (inputValue.length === 0) {
      console.log("No gif link given...")
      return;
    }
    setInputValue('');
    console.log("Gif link: ", inputValue);

    try {
      await addGif(inputValue, account.accountId);
    } catch (error) {
      console.error(error);
    }
  }

  const upvote = async item => {
    try {
      await updateGif(item.gifLink)
    } catch (error) {
      console.error(error);
    }
  }

  const renderConnectedContainer = () => {
    return (
      <div className="connected-container">
        <form
          onSubmit={event => {
            event.preventDefault();
            sendGif();
          }
          }
        >
          <input
            type="text"
            placeholder="Enter gif link please..."
            value={inputValue}
            onChange={onInputChange}
          />
          <button type="submit" className="cta-button submit-gif-button">Submit</button>
        </form>
        <div className="gif-grid">
          {gifs.map((item, index) => (
            <div className="gif-item" key={index}>
              <img src={item.gif_link} alt='A gif' />
              <button onClick={() => upvote(item)}>Upvote</button>
              <div>Votes: {item.votes}</div>
              <div className="user-address">{item.user_address}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }


  useEffect(() => {
    fetchGifs()
  }, []);
  return (
    <div>
      {account.accountId ? renderConnectedContainer() : renderNotConnectedContainer()}
    </div>
  );
}

export default App;
