import { ReactNode } from 'react';

interface AdminCardProps {
  title: string;
  description: string;
  onClick: () => void;
  children?: ReactNode;
}

export default function AdminCard({ title, description, onClick, children }: AdminCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-indigo-900/30 p-6 rounded border border-indigo-700 hover:border-indigo-500 hover:bg-indigo-900/50 transition cursor-pointer"
    >
      <h2 className="text-2xl font-bold mb-2 mt-2">{title}</h2>
      <p className="text-sm text-indigo-300 mb-4">{description}</p>
      {children}
    </div>
  );
}
