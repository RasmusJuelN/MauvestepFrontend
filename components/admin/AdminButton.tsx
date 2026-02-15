interface AdminButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'create' | 'edit' | 'delete' | 'view' | 'cancel' | 'save';
  className?: string;
  disabled?: boolean;
}

const variantStyles: Record<string, string> = {
  create: 'bg-emerald-700 hover:bg-emerald-600',   
  view: 'bg-indigo-700 hover:bg-indigo-600',         
  edit: 'bg-sky-700 hover:bg-sky-600',        
  delete: 'bg-rose-800 hover:bg-rose-700',         
  cancel: 'bg-gray-700 hover:bg-gray-600', 
  save: 'bg-emerald-700 hover:bg-emerald-600',
};

export default function AdminButton({ 
  label,
  onClick, 
  variant = 'create',
  className = '',
  disabled = false
}: AdminButtonProps) {
  return (
    <div 
      onClick={disabled ? undefined : onClick}
      className={`px-4 py-2 rounded text-sm font-bold transition w-fit cursor-pointer text-center ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {label}
    </div>
  );
}
