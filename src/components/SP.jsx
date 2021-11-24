import React, { useEffect, useState, useRef } from "react";
import SimplePeer from "simple-peer";
import Socket from "./Socket";
import { customAlphabet } from "nanoid";
import RemoteList from "./RemoteList";
import store from "../store/store";
import handShaker from "../utils/handShaker";
import signalManager from "../utils/signalManager";
const nanoid = customAlphabet("abcdef", 4);

export default function SP() {
  const [offer, setOffer] = useState({ offer: null, answer: null });
  const [id] = useState(nanoid());
  const [_id, set_id] = useState(null);
  const [havePeer, setPeer] = useState(false);
  const [init] = useState(window.location.hash === "#1");

  useEffect(() => {
    store.dispatch({ type: "ADD_ID", data: { id: id } });

    var p = new SimplePeer({
      initiator: init,
      trickle: false,
    });

    document.p = p;
    setPeer(true);
    // console.log(p);
    // window.p = p;
    p.on("signal", (data) => {
      console.log("SIGNAL", JSON.stringify(data));

      signalManager(data);
    });

    p.on("connect", () => {
      console.log("CONNECT");
      // store.dispatch({type:"EDIT_PEER", data:{id:}})

      p.on("data", (data) => {
        console.log("data: " + data);
      });

      p.send("whatever" + Math.random());
    });

    p.on("stream", function (remoteStream) {
      vidRef.current.srcObject = remoteStream;
      console.log("stream");
      // vidRef.current.addEventListener("touchmove", (e) => {
      //   document.clients[id].send(e);
      // });
    });
  }, []);
  const vidRef = useRef();

  const handleCall = (id) => {
    // document.remotes[id].send("hi");
    return async () => {
      let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      document.p.addStream(stream);
    };
  };

  const handleConnectSocekt = (e) => {
    e.target.style.display = "none";
    let cuId = init ? id : _id;

    document.socket.on(cuId, (data) => {
      // console.log(cuId, data);

      handShaker(id, data, cuId);
    });
    document.socket.emit("makeio", { id: cuId });
    document.socket.emit(cuId, { from: id, type: "JOIN", to: cuId });
  };

  return (
    <div className="SP">
      {init && <button onClick={handleConnectSocekt}>Connect</button>}
      {init && <button onClick={handleCall()}>Permission Stream</button>}
      {init && <input value={id} />}
      {window.location.hash !== "#1" && (
        <input value={_id} onChange={(e) => set_id(e.target.value)} />
      )}
      {window.location.hash !== "#1" && (
        <button onClick={handleConnectSocekt}>Connect</button>
      )}
      {havePeer && <Socket id={id} />}
      {init && <RemoteList />}

      {/* <button onClick={}>MakeCall</button> */}

      <video
        style={{ display: init ? "none" : "block" }}
        className="RemoteList_video"
        ref={vidRef}
        autoPlay
        controls
      />
    </div>
  );
}
