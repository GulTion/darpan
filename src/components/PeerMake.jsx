import React, { useEffect, useState } from "react";
import Peer from "peerjs";
import "./_One.scss";
import { customAlphabet } from "nanoid";
import { connect } from "react-redux";
const nanoid = customAlphabet("1234567890", 12);
//=> "4f90d13a42"
document.remote = {};
document.client = {};
export default connect(
  (state) => ({}),
  (dispatch) => ({
    addPeer: ({ type, id }) =>
      dispatch({ type: "ADD_PEER", data: { type, id } }),
  })
)(function PeerMake({ addPeer }) {
  const [key, setKey] = useState("Key is Loading...");
  const [youKey, setYouKey] = useState("");
  const handleSetYouKey = (e) => {
    let key = e.target.value;
    setYouKey(key);
  };

  const makeConnection = () => {
    // document.client.connect(youKey)
    var client = document.me.connect(youKey);
    client.on("open", () => {
      client.on("data", (data) => {
        console.log(data);
      });
      //   setInterval(() => {
      client.send(new Date().toTimeString());
      document.client[youKey] = client;
      addPeer({ type: "clients", id: youKey });

      //   }, 500);
    });
  };

  useEffect(() => {
    let client = new Peer(nanoid());
    client.on("open", (id) => {
      document.me = client;
      console.log(id);
      setKey(id);
    });

    // when client make connection to someone, and he is waiting for connection
    client.on("connection", function (remote) {
      remote.on("open", () => {
        remote.on("data", function (data) {
          console.log("Incoming data", data);
          //   remote.send("Left");
        });
        document.remote[remote.peer] = remote;
        addPeer({ type: "remotes", id: remote.peer });
      });
    });

    //   remote.send("hi");
    //   remote.send({ hi: "hi" });
  }, []);
  return (
    <div className="PeerMake">
      <input className="PeerMake_input_me" type="text" value={key} />
      <input
        className="PeerMake_input_you"
        type="text"
        placeholder="enter key.."
        value={youKey}
        onChange={handleSetYouKey}
        onBlur={makeConnection}
      />
    </div>
  );
});
