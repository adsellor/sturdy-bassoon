import HelloWorldAnimation from './HelloWorldAnimation';

export default function Example() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '40vh',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, sans-serif',
      }}
    >
      <HelloWorldAnimation text="Goodbye" />
    </div>
  );
}
