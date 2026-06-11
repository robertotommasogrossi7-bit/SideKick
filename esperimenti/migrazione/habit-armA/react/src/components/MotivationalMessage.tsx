interface Props {
  message: string;
  show: boolean;
}

export function MotivationalMessage({ message, show }: Props) {
  return (
    <div className={`motivational-message${show ? ' show' : ''}`}>
      <p>{message}</p>
    </div>
  );
}
