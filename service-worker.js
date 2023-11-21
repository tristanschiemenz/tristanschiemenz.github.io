self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const url = notification.data.url;
  
    event.notification.close();
  
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(windowClients => {
        for (const client of windowClients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  });
  