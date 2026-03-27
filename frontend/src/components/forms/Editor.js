import { useContext, useEffect, useState } from "react";
import Input from "../atoms/Input";
import { MultiContext } from "../../context";
import markdownit from "markdown-it";
import Button from "../atoms/Button";
import Dropdown from "../atoms/Dropdown";
import { v4 as uuidv4 } from "uuid";
import TextArea from "./editor/TextArea";

export default function Editor() {
  const multiCtx = useContext(MultiContext);

  const [name, setName] = useState("");
  const [mode, setMode] = useState(
    localStorage.getItem("looseleaf-mode") || "split",
  );

  const [deleting, setDeleting] = useState(false);

  const onChangeFontSize = (e) => multiCtx.setFontSize(e.target.value);
  const onChangeName = (e) => setName(e.target.value);
  const [sizeChanged, setSizeChanged] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("looseleaf-theme") || "light",
  );

  const saveFontSize = () => {
    localStorage.setItem("looseleaf-font-size", multiCtx.fontSize);
    setSizeChanged(false);
  };

  useEffect(() => {
    setSizeChanged(
      localStorage.getItem("looseleaf-font-size") !== multiCtx.fontSize,
    );
  }, [multiCtx.fontSize]);

  useEffect(() => {
    setName(multiCtx.currentNote?.name);
    multiCtx.setContent(multiCtx.currentNote?.content);
  }, [multiCtx.currentNote]);

  useEffect(() => {
    localStorage.setItem("looseleaf-mode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("looseleaf-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themes = [
    "light",
    "nebula-sapphire",
    "sky-navy",
    "navy-bumblebee",
    "double-plum",
    "lavender-sky",
    "lavender-emerald",
    "ruby-marmalade",
    "aqua-marigold",
    "raven-mustard",
    "dark",
    "aqua-lilac",
    "eggplant-plum",
    "citrus-apple",
    "grass-ice",
    "moss-lime",
    "eggplant-sky",
    "marigold-sky",
    "evergreen-nebula",
  ];

  return (
    <form onSubmit={(e) => multiCtx.renameNote(e, name)}>
      {multiCtx.distractionFree ? (
        <div className="between">
          <div>
            <Button
              onClick={() => multiCtx.editNote(multiCtx.content)}
              className={
                multiCtx.currentNote?.content === multiCtx.content
                  ? " green"
                  : " orange"
              }
              icon={
                multiCtx.currentNote?.content === multiCtx.content
                  ? "dashicons:saved"
                  : "carbon:unsaved"
              }
            />
            <span className="ps-2 small">{multiCtx.currentNote?.name}</span>
          </div>
          <div>
            {multiCtx.distractionFree && (
              <>
                <Button
                  className="mx-1"
                  onClick={() => setMode("write")}
                  active={mode === "write"}
                  icon="streamline-ultimate:content-pen-write"
                />
                <Button
                  className="mx-1"
                  onClick={() => setMode("read")}
                  active={mode === "read"}
                  icon="gg:read"
                />
                <Button
                  className="mx-1"
                  onClick={() => setMode("split")}
                  active={mode === "split"}
                  icon="sidekickicons:view-split-20-solid"
                />
                <Dropdown
                  classNameBtn="text-capitalize"
                  classNameMenu="text-center"
                  target="themes"
                  icon="bxs:color-fill"
                  showCaret={true}>
                  {themes.map((x) => (
                    <a
                      key={uuidv4()}
                      onClick={() => setTheme(x)}
                      className={
                        (theme === x ? "active" : "") +
                        " dropdown-item text-capitalize"
                      }>
                      {x}
                    </a>
                  ))}
                </Dropdown>
              </>
            )}
            <Button
              onClick={() =>
                multiCtx.setDistractionFree(!multiCtx.distractionFree)
              }
              active={multiCtx.distractionFree}
              icon="ri:focus-3-fill"
            />
          </div>
        </div>
      ) : (
        <div className="d-flex">
          <div className="d-flex my-auto">
            <Button
              onClick={() => multiCtx.setCurrentNote(null)}
              className="px-1"
              icon="dashicons:exit"
            />
            <Button
              onClick={() => multiCtx.editNote(multiCtx.content)}
              className={
                "px-1" +
                (multiCtx.currentNote?.content === multiCtx.content
                  ? " green"
                  : " orange")
              }
              icon={
                multiCtx.currentNote?.content === multiCtx.content
                  ? "dashicons:saved"
                  : "carbon:unsaved"
              }
            />
          </div>
          <Input className="title-input" value={name} onChange={onChangeName} />
          <div className="d-flex my-auto">
            <Dropdown
              icon="game-icons:tree-branch"
              target="change-folder"
              text={
                multiCtx.currentNote.folder ? multiCtx.currentNote.folder : "-"
              }>
              <a
                onClick={() => multiCtx.changeFolder(null)}
                className="dropdown-item">
                No Folder
              </a>
              {multiCtx.folders.map((x) => (
                <a
                  key={uuidv4()}
                  onClick={() => multiCtx.changeFolder(x.name)}
                  className={
                    "dropdown-item" +
                    (x.name === multiCtx.currentNote?.folder ? " active" : "")
                  }>
                  {x.name}
                </a>
              ))}
            </Dropdown>

            <Button
              className="red"
              onClick={() => multiCtx.toggleBookmark()}
              icon={
                "bi:bookmark" + (multiCtx.currentNote?.favorited ? "-fill" : "")
              }
            />
            {deleting && (
              <Button
                className="red"
                onClick={() => {
                  multiCtx.deleteNote();
                  setDeleting(false);
                }}
                icon="pepicons-pop:question"
              />
            )}
            <Button
              className="red"
              onClick={() => setDeleting(!deleting)}
              icon="tdesign:delete-1"
            />

            <Button
              onClick={() => setMode("write")}
              active={mode === "write"}
              icon="streamline-ultimate:content-pen-write"
            />
            <Button
              onClick={() => setMode("read")}
              active={mode === "read"}
              icon="gg:read"
            />
            <Button
              onClick={() => setMode("split")}
              active={mode === "split"}
              icon="sidekickicons:view-split-20-solid"
            />
          </div>
        </div>
      )}

      <div
        className={
          "d-flex mt-3 editor" + (multiCtx.distractionFree ? "-focused" : "")
        }>
        {["split", "write"].includes(mode) && <TextArea />}
        {mode === "split" && <div className="divider-y"></div>}
        {["split", "read"].includes(mode) && (
          <div
            style={{ fontSize: `${multiCtx.fontSize}rem` }}
            className="col overflow-auto"
            id="reader"
            dangerouslySetInnerHTML={{
              __html: markdownit({ html: true }).render(multiCtx.content),
            }}></div>
        )}
      </div>

      {!multiCtx.distractionFree && (
        <div className="between mt-2">
          <div className="" style={{ width: "20%" }}>
            <Button
              icon={sizeChanged ? "carbon:unsaved" : "dashicons:saved"}
              className={"w-25" + (sizeChanged ? " orange" : "")}
              onClick={() => saveFontSize()}
            />
            <Button
              disabled={multiCtx.fontSize === 0.875}
              className="w-75"
              text={`${multiCtx.fontSize} rem`}
              onClick={() => multiCtx.setFontSize(0.875)}
            />
          </div>
          <input
            style={{ width: "80%" }}
            step={0.025}
            min={0.875}
            max={10}
            className="form-range my-auto"
            type="range"
            value={multiCtx.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}
    </form>
  );
}
