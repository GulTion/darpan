// import { useEffect } from "react";
import PeerMake from "./components/PeerMake";
// import RemoteList from "./components/RemoteList";
import SP from "./components/SP";
// import logo from "./logo.svg";
// import store from "./store/store";
import "./_App.scss";

function App() {
  // useEffect(() => {
  //   console.log(store);
  // });
  return (
    <div className="App">
      {/* <PeerMake /> */}
      <SP />
      <h1>Hello</h1>
      {/* <RemoteList /> */}
    </div>
  );
}

export default App;
