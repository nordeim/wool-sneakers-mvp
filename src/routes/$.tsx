import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <div className="py-32 text-center">
      <div className="container-custom">
        <p className="font-accent text-[0.7rem] tracking-[0.12em] uppercase text-wool-100 mb-4">
          404
        </p>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.15] tracking-tight mb-4">
          Lost in the wool
        </h1>
        <p className="text-wool-500 max-w-[400px] mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Perhaps you took
          a wrong turn on the MRT.
        </p>
        <Link to="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
