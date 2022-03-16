import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducers from "./store/places-reducers";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log("====================================");
    console.log(err);
    console.log("====================================");
  });

const rootReducer = combineReducers({
  places: placesReducers,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
