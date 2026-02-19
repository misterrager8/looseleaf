import { Icon } from "@iconify/react";

export default function Badge({ text, icon, border = true, className = "" }) {
  return (
    <span className={className + " d-flex badge" + (border ? "" : " border-0")}>
      {icon && <Icon inline icon={icon} />}
      <span className={icon ? "my-auto ms-1" : ""}>{text}</span>
    </span>
  );
}
