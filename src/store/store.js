// import main from "./reducers/";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import produce, { current } from "immer";
import initState from "./initState";
// const initState = {
//   ab: [],
// };
const main = produce((state = initState, action) => {
  const { data, type } = action;

  switch (type) {
    case "ADD_PEER":
      state[data.type].push(data.id);

      break;

    default:
      return state;
      break;
  }
});
const store = createStore(main /* preloadedState, */, composeWithDevTools());
// const Store = store();
export default store;
