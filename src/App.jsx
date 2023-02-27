import "./App.css";

import { Provider } from "react-redux";

import Header from "./components/Header";
import Receipes from "./components/Receipes";
import store from "./store/store";

import { ErrorBoundary } from "react-error-boundary";

import ReceipeErrorBoundry from "./ErrorBoundries/ReceipeErrorBoundry";

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ReceipeErrorBoundry}>
        <Header />
        <Receipes />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
