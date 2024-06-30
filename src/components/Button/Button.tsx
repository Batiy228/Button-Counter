import React, { useState } from "react";
import Label from "./Label/Label";
import Counter from "../Counter/Counter";
import "./Button.scss";
import "./Loader.scss";
import loaderSvg from "../../img/tube-spinner.svg";

interface ButtonProps {
  style?: "primary" | "secondary";
  size?: 28 | 36 | 56;
  counter?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  style = "primary",
  size = 28,
  counter,
  disabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clickPosition, setClickPosition] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });
  const [quantity, setQuantity] = useState(0);

  const handleClick = () => {
    setTimeout(() => setIsLoading((prev) => !prev), 1000);
    setQuantity((prev) => prev + 1);
    setIsLoading((prev) => !prev);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const x = event.clientX - buttonRect.left;
    const y = event.clientY - buttonRect.top;
    setClickPosition({ x, y });
  };

  return (
    <button
      className={`button button__${style} `}
      style={{ height: size }}
      onClick={handleClick}
      disabled={disabled}
      onMouseDown={handleMouseDown}
    >
      {isLoading && <div className={`shimmer__${style}`}></div>}
      {clickPosition.x !== null && clickPosition.y !== null && (
        <div
          style={{
            left: clickPosition.x + "px",
            top: clickPosition.y + "px",
          }}
          className={`overlay__${style}`}
        ></div>
      )}
      {isLoading && (
        <div className="loader">
          <img src={loaderSvg} alt="Loading" className={`loader__px${size}`} />
        </div>
      )}

      <div className={`content-group px${size} ${isLoading && "invisible"}`}>
        <Label />
        {counter && (
          <Counter
            size={20}
            pulse={true}
            style={style}
            stroke={false}
            quantity={String(quantity)}
          />
        )}
      </div>
    </button>
  );
};

export default Button;
