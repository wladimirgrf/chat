const socket = io();

socket.on('admin_list_all_users', connections => {
  document.getElementById('list_users').innerHTML = '';

  const template = document.getElementById('template').innerHTML;

  connections.forEach(connection => {
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socketId,
      userId: connection.user.id,
    });

    document.getElementById('list_users').innerHTML += rendered;
  });
});

function call(userId, email) {
  const template = document.getElementById('admin_template').innerHTML;
  const adminMessageTemplate = document.getElementById(
    'admin_message_template',
  ).innerHTML;
  const clientMessageTemplate = document.getElementById(
    'client_message_template',
  ).innerHTML;

  const rendered = Mustache.render(template, {
    email,
    id: userId,
  });

  document.getElementById('supports').innerHTML += rendered;

  socket.emit('admin_list_messages_by_user', { userId }, messages => {
    const divMessages = document.getElementById(`allMessages${userId}`);

    messages.forEach(message => {
      let messageTemplate;
      let params = {};

      if (!message.adminId) {
        messageTemplate = clientMessageTemplate;
        params = { email };
      } else {
        messageTemplate = adminMessageTemplate;
      }

      params = {
        ...params,
        message: message.text,
        date: dayjs(message.createdAt).format('DD/MM/YYYY HH:mm:ss'),
      };

      const messageRendered = Mustache.render(messageTemplate, params);

      divMessages.innerHTML += messageRendered;
    });
  });
}
