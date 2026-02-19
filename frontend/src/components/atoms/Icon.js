import { Icon as Icon_ } from "@iconify/react";

export default function Icon({ name, className = "" }) {
  return <Icon_ className={className} inline icon={name} />;
}
