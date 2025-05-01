import React, { useState } from 'react';

type TCounter = {
  initialValue: number;
};

const Counter = ({ initialValue = 0 }: TCounter) => {
  const [count, setCount] = useState(initialValue);

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
    </div>
  );
};

export default Counter;
