import React from "react";
import "./App.css";
import MainScreen from "./components/MainScreen";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <MainScreen />
      </div>
    </Provider>
  );
}

export default App;
