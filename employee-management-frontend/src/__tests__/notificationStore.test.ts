import { describe, it, expect } from 'vitest';
import useNotificationStore from '../stores/notificationStore.ts';

describe('Zustand Notification Store', () => {
  it('should initialize with null message and type', () => {
    const state = useNotificationStore.getState();
    expect(state.message).toBeNull();
    expect(state.type).toBeNull();
  });

  it('should set notification message and type on showNotification', () => {
    useNotificationStore.getState().showNotification('Employee created successfully', 'success');

    const state = useNotificationStore.getState();
    expect(state.message).toBe('Employee created successfully');
    expect(state.type).toBe('success');
  });

  it('should update state when error notification is shown', () => {
    useNotificationStore.getState().showNotification('Failed to update employee', 'error');

    const state = useNotificationStore.getState();
    expect(state.message).toBe('Failed to update employee');
    expect(state.type).toBe('error');
  });

  it('should reset message and type to null when clearNotification is invoked', () => {
    useNotificationStore.getState().showNotification('Temporary alert', 'error');
    expect(useNotificationStore.getState().message).toBe('Temporary alert');

    useNotificationStore.getState().clearNotification();
    const clearedState = useNotificationStore.getState();
    expect(clearedState.message).toBeNull();
    expect(clearedState.type).toBeNull();
  });
});
