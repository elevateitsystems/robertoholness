import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center space-y-8">
      <div className="relative">
        <h1 className="text-9xl font-black text-slate-100 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-heading font-black text-slate-900">Oops! Page Lost.</h2>
        </div>
      </div>
      <p className="text-xl text-slate-600 max-w-md mx-auto">
        It looks like this page has gone for a walk. Don't worry, we can help you find your way back home.
      </p>
      <Button asChild size="lg" className="h-14 px-10 rounded-lg font-bold shadow transition-all hover:scale-105">
        <Link href="/">
          Go Back to Home
        </Link>
      </Button>
    </div>
  );
}
