import "./App.css";

import { Provider } from "react-redux";

import Header from "./components/Header";
import store from "./store/store";
import Receipes from "./components/Receipes";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Receipes />
    </Provider>
  );
}

export default App;
