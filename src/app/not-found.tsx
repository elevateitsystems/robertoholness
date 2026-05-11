import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PawIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <ellipse cx="12" cy="17" rx="4" ry="5" opacity="0.9"/>
    <ellipse cx="6" cy="11" rx="2.5" ry="3" opacity="0.9"/>
    <ellipse cx="18" cy="11" rx="2.5" ry="3" opacity="0.9"/>
    <ellipse cx="8.5" cy="6" rx="2" ry="2.5" opacity="0.9"/>
    <ellipse cx="15.5" cy="6" rx="2" ry="2.5" opacity="0.9"/>
  </svg>
);

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center space-y-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 paw-pattern opacity-30" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-[100px]" />

      <div className="relative z-10 space-y-8">
        <div className="relative">
          <h1 className="text-[12rem] font-black text-primary/10 select-none leading-none">404</h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <PawIcon className="w-12 h-12 text-primary/40" />
            <h2 className="text-4xl font-heading font-black text-secondary">Oops! Page Lost.</h2>
          </div>
        </div>
        <p className="text-xl text-secondary/60 max-w-md mx-auto">
          It looks like this page has gone for a walk. Don't worry, we can help you find your way back home.
        </p>
        <Button asChild size="lg" className="h-14 px-10 rounded-full font-bold shadow-lg shadow-primary/25 transition-all hover:scale-105 bg-primary hover:bg-primary/90">
          <Link href="/">
            Go Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
