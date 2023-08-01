import useCounter from '../../hooks/useCounter';

export default function Counter() {
  const { count, incrementCountHandler, decrementCountHandler } = useCounter({
    initialValue: 20,
  });
  const name = 123213
  name='asdfsd'
  return (
    <>
      <h1>Count : {count}</h1>
      <button onClick={incrementCountHandler}>Increment</button>
      <button onClick={decrementCountHandler}>Decrement</button>
    </>
  );
}
