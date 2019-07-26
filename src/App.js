import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
class App extends React.Component {
  componentDidMount() {
    // console.log("App mounting")
   
      axios({
        url:
          "http://staging.clarolabs.in:7060/clarosupport/farmerinfo/farmer/schema/",
        method: "POST",
        data: {
          temp: "temp"
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          console.log("response from api:", res.data);
        })
        .catch(e => {
          console.log("error:", e);
        });
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
