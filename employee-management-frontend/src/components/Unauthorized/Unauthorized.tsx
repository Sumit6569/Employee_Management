function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">403</h1>

        <h2 className="mt-4 text-2xl font-semibold">Access Denied</h2>

        <p className="mt-2 text-gray-600">You do not have permission to access this page.</p>
      </div>
    </div>
  );
}

export default Unauthorized;
