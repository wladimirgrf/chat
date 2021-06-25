const socket = io();

const template = document.getElementById('template').innerHTML;
const adminTemplate = document.getElementById('admin_template').innerHTML;
const adminMessageTemplate = document.getElementById(
  'admin_message_template',
).innerHTML;
const clientMessageTemplate = document.getElementById(
  'client_message_template',
).innerHTML;

socket.on('admin_list_all_users', connections => {
  document.getElementById('list_users').innerHTML = '';

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
  const rendered = Mustache.render(adminTemplate, {
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

function sendMessage(id) {
  const text = document.getElementById(`send_message_${id}`);

  const params = {
    text: text.value,
    userId: id,
  };

  socket.emit('admin_send_message', params);

  const divMessages = document.getElementById(`allMessages${id}`);

  const messageRendered = Mustache.render(adminMessageTemplate, {
    message: params.text,
    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
  });

  divMessages.innerHTML += messageRendered;

  text.value = '';
}
