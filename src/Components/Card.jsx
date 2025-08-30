export function Card({ children, className = "" }) {
  return (
    <div className={`bg-gray-700 ${className}`}>
      {children}
    </div>
  );
}