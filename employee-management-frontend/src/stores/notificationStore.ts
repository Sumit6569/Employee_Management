import { create } from "zustand";

interface NotificationState {
  message: string | null;
  type: "success" | "error" | null;

  showNotification: (
    message: string,
    type: "success" | "error"
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