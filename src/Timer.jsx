import { useContext, useEffect, useState } from "react";
import { ConfigContext, PhaseBgContext } from "./contexts.js";
import Button from "./Button.jsx";
import { ForwardIcon, XMarkIcon } from "@heroicons/react/16/solid/index.js";
import ringFile from "./assets/ring.mp3";

function Timer() {
  const { setPhaseBg } = useContext(PhaseBgContext);
  const { config } = useContext(ConfigContext);
  const [phase, setPhase] = useState("work");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.work * 60);
  const [count, setCount] = useState(1);

  const minutesLeft = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secondsLeft = String(Math.floor(timeLeft % 60)).padStart(2, "0");

  const ring = new Audio(ringFile);
  ring.volume = config.volume / 100;

  useEffect(() => {
    if (!isRunning) {
      document.title = "P-Time";
    } else {
      let phaseName;

      switch (phase) {
        case "work":
          phaseName = "Work";
          break;
        case "shortBr":
          phaseName = "Short Break";
          break;
        case "longBr":
          phaseName = "Long Break";
          break;
      }

      document.title = `${minutesLeft}:${secondsLeft} - ${phaseName}`;
    }
  }, [timeLeft, isRunning, minutesLeft, secondsLeft]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  let activeClass = "work";

  switch (phase) {
    case "work":
      activeClass = "[&>*:nth-child(1)]:bg-black/20";
      break;
    case "shortBr":
      activeClass = "[&>*:nth-child(2)]:bg-black/20";
      break;
    case "longBr":
      activeClass = "[&>*:nth-child(3)]:bg-black/20";
      break;
  }

  function handlePhaseChange(newPhase) {
    switch (newPhase) {
      case "work":
        setPhaseBg("bg-red-700/70");
        setTimeLeft(config.work * 60);
        setPhase("work");
        break;
      case "shortBr":
        setPhaseBg("bg-teal-700/70");
        setTimeLeft(config.shortBreak * 60);
        setPhase("shortBr");
        break;
      case "longBr":
        setTimeLeft(config.longBreak * 60);
        setPhase("longBr");
        setPhaseBg("bg-green-700/70");
        break;
      default:
        void ring.play();
        switch (phase) {
          case "work":
            setCount((c) => c + 1);
            count % 4 === 0
              ? handlePhaseChange("longBr")
              : handlePhaseChange("shortBr");
            break;
          case "shortBr":
          case "longBr":
            handlePhaseChange("work");
            break;
        }
    }

    if (config.autoStop) {
      setIsRunning(false);
    }
  }

  function handleToggleTimer() {
    setIsRunning((i) => !i);
  }

  return (
    <div className="flex w-[90vw] max-w-xl flex-col justify-center gap-6 rounded-lg bg-red-300/40 p-4 text-center text-white">
      <div
        className={`flex justify-between gap-4 text-2xl ${activeClass} font-bold`}
      >
        <button
          className="w-1/3 rounded-lg p-2 hover:bg-black/10"
          onClick={() => handlePhaseChange("work")}
        >
          Work
        </button>
        <button
          className="w-1/3 rounded-lg p-2 hover:bg-black/10"
          onClick={() => handlePhaseChange("shortBr")}
        >
          Short Break
        </button>
        <button
          className="w-1/3 rounded-lg p-2 hover:bg-black/10"
          onClick={() => handlePhaseChange("longBr")}
        >
          Long Break
        </button>
      </div>
      <div className="relative self-center">
        <p className="w-fit text-8xl font-bold">
          {minutesLeft}:{secondsLeft}
        </p>
        <Button
          overrides={"absolute top-[40%] left-[-15%]"}
          onClick={() => {
            setCount(1);
            setIsRunning(false);
            handlePhaseChange("work");
          }}
          content={<XMarkIcon className="scale-200" aria-label="Reset timer" />}
        ></Button>
        <Button
          overrides={"absolute top-[40%] right-[-15%]"}
          onClick={() => handlePhaseChange("next")}
          content={
            <ForwardIcon
              className="scale-150"
              aria-label="Skip to next phase"
            />
          }
        ></Button>
      </div>
      <Button
        onClick={handleToggleTimer}
        overrides="!w-full !text-8xl h-fit font-black !rounded-lg !bg-black/10 hover:!bg-black/20 active:!translate-y-0 active:!bg-black/40"
        content={<p>{isRunning ? "STOP" : "START"}</p>}
      />
      <p className="pb-2 text-4xl">#{count}</p>
    </div>
  );
}

export default Timer;
