import Header from "./Header.jsx";
import OptionsMenu from "./OptionsMenu.jsx";
import { useEffect, useState } from "react";
import Timer from "./Timer.jsx";
import { ConfigContext, OptionsContext, PhaseBgContext } from "./contexts.js";

function App() {
  if (localStorage.getItem("config") === null) {
    localStorage.setItem(
      "config",
      JSON.stringify({
        work: 25,
        shortBreak: 5,
        longBreak: 15,
        volume: 100,
        autoStop: true,
      }),
    );
  }

  const [options, setOptions] = useState(false);
  const [config, setConfig] = useState(
    JSON.parse(localStorage.getItem("config")),
  );
  const [phaseBg, setPhaseBg] = useState("bg-red-700/70");

  useEffect(() => {
    localStorage.setItem("config", JSON.stringify(config));
  }, [config]);

  return (
    <PhaseBgContext value={{ phaseBg, setPhaseBg }}>
      <ConfigContext value={{ config, setConfig }}>
        <OptionsContext value={{ options, setOptions }}>
          {options && <OptionsMenu />}
          <div
            className={`${phaseBg} flex h-screen flex-col items-center antialiased transition-colors duration-250 ease-in-out`}
          >
            <Header />
            <Timer />
          </div>
        </OptionsContext>
      </ConfigContext>
    </PhaseBgContext>
  );
}

export default App;
