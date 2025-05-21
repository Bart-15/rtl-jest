import { useState, forwardRef, useImperativeHandle, Ref } from 'react';

export type ButtonRef = {
  reset: () => void;
};

type CounterV2Props = {
  initialValue: number;
  buttonRef: Ref<ButtonRef>;
};

const CounterV2 = ({ initialValue = 0, buttonRef }: CounterV2Props) => {
  const [count, setCount] = useState(initialValue);

  useImperativeHandle(buttonRef, () => ({
    reset: () => {
      setCount(initialValue);
    },
  }));

  return (
    <div>
      <h1>Counter App</h1>
      <p data-testid="count-value">Count: {count}</p>
      <button onClick={() => setCount(count + 1)} data-testid="increment-btn">
        Increment
      </button>
      <button onClick={() => setCount(count - 1)} data-testid="decrement-btn">
        Decrement
      </button>

      <br />
    </div>
  );
};

export default forwardRef(CounterV2);
