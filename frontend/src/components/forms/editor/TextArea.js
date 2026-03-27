import { useContext, useState } from "react";
import { MultiContext } from "../../../context";
import Toolbar from "../../Toolbar";
import { useHotkeys } from "react-hotkeys-hook";
import Button from "../../atoms/Button";
import { v4 as uuidv4 } from "uuid";

export default function TextArea() {
  const multiCtx = useContext(MultiContext);

  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);

  const onChangeContent = (e) => multiCtx.setContent(e.target.value);

  const [selection, setSelection] = useState({
    start: 0,
    end: 0,
    selected: "",
  });

  const getSelection = () => {
    let elem = document.getElementById("editor");

    let start = elem.selectionStart;
    let end = elem.selectionEnd;
    let selected = multiCtx.content.substring(start, end);

    setSelection({ start: start, end: end, selected: selected });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = () => {
    let now = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    return now;
  };

  const formats = [
    {
      hotkey: "Command+B",
      icon: "bi:type-bold",
      label: "bold",
      format: `**${selection.selected}**`,
    },
    {
      icon: "bi:type-italic",
      hotkey: "Command+I",
      label: "italic",
      format: `*${selection.selected}*`,
    },
    {
      icon: "bi:type-h1",
      label: "heading",
      format: `### ${selection.selected}`,
    },
    {
      icon: "bi:hr",
      label: "hrule",
      format: "\n---\n",
    },
    {
      icon: "bi:sort-down-alt",
      label: "sort",
      format: `${selection.selected.split("\n").toSorted().join("\n")}`,
    },
    {
      icon: "bi:sort-down",
      label: "sort-reverse",
      format: `${selection.selected
        .split("\n")
        .toSorted()
        .reverse()
        .join("\n")}`,
    },
    {
      icon: "bi:list-ul",
      label: "bullet-list",
      format: `- ${selection.selected.split("\n").join("\n- ")}`,
    },
    {
      icon: "bi:check-lg",
      label: "check",
      format: `✓ ${selection.selected}`,
    },
    {
      icon: "bi:code-slash",
      label: "code",
      format: `\`\`\`${selection.selected}\`\`\``,
    },
    {
      icon: "bi:code",
      label: "code-inline",
      format: `\`${selection.selected}\``,
    },
    {
      icon: "bi:image",
      label: "image",
      format: `![text](url)`,
    },
    {
      icon: "bi:link",
      label: "link",
      format: `[text](url)`,
    },
    {
      icon: "bi:type",
      hotkey: "Command+1",
      label: "capitalize",
      format: function () {
        let words = selection.selected.split(" ");
        let line = [];
        for (let x = 0; x < words.length; x++) {
          line.push(words[x].charAt(0).toUpperCase() + words[x].slice(1));
        }
        return line.join(" ");
      },
    },
    {
      icon: "bi:alphabet-uppercase",
      label: "allcaps",
      format: `${selection.selected.toUpperCase()}`,
    },
    {
      icon: "bi:alphabet",
      label: "alllower",
      format: `${selection.selected.toLowerCase()}`,
    },
    {
      icon: "bi:indent",
      hotkey: "tab",
      label: "indent",
      format: `  ${selection.selected}`,
    },
    {
      text: "()",
      hotkey: "shift+9",
      label: "parentheses",
      format: `(${selection.selected})`,
    },
    {
      text: "{}",
      label: "curly-braces",
      format: `{${selection.selected}}`,
    },
    {
      text: "[]",
      hotkey: "shift+b",
      label: "square-brackets",
      format: `[${selection.selected}]`,
    },
    {
      text: "''",
      label: "single-quotes",
      format: `'${selection.selected}'`,
    },
    {
      text: '""',
      hotkey: "shift+q",
      label: "double-quotes",
      format: `"${selection.selected}"`,
    },
    {
      icon: "bi:calendar",
      label: "date-1",
      format: `${new Date().getDate()} ${monthNames[new Date().getMonth()]}`,
    },
    {
      icon: "bi:clock",
      label: "date-3",
      format: formatDate(),
    },
    {
      icon: "bi:highlighter",
      hotkey: "Command+h",
      label: "highlighter",
      format: `<mark>${selection.selected}</mark>`,
    },
    {
      icon: "bi:superscript",
      label: "superscript",
      format: `<sup>${selection.selected}</sup>`,
    },
    {
      icon: "bi:type-strikethrough",
      hotkey: "Command+s",
      label: "type-strikethrough",
      format: `~~${selection.selected}~~`,
    },
  ];

  const copyFormat = (format) => {
    let format_ = formats.filter((x) => x.label === format)[0];
    let new_ =
      multiCtx.content.substring(0, selection.start) +
      (format === "capitalize" ? format_.format() : format_.format) +
      multiCtx.content.substring(selection.end, multiCtx.content.length);
    multiCtx.setContent(new_);
  };

  useHotkeys("meta+b", () => copyFormat("bold"), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys("meta+i", () => copyFormat("italic"), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys("shift+9", () => copyFormat("parentheses"), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys("meta+1", () => copyFormat("capitalize"), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys("tab", () => copyFormat("indent"), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys("meta+s", () => copyFormat("type-strikethrough"), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys("meta+h", () => copyFormat("highlighter"), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys("shift+q", () => copyFormat("double-quotes"), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  useHotkeys("shift+b", () => copyFormat("square-brackets"), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  return (
    <>
      <textarea
        onClick={(e) => {
          setMouseX(e.clientX);
          setMouseY(e.clientY);
        }}
        style={{ fontSize: `${multiCtx.fontSize}rem` }}
        onMouseUp={() => getSelection()}
        id="editor"
        autoComplete="off"
        className={
          "form-control font-monospace col" +
          (multiCtx.distractionFree ? " full" : "")
        }
        value={multiCtx.content}
        onChange={onChangeContent}></textarea>
      {selection.selected.length > 0 && (
        <div
          className="popup"
          style={{
            top: `${mouseY + 20}px`,
            // left: `${mouseX}px`,
          }}>
          {formats
            .filter((w) => w.hotkey)
            .map((x) => (
              <div className="d-inline-flex mx-2">
                <Button
                  key={uuidv4()}
                  truncate={false}
                  className=""
                  icon={x.icon}
                  text={x.text}
                  onClick={() => copyFormat(x.label)}
                />
                {x.hotkey && (
                  <span className="my-auto fw-bold small"> - {x?.hotkey}</span>
                )}
              </div>
            ))}
          {formats
            .filter((w) => !w.hotkey)
            .map((x) => (
              <div className="d-inline-flex p-1">
                <Button
                  key={uuidv4()}
                  truncate={false}
                  className="m-"
                  icon={x.icon}
                  text={x.text}
                  onClick={() => copyFormat(x.label)}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
}
