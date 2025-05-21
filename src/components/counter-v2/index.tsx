import { useRef } from 'react';
import CounterV2, { ButtonRef } from './counter';

const CounterRef = () => {
  const buttonRef = useRef<ButtonRef>(null);

  function reset() {
    buttonRef.current?.reset();
  }

  return (
    <div>
      <CounterV2 initialValue={0} buttonRef={buttonRef} />
      <br />
      <br />
      <button
        className="rounded-md bg-slate-200 px-3 py-2 text-gray-900"
        onClick={reset}
      >
        Reset Counter
      </button>
    </div>
  );
};

export default CounterRef;
