export function Label({ children, className = "" }) {
  return (
    <label className={`block text-sm font-medium text-white ${className}`}>
      {children}
    </label>
  );
}