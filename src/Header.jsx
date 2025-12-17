import Button from "./Button.jsx";
import { useContext } from "react";
import { OptionsContext } from "./contexts.js";
import OptionsMenu from "./OptionsMenu.jsx";
import { StarIcon, Bars3Icon } from "@heroicons/react/16/solid/index.js";

function Header() {
  const { setOptions } = useContext(OptionsContext);

  function handleOptions() {
    setOptions((o) => !o);
  }

  function handleNewTab() {
    window.open(
      "https://github.com/cxnexion/P-Time",
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <>
      <div className="flex w-[90vw] max-w-xl justify-between justify-self-center p-4">
        <h1 className="flex text-2xl font-bold text-white">P-time</h1>
        <div className="flex gap-4">
          <Button
            onClick={handleOptions}
            content={
              <Bars3Icon
                className="scale-150 fill-white"
                aria-label="Options"
              />
            }
          />
          <Button
            onClick={handleNewTab}
            content={<StarIcon className="scale-150 fill-white" />}
            aria-label="Star P-Time on GitHub"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
