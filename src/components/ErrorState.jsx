import Button from './Button';

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="state-box">
      <strong>{error?.message || "Ma'lumot yuklanmadi"}</strong>
      {onRetry && <Button onClick={onRetry}>Qayta urinish</Button>}
    </div>
  );
}
