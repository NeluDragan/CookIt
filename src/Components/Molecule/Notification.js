// ../Components/Molecule/Notification.js

import {useEffect} from 'react';
import notifee from '@notifee/react-native';

export const useNotification = () => {
  const displayNotification = async (title, body) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // replace with actual icon name
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const displayTriggerNotification = async (title, body, timestamp) => {
    const trigger = {
      type: notifee.TriggerType.TIMESTAMP,
      timestamp,
    };

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.createTriggerNotification(
      {
        title,
        body,
        android: {
          channelId,
          smallIcon: 'name-of-a-small-icon', // replace with actual icon name
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger,
    );
  };

  const cancelAllNotifications = async () => {
    await notifee.cancelAllNotifications();
  };

  return {
    displayNotification,
    displayTriggerNotification,
    cancelAllNotifications,
  };
};
