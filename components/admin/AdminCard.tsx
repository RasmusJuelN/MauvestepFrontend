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
      className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-600/40 rounded-lg p-6 hover:border-indigo-500/80 hover:bg-indigo-900/60 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 cursor-pointer"
    >
      <h2 className="text-2xl font-bold mb-2 mt-2">{title}</h2>
      <p className="text-sm text-indigo-300 mb-4">{description}</p>
      {children}
    </div>
  );
}
