import { createContext, useContext, useEffect, useState } from "react";
import Dropdown from "./atoms/Dropdown";
import Button from "./atoms/Button";
import Search from "./forms/Search";
import { MultiContext } from "../context";
import NoteItem from "./items/NoteItem";
import Icon from "./atoms/Icon";
import Badge from "./atoms/Badge";
import FolderItem from "./items/FolderItem";
import Spinner from "./atoms/Spinner";
import { v4 as uuidv4 } from "uuid";

export const FolderContext = createContext();

export default function Nav() {
  const multiCtx = useContext(MultiContext);

  const [theme, setTheme] = useState(
    localStorage.getItem("looseleaf-theme") || "light",
  );
  const [showFolders, setShowFolders] = useState(false);

  useEffect(() => {
    localStorage.setItem("looseleaf-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const sorts = [
    {
      icon: "mingcute:bookmark-fill",
      label: "Favorited",
      value: "favorited",
    },
    {
      icon: "material-symbols:abc",
      label: "Name",
      value: "name",
    },
    {
      icon: "gridicons:create",
      label: "Date Created",
      value: "date_created",
    },
    {
      icon: "meteor-icons:pencil",
      label: "Last Modified",
      value: "last_modified",
    },
  ];

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
    <>
      <div className="nav-y">
        <div className="between">
          <div className="d-flex">
            {multiCtx.loading ? (
              <div className="my-auto">
                <Spinner />
              </div>
            ) : (
              <Button
                onClick={() => {
                  showFolders ? multiCtx.addFolder() : multiCtx.createNote();
                }}
                border={true}
                className="green"
                text={"New " + (showFolders ? "Folder" : "Note")}
                icon="mdi:leaf"
              />
            )}
          </div>
          <Dropdown
            classNameBtn="text-capitalize"
            classNameMenu="text-center"
            target="themes"
            showCaret={true}
            icon="bxs:color-fill">
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
        </div>
        {/* <Search className="mt-3" /> */}
        <div className="between mt-3">
          <div>
            {multiCtx.currentFolder && (
              <Button
                className="px-1"
                onClick={() => multiCtx.setCurrentFolder(null)}
                icon="garden:chevron-double-left-fill-12"
              />
            )}
            <Button
              active={showFolders || multiCtx.currentFolder}
              onClick={() => setShowFolders(!showFolders)}
              icon="game-icons:tree-branch"
              text={
                multiCtx.currentFolder
                  ? multiCtx.currentFolder
                  : `All Notes (${multiCtx.notes.length})`
              }
            />
          </div>
          <Dropdown
            target="sort-notes"
            icon={sorts.find((x) => x.value === multiCtx.sort)?.icon}
            text={sorts.find((x) => x.value === multiCtx.sort)?.label}>
            {sorts.map((x) => (
              <a
                key={uuidv4()}
                className={
                  "dropdown-item" + (x.value === multiCtx.sort ? " active" : "")
                }
                onClick={() => multiCtx.setSort(x.value)}>
                <Icon name={x.icon} className="me-2" />
                {x.label}
              </a>
            ))}
          </Dropdown>
        </div>
        <div
          className="mt-3"
          style={{
            height: "85vh",
            overflowY: "auto",
          }}>
          {showFolders ? (
            <FolderContext.Provider
              value={{
                showFolders: showFolders,
                setShowFolders: setShowFolders,
              }}>
              {multiCtx.folders.map((x) => (
                <FolderItem key={uuidv4()} item={x} />
              ))}
            </FolderContext.Provider>
          ) : (
            <>
              {multiCtx.notes.map((x) => (
                <NoteItem key={uuidv4()} item={x} />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="nav-x">
        <div className="d-flex">
          {multiCtx.loading ? (
            <div className="my-auto me-3">
              <Spinner />
            </div>
          ) : (
            <Button
              onClick={() => multiCtx.createNote()}
              border={true}
              className="green me-3"
              text="New Leaf"
              icon="mdi:leaf"
            />
          )}
          {multiCtx.currentFolder && (
            <Button
              onClick={() => multiCtx.setCurrentFolder(null)}
              className="px-1"
              icon="garden:chevron-double-left-fill-12"
            />
          )}
          <Dropdown
            showCaret={false}
            text={
              multiCtx.currentFolder || `All Notes (${multiCtx.notes.length})`
            }
            target="folders">
            {multiCtx.folders.map((x) => (
              <a
                key={uuidv4()}
                onClick={() => multiCtx.setCurrentFolder(x.name)}
                className={
                  "dropdown-item between" +
                  (x.name === multiCtx.currentFolder ? " active" : "")
                }>
                <span>{x.name}</span>
                {x.notes > 0 && (
                  <Badge
                    className="my-auto p-0"
                    border={false}
                    icon="mdi:leaf"
                    text={x.notes}
                  />
                )}
              </a>
            ))}
          </Dropdown>
          <Icon className="my-auto" name="lucide:slash" />
          <Dropdown
            classNameBtn="px-2"
            showCaret={false}
            text={multiCtx.currentNote?.name || "-"}
            target="notes">
            <div
              style={{
                maxHeight: "600px",
                width: "300px",
                overflow: "auto",
              }}>
              {multiCtx.notes.map((x) => (
                <a
                  key={uuidv4()}
                  title={x.name}
                  onClick={() => multiCtx.setCurrentNote(x)}
                  className={
                    "dropdown-item between" +
                    (multiCtx.currentNote?.path === x.path ? " active" : "")
                  }>
                  <div className="d-flex text-truncate">
                    {x.favorited && (
                      <Icon className="me-2" name="mingcute:bookmark-fill" />
                    )}
                    <span className="text-truncate">{x.name}</span>
                  </div>
                  {x.folder && (
                    <Badge icon="game-icons:tree-branch" text={x.folder} />
                  )}
                </a>
              ))}
            </div>
          </Dropdown>
          {multiCtx.currentNote && (
            <Button
              onClick={() => multiCtx.setCurrentNote(null)}
              className="px-1"
              icon="dashicons:exit"
            />
          )}
        </div>
        <div>
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
        </div>
      </div>
    </>
  );
}
