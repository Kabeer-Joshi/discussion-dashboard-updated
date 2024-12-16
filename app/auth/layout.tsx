export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Auth forms */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden md:block bg-gradient-to-br from-primary/10 via-primary/30 to-primary/10">
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ClassConnect</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Join our platform to enhance classroom discussions and collaboration
          </p>
        </div>
      </div>
    </div>
  );
}
