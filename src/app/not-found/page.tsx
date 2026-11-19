import Link from 'next/link';
import { Button, ArrowIcon } from '@/components/Button';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-display-h1 font-mono font-bold text-paper tracking-tight mb-4">
        404
      </h1>
      <p className="body-lg text-mist max-w-md mb-8">
        Sorry, we couldn&apos;t find that page. It might have been moved or doesn&apos;t exist.
      </p>
      <Button variant="primary" icon={<ArrowIcon />} asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}