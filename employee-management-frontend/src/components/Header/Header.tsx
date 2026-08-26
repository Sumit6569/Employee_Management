function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-xl font-bold text-gray-900">
        Employee Management
      </h1>

      <div className="text-sm text-gray-600">
        Admin
      </div>
    </header>
  );
}

export default Header;