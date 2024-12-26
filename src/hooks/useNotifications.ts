import { create } from 'zustand';
import type { Notification } from '../types';
import { mockDb, db } from '../data/mockDb';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAsUnread: (notificationId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
  resetCount: () => void;
  deleteNotification: (notificationId: string) => void;
}

export const useNotifications = create<NotificationState>((set, get) => ({
  notifications: Object.values(mockDb.notifications),
  unreadCount: Object.values(mockDb.notifications).filter(n => !n.read).length,

  markAsRead: (notificationId: string) => {
    const notification = db.getNotification(notificationId);
    if (!notification || notification.read) return;

    const updatedNotification = { ...notification, read: true };
    mockDb.notifications[notificationId] = updatedNotification;

    set(state => ({
      notifications: state.notifications.map(n => 
        n.id === notificationId ? updatedNotification : n
      ),
      unreadCount: state.unreadCount - 1
    }));
  },

  markAsUnread: (notificationId: string) => {
    const notification = db.getNotification(notificationId);
    if (!notification || !notification.read) return;

    const updatedNotification = { ...notification, read: false };
    mockDb.notifications[notificationId] = updatedNotification;

    set(state => ({
      notifications: state.notifications.map(n => 
        n.id === notificationId ? updatedNotification : n
      ),
      unreadCount: state.unreadCount + 1
    }));
  },

  deleteNotification: (notificationId: string) => {
    const notification = db.getNotification(notificationId);
    if (!notification) return;

    // Delete from mock database
    delete mockDb.notifications[notificationId];

    // Update state
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== notificationId),
      unreadCount: notification.read ? state.unreadCount : state.unreadCount - 1
    }));
  },

  addNotification: (notification) => {
    const newNotification = db.createNotification({
      ...notification,
      read: false
    });

    set(state => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }));
  },

  resetCount: () => {
    // Mark all notifications as read
    const updatedNotifications = get().notifications.map(n => {
      if (!n.read) {
        const updated = { ...n, read: true };
        mockDb.notifications[n.id] = updated;
        return updated;
      }
      return n;
    });

    set({
      notifications: updatedNotifications,
      unreadCount: 0
    });
  }
}));