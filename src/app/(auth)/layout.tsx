export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 paw-pattern bg-warm-gradient relative overflow-hidden">
      <div className="max-w-md w-full space-y-8 z-10 relative animate-in fade-in slide-in-from-bottom-4 duration-700">
        {children}
      </div>
    </div>
  );
}
