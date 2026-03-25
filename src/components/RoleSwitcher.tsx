import React from 'react';
import { useAppContext } from '../context/AppContext';

export const RoleSwitcher: React.FC = () => {
  const { setImpersonatedUserEmail } = useAppContext();

  const roles = [
    { label: 'Founder', email: 'edwardhallam07@gmail.com' },
    { label: 'Client', email: 'contact@acme.com' },
    { label: 'Operator', email: 'operator@example.com' },
    { label: 'Employee', email: 'sarah@example.com' },
  ];

  return (
    <div className="fixed top-2 right-2 z-50 flex gap-2 p-2 bg-slate-900/90 border border-slate-700 rounded-lg shadow-xl">
      {roles.map(role => (
        <button
          key={role.label}
          onClick={() => setImpersonatedUserEmail(role.email)}
          className="px-3 py-1 text-xs text-white bg-slate-700 hover:bg-slate-600 rounded transition-colors"
        >
          {role.label}
        </button>
      ))}
    </div>
  );
};
