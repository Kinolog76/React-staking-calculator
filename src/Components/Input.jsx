export function Input({ value, onChange, className = "", ...props }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`w-full text-white border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
}