import React from "react";
import "../sass/container.scss";

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return <div className={`container ${className || ""}`}>{children}</div>;
};
