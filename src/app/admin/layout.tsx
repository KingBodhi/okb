import { ReactNode } from 'react';

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] bg-[var(--admin-bg)]">
      {children}
    </div>
  );
}
