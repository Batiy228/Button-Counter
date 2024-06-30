import { handleDisplayQuantity } from "./helper";
import "./Counter.styl";

interface CounterProps {
  size: 8 | 12 | 16 | 20 | 24;
  pulse?: boolean;
  style: "primary" | "secondary";
  quantity: string;
  stroke?: boolean;
}

const Counter: React.FC<CounterProps> = ({
  size,
  pulse,
  style,
  stroke,
  quantity,
}) => {
  const displayQuantity = handleDisplayQuantity(quantity);

  return (
    <div className="live-indicator">
      <div
        className={`red-dot ${style} px${size} ${
          stroke ? `px${size}__br` : ""
        }`}
      >
        {size !== 8 && size !== 12 && displayQuantity}
      </div>
      {(size === 8 || size === 12) && pulse && (
        <>
          <div
            className={`pulse one ${style}`}
            style={{ minWidth: size, minHeight: size }}
          ></div>
          <div
            className={`pulse two ${style}`}
            style={{ minWidth: size, minHeight: size }}
          ></div>
        </>
      )}
    </div>
  );
};

export default Counter;
