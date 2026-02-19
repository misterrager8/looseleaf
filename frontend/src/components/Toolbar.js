import { useContext } from "react";
import { MultiContext } from "../context";
import Button from "./atoms/Button";
import { v4 as uuidv4 } from "uuid";

export default function Toolbar({ selection, className = "" }) {
  const multiCtx = useContext(MultiContext);

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
      icon: "bi:type-bold",
      label: "bold",
      format: `**${selection.selected}**`,
    },
    {
      icon: "bi:type-italic",
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
      label: "capitalize",
      format: `${
        selection.selected.charAt(0).toUpperCase() + selection.selected.slice(1)
      }`,
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
      label: "indent",
      format: `  ${selection.selected}`,
    },
    {
      text: "()",
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
      label: "type-strikethrough",
      format: `~~${selection.selected}~~`,
    },
  ];

  const copyFormat = (format) => {
    let format_ = formats.filter((x) => x.label === format)[0];
    let new_ =
      multiCtx.content.substring(0, selection.start) +
      format_.format +
      multiCtx.content.substring(selection.end, multiCtx.content.length);
    multiCtx.setContent(new_);
  };

  return (
    <div className={className + " toolbar"}>
      {formats.map((x) => (
        <Button
          key={uuidv4()}
          truncate={false}
          className="m-1"
          icon={x.icon}
          text={x.text}
          onClick={() => copyFormat(x.label)}
        />
      ))}
    </div>
  );
}
