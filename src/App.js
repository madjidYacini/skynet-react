import React, { useState } from "react";
import bot from "./bot.jpg";
import "./App.css";
import useInput from "./hooks/useInput";
import axios from "axios";
import swal from "sweetalert";

function App() {
  const [view, setView] = useState(true);
  const [message, setMessage] = useState("");
  const [messageArray, pushMessages] = useState([]);
  //   const message = useInput();

  async function pushmsg() {
    try {
      let messageUser = {
        name: email.value,
        message: message
      };
      // pushMessages(messageUser);
      messageArray.push(messageUser);
      let result = await axios.get(`http://localhost:5000/task/${message}`);

      console.log(result);
      let resultPush = `the capital of ${result.data[0].name} is ${
        result.data[0].capital
      }`;
      let messageBot = {
        name: "bot",
        message: resultPush
      };
      messageArray.push(messageBot);
    } catch (error) {
      let resultPush = " sorry i cannot find the capital of this country";

      let messageBot = {
        name: "bot",
        message: resultPush
      };
      messageArray.push(messageBot);
    }
  }

  function changeView() {
    swal(
      `Hello ${email.value}!`,
      "this bot can find the capital of all countries, try it !",
      "success"
    );
    setView(false);
  }
  const email = useInput();
  const gender = useInput();
  if (view) {
    return (
      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-grey">Capital Finder</h3>

              <div className="box">
                <figure className="avatar">
                  <img src={bot} width={100} />
                </figure>

                <div className="field">
                  <div className="control">
                    <input
                      {...email}
                      className="input is-large"
                      type="text"
                      placeholder="Your nickname"
                      autofocus=""
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <span> you are a ...</span>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <input
                      {...gender}
                      type="radio"
                      value="MALE"
                      name="gender"
                    />{" "}
                    Male
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      {...gender}
                      type="radio"
                      value="FEMALE"
                      name="gender"
                    />{" "}
                    FEMALE
                  </div>
                </div>
                <button
                  onClick={changeView}
                  className="button is-block is-info is-large is-fullwidth"
                >
                  next step
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <>
        <div>
          {messageArray.map((message, k) => {
            if (message.name === "bot") {
              return (
                <p style={{ backgroundColor: "#effcbf" }} key={k}>
                  {message.name}: {message.message}
                </p>
              );
            } else {
              return (
                <p
                  style={{
                    backgroundColor: "#71a3f2",
                    marginRight: 0,
                    borderRaduis: 500
                  }}
                  key={k}
                >
                  {message.name}: {message.message}
                </p>
              );
            }
          })}
        </div>
        <div className="control fixed-bottom row" style={{ marginBottom: 20 }}>
          <div className="col-sm-11">
            {" "}
            <input
              onChange={e => {
                setMessage(e.target.value);
              }}
              className="input is-large"
              type="text"
              placeholder="Your nickname"
              autofocus=""
            />
          </div>
          <div className="col-sm-1">
            <button
              onClick={pushmsg}
              className="button is-block is-info is-large"
            >
              send
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default App;
