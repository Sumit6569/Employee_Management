import { create } from "zustand";

type NotificationType = "success" | "error";

interface NotificationState {
  message: string | null;
  type: NotificationType | null;

  showNotification: (
    message: string,
    type: NotificationType
  ) => void;

  clearNotification: () => void;
}

const useNotificationStore =
  create<NotificationState>((set) => ({
    message: null,
    type: null,

    showNotification: (message, type) => {
      set({
        message,
        type,
      });
    },

    clearNotification: () => {
      set({
        message: null,
        type: null,
      });
    },
  }));

export default useNotificationStore;