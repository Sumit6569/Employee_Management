import ThemeToggle from '../TheameToggle/ThemeToggle';

function Header() {
  return (
    <header
      className="
        flex h-16 items-center justify-between
        border-b border-gray-200 px-6
        bg-white text-gray-900
        dark:bg-gray-800 dark:border-gray-700 dark:text-white
        transition-colors duration-200 shadow-xs
      "
    >
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>

      <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Employee Management System
      </h1>

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
          A
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin</span>
      </div>
    </header>
  );
}

export default Header;
