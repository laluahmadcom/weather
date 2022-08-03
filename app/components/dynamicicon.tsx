import * as bsIcons from "react-icons/bs";

interface iconProps {
  icon: string;
  className: string;
}

export default function DynamicIcon({ icon, className }: iconProps) {
  const { ...icons } = bsIcons;

  // @ts-ignore
  const TheIcon: JSX.Element = icons[icon];

  // @ts-ignore
  return <TheIcon className={className} />;
}
