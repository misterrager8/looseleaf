import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import { MultiContext } from "./context";
import { useContext, useState } from "react";
import Nav from "./components/Nav";
import Editor from "./components/forms/Editor";
import Input from "./components/atoms/Input";
import Button from "./components/atoms/Button";
import { useHotkeys } from "react-hotkeys-hook";

export default function Display() {
  const multiCtx = useContext(MultiContext);
  const [changingDir, setChangingDir] = useState(false);
  const onChangeHomeDir = (e) => multiCtx.setHomeDir(e.target.value);

  const changeHomeDir = (e) => {
    e.preventDefault();
    localStorage.setItem("looseleaf-home-dir", multiCtx.homeDir);
    multiCtx.getAll();
    multiCtx.setCurrentNote(null);
    setChangingDir(false);
  };

  useHotkeys(
    "shift+d",
    () => multiCtx.setDistractionFree(!multiCtx.distractionFree),
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
  );

  return (
    <div>
      {!multiCtx.distractionFree ? (
        <>
          <Nav />
          <div className="body">
            <div className="between">
              <div className="d-flex w-100">
                <Button
                  active={changingDir}
                  icon="mdi:seed-outline"
                  onClick={() => setChangingDir(!changingDir)}
                />
                <form className="w-75" onSubmit={(e) => changeHomeDir(e)}>
                  <Input
                    className="fst-italic"
                    border={false}
                    disabled={!changingDir}
                    value={multiCtx.homeDir}
                    onChange={onChangeHomeDir}
                  />
                </form>
              </div>
              <div>
                <Button
                  onClick={() =>
                    multiCtx.setDistractionFree(!multiCtx.distractionFree)
                  }
                  active={multiCtx.distractionFree}
                  icon="ri:focus-3-fill"
                />
              </div>
            </div>
            {multiCtx.currentNote && <Editor />}
          </div>
        </>
      ) : (
        <div className="" style={{ padding: "10px" }}>
          <Editor />
        </div>
      )}
    </div>
  );
}
