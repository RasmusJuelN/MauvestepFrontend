interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'submit' | 'edit' | 'delete' | 'cancel' ;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles: Record<string, string> = {
  submit: 'bg-indigo-700 hover:bg-indigo-600',
  edit: 'bg-sky-700 hover:bg-sky-600',
  delete: 'bg-rose-800 hover:bg-rose-700',
  cancel: 'bg-gray-700 hover:bg-gray-600',
};

export default function Button({
  children,
  variant = 'submit',
  fullWidth = false,
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`px-4 py-2 rounded text-sm font-bold transition cursor-pointer text-center ${
        fullWidth ? 'w-full' : 'w-fit'
      } ${variantStyles[variant]} disabled:opacity-50 ${className}`}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
