export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-6">🚧</div>
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90"
      >
        Go Home
      </a>
    </div>
  )
}
