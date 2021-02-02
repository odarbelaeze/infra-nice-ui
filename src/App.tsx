import React from "react";
import mockServer from "./mockServer";
import ApiTester from "./ApiTester";

import "./App.css";

mockServer();

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <div className="App-wrapper">
        <header className="App-header">
          <h1>Nice UI for you!</h1>
        </header>
        <main>
          <ApiTester url="/api/teama" />
          <ApiTester url="/api/teamb" />
        </main>
      </div>
    </div>
  );
};

export default App;
