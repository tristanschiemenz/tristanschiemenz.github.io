self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '', // Change with the path to your icon
      data: { url: data.url }
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
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