import { Icon } from "@iconify/react";

export default function Button({
  text,
  onClick,
  border = false,
  active = false,
  disabled = false,
  truncate = true,
  className = "",
  type_ = "button",
  icon,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type_}
      className={
        className +
        " btn" +
        (truncate ? " text-truncate" : "") +
        (active ? " active" : "") +
        (border ? "" : " border-0")
      }>
      {/* {icon && <i className={"bi bi-" + icon + (text ? " me-1" : "")}></i>} */}
      {icon && <Icon inline icon={icon} />}
      {text && <span className={icon ? "ms-1" : ""}>{text}</span>}
    </button>
  );
}
