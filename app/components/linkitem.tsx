import { Link } from "@remix-run/react";
import { Button } from "./button";

interface linkProps {
  to: string;
  title: string;
  linkIcon?: string;
}

export default function LinkItem({ to, title, linkIcon }: linkProps) {
  return (
    <div>
      <Link to={to}>
        <Button
          btnLabel={title}
          btnSkin="none"
          textSkin="reverse"
          btnIcon={linkIcon}
          otherStyle="text-sm hover:underline"
        />
      </Link>
    </div>
  );
}
