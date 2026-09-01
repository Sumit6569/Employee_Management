import useNotificationStore from "../../stores/notificationStore";

function Notification() {
  const message = useNotificationStore(
    (state) => state.message
  );

  const type = useNotificationStore(
    (state) => state.type
  );

  const clearNotification =
    useNotificationStore(
      (state) => state.clearNotification
    );

  if (!message) {
    return null;
  }

  return (
    <div>
      <p>{message}</p>

      <p>{type}</p>

      <button onClick={clearNotification}>
        Close
      </button>
    </div>
  );
}

export default Notification;