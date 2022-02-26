import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Web3Provider } from "./utils/use-web3";
import { web3 } from "./providers/web3";

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider getLibrary={() => web3.eth}>
      <App />
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
