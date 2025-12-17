import { useContext } from "react";
import { ConfigContext, OptionsContext } from "./contexts.js";
import Button from "./Button.jsx";
import {
  ArrowPathIcon,
  SpeakerWaveIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid/index.js";
import ringFile from "./assets/ring.mp3";

function OptionsMenu() {
  const { setOptions } = useContext(OptionsContext);
  const { config, setConfig } = useContext(ConfigContext);

  const ring = new Audio(ringFile);
  ring.volume = config.volume / 100;

  function handleCloseOptions() {
    setOptions(false);
  }

  function handleOptionsReset() {
    setConfig({ work: 25, shortBreak: 5, longBreak: 15, volume: 100 });
  }

  function handleOptionsClick(e) {
    e.stopPropagation();
  }

  function handleWorkChange(e) {
    setConfig((c) => ({ ...c, work: e.target.value }));
  }

  function handleShortBreakChange(e) {
    setConfig((c) => ({ ...c, shortBreak: e.target.value }));
  }

  function handleLongBreakChange(e) {
    setConfig((c) => ({ ...c, longBreak: e.target.value }));
  }

  function handleLoudnessChange(e) {
    setConfig((c) => ({ ...c, volume: e.target.value }));
  }

  function handleAutoStopChange(e) {
    setConfig((c) => ({ ...c, autoStop: e.target.checked }));
  }

  function handleTestSound() {
    if (ring.paused) {
      void ring.play();
    } else {
      ring.currentTime = 0;
    }
  }
  return (
    <div
      className="fixed z-10 h-screen w-screen bg-black/50"
      onClick={handleCloseOptions}
    >
      <div
        className="mt-12 flex w-[90vw] max-w-lg flex-col gap-4 justify-self-center rounded-xl bg-white p-8 text-xl font-bold text-neutral-700"
        onClick={handleOptionsClick}
      >
        <Button
          aria-label="Reset options to default"
          onClick={handleOptionsReset}
          overrides={"self-start absolute !bg-black/20 hover:!bg-black/40"}
          content={<ArrowPathIcon className="scale-150" />}
        />
        <Button
          aria-label="Close options menu"
          onClick={handleCloseOptions}
          overrides="self-end absolute !bg-black/20 hover:!bg-black/40"
          content={<XMarkIcon className="scale-200" />}
        />
        <header className="flex flex-col justify-center p-2">
          <h2 className="self-center text-2xl text-neutral-500">Options</h2>
        </header>
        <section className="flex flex-col gap-4">
          <h3 className="text-neutral-500">Timer setting</h3>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="work-duration">Work duration:</label>
            <input
              className="w-24 rounded-lg border-2 p-1 text-center text-xl outline-0"
              type="number"
              id="work-duration"
              min={1}
              max={60}
              value={config.work}
              onChange={handleWorkChange}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="short-break-duration">Short break duration:</label>
            <input
              className="w-24 rounded-lg border-2 p-1 text-center text-xl outline-0"
              type="number"
              id="short-break-duration"
              min={1}
              max={60}
              value={config.shortBreak}
              onChange={handleShortBreakChange}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="long-break-duration">Long break duration:</label>
            <input
              className="w-24 rounded-lg border-2 p-1 text-center text-xl outline-0"
              type="number"
              id="long-break-duration"
              min={1}
              max={60}
              value={config.longBreak}
              onChange={handleLongBreakChange}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="auto-stop">Auto stop:</label>
            <input
              id="auto-stop"
              className="size-8 rounded-lg border-2 p-1"
              type="checkbox"
              checked={config.autoStop}
              onChange={handleAutoStopChange}
            />
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h3 className="text-neutral-500">Sound</h3>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="ring-loudness" className="flex-1">
              Ring loudness:
            </label>
            <p>{config.volume}%</p>
            <input
              type="range"
              id="ring-loudness"
              min={0}
              max={100}
              step={10}
              onChange={handleLoudnessChange}
              value={config.volume}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label>Test sound:</label>
            <Button
              aria-label="Test ring sound"
              onClick={handleTestSound}
              overrides="!bg-black/20 hover:!bg-black/40"
              content={<SpeakerWaveIcon className="scale-150" />}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default OptionsMenu;
