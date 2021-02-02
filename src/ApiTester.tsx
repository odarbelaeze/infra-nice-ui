import React, { useState, useCallback } from "react";
import "./ApiTester.css";

interface Props {
  url: string;
}

interface State {
  state: "idle" | "fetching" | "error" | "success";
  data: string;
}

const ApiTester: React.FC<Props> = ({ url }: Props) => {
  const [state, setState] = useState<State>({ state: "idle", data: "" });
  const test = useCallback(async () => {
    setState({
      state: "fetching",
      data: "",
    });
    try {
      const result = await fetch(url);
      const text = await result.text();
      if (result.status === 200) {
        try {
          setState({
            state: "success",
            data: JSON.stringify(JSON.parse(text), null, 2),
          });
        } catch {
          setState({
            state: "error",
            data: `The result doesn't look like json:\n${text.slice(0, 40)}`,
          });
        }
      } else {
        setState({
          state: "error",
          data: `can't communicate with the api yet, got status ${result.status}`,
        });
      }
    } catch {
      setState({
        state: "error",
        data: "can't communicate with the api yet",
      });
    }
  }, [url]);
  return (
    <div className="ApiTester">
      <h3 className="ApiTester-title">
        <button className="ApiTester-button" onClick={test}>
          Test
        </button>{" "}
        your connection to <code>{url}</code>
      </h3>
      <code className={`ApiTester-result ${state.state}`}>
        {state.state === "fetching" && <pre>checking...</pre>}
        {state.state === "idle" && <pre>no results yet...</pre>}
        {(state.state === "error" || state.state === "success") && (
          <pre>{state.data}</pre>
        )}
      </code>
    </div>
  );
};

export default ApiTester;
