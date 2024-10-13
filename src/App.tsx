import { useState } from "react";
import { runBigTask, runBigTaskAsync } from "./utils";
import { wrap } from "comlink";

function App() {
  const [data, setData] = useState<string>();
  return (
    <div
      style={{
        backgroundColor: `${data} === 'loading` ? "orange" : "transparent",
      }}
    >
      <button
        onClick={() => {
          console.log("Test");
        }}
      >
        Test
      </button>
      <button
        onClick={() => {
          setData("loading");
          setData(runBigTask(100));
        }}
      >
        Sync on Main thread
      </button>
      <button
        onClick={async () => {
          setData("loading");
          setData(await runBigTaskAsync(100));
        }}
      >
        Async on Main thread
      </button>
      <button
        onClick={async () => {
          setData("loading");
          const worker = new Worker("./worker", {
            name: "runBigTaskWorker",
            type: "module",
          });
          const { runBigTask } =
            wrap<import("./worker").RunBigTaskWorker>(worker);
          setData(await runBigTask(100));
        }}
      >
        Web Worker
      </button>
      <span>{data}</span>
    </div>
  );
}

export default App;
