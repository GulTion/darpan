import store from "../store/store";
const handShaker = (myid, data, uid) => {
  let sender = (_data) => document.socket.emit();
  const { signalApi } = document;

  if (data.from !== myid) {
    switch (data.type) {
      case "JOIN":
        if (data.to === myid)
          store.dispatch({
            type: "ADD_PEER",
            data: { id: data.from, type: "remotes" },
          });
        break;

      case "OFFER":
        if (data.to === myid) {
          signalApi.haveToAnwser = data.from;
          signalApi.offerType = data.offerType;
          document.p.signal(data.offer);
        }
        break;

      case "ANSWER":
        if (data.to === myid) {
          // signalApi.haveToAnwser = data.from
          // signalApi.offerType=data.offerType
          console.log(data);
          document.p.signal(data.offer);
          store.dispatch({
            type: "EDIT_PEER",
            data: { id: data.from, connected: true, type: "remotes" },
          });
        }

      default:
        break;
    }
  } else {
  }
};

export default handShaker;
