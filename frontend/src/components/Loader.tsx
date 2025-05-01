import { Loader2 } from 'lucide-react';

export default function Loader({ size = 24 }: { size?: number }) {
  return (
    <div className="flex justify-center items-center">
      <Loader2
        className="animate-spin text-accent"
        width={size}
        height={size}
      />
    </div>
  );
}
