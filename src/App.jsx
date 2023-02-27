import "./App.css";

import { Provider, useDispatch } from "react-redux";

import Header from "./components/Header";
import store from "./store/store";
import Receipes from "./components/Receipes";

import { ErrorBoundary } from "react-error-boundary";

import ReceipeErrorBoundry from "./ErrorBoundries/ReceipeErrorBoundry";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <ErrorBoundary FallbackComponent={ReceipeErrorBoundry}>
        <Receipes />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
