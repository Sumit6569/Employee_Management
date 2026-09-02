import useNotificationStore from "../../stores/notificationStore";

function Notification() {
  const message = useNotificationStore((state) => state.message);
  const type = useNotificationStore((state) => state.type);
  const clearNotification = useNotificationStore((state) => state.clearNotification);

  if (!message) {
    return null;
  }

  const isSuccess = type === "success";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center justify-between gap-4 rounded-xl border p-4 shadow-lg transition-all animate-bounce-in bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-w-md">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            isSuccess
              ? "bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400"
              : "bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400"
          }`}
        >
          {isSuccess ? "✓" : "✕"}
        </div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {message}
        </p>
      </div>

      <button
        onClick={clearNotification}
        className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
      >
        ✕
      </button>
    </div>
  );
}

export default Notification;