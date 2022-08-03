import { ButtonHTMLAttributes, ForwardRefRenderFunction } from "react";
import DynamicIcon from "~/components/dynamicicon";

interface btnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnSkin: "main" | "muted" | "warning" | "none";
  textSkin: "base" | "muted" | "warning" | "bold" | "reverse" | "none";
  btnLabel: string;
  btnColor?: string;
  textColor?: string;
  btnIcon?: string;
  otherStyle?: string;
}

export const Button: ForwardRefRenderFunction<HTMLButtonElement, btnProps> = ({
  btnSkin,
  textSkin,
  btnLabel,
  btnColor,
  textColor,
  btnIcon,
  otherStyle,
  ...props
}: btnProps) => {
  const getBtnSkin = (btnSkin: string) => {
    switch (btnSkin) {
      case "none":
        return !btnColor ? "" : btnColor;
      case "main":
        return "bg-skin-btn-main";
      case "muted":
        return "bg-skin-btn-muted";
      case "warning":
        return "bg-skin-btn-warning";
    }
  };

  const getTextSkin = (textSkin: string) => {
    switch (textSkin) {
      case "none":
        return !textColor ? "" : textColor;
      case "base":
        return "text-skin-base";
      case "muted":
        return "text-skin-muted";
      case "warning":
        return "text-skin-warning";
      case "bold":
        return "text-skin-bold";
      case "reverse":
        return "text-skin-reverse";
    }
  };

  return (
    <button
      {...props}
      className={`items-center h-fit w-fit px-2 py-1 m-1 rounded-md text-lg
      font-semibold transition-all ease-out duration-300 hover:bg-opacity-50
      ${getBtnSkin(btnSkin)} ${getTextSkin(textSkin)}
      ${!props.disabled && "hover:scale-105 active:scale-100"}
      ${!otherStyle ? "" : otherStyle}`}
    >
      <span className="flex w-full justify-center items-center">
        {!btnIcon ? null : btnIcon !== "" ? (
          <DynamicIcon icon={btnIcon} className="mr-1 h-6 w-6" />
        ) : null}
        {btnLabel}
      </span>
    </button>
  );
};
