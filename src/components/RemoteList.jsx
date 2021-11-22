import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./_One.scss";
export default connect((state) => ({ remotes: state.remotes }))(
  function RemoteList({ remotes }) {
    const vidRef = useRef();

    const handleCall = (id) => {
      // document.remotes[id].send("hi");
      return async () => {
        let stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        var call = document.me.call(id, stream);
        call.on("stream", function (remoteStream) {
          vidRef.current.srcObject = remoteStream;
          vidRef.current.addEventListener("touchmove", (e) => {
            document.clients[id].send(e);
          });
        });
      };
    };
    useEffect(() => {
      document.me.on("call", async function (call) {
        // let stream = await navigator.mediaDevices.getDisplayMedia({
        //   // video: true,
        //   audio: true,
        // });

        call.answer(null); // Answer the call with an A/V stream.
        call.on("stream", function (remoteStream) {
          // Show stream in some video/canvas element.
          // console.log(call)
          vidRef.current.srcObject = remoteStream;
          // console.log(call);
          // document.clients[pee]
          vidRef.current.addEventListener("mousemove", (e) => {
            const { videoWidth, videoHeight } = vidRef.current;
            // console.log(window.screen);
            let { top, left, width, height } =
              vidRef.current.getBoundingClientRect();
            const { x, y } = e;
            // document.client[call.peer].send(JSON.stringify({ ...e }));
            let arr = [
              Math.round(((x - left) * videoWidth) / width),
              Math.round(((y - top) * videoHeight) / height),
            ];
            // document.socket.emit("mousemove", arr);
            document.client[call.peer].send(arr);
          });
          // console.log([e.movementX, e.movementY]);
        });
        //   vidRef.current.addEventListener("mousemove", (e) => {
        //     // document.client[call.peer].send(JSON.stringify({ ...e }));
        //     console.table(e);
        //   });
        // });
      });
    }, []);
    return (
      <div className="RemoteList">
        {remotes?.map((e) => {
          return (
            <div key={e}>
              {" "}
              {e} <button onClick={handleCall(e)}>Call</button>
            </div>
          );
        })}
        <video className="RemoteList_video" ref={vidRef} autoPlay controls />
      </div>
    );
  }
);
