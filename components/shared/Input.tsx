interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-indigo-300 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-indigo-950/50 border rounded text-indigo-100 placeholder-indigo-400/90 focus:outline-none focus:ring-1 transition ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-indigo-700/50 focus:border-indigo-400 focus:ring-indigo-400"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {helperText && <p className="mt-1 text-xs text-indigo-400">{helperText}</p>}
    </div>
  );
}
