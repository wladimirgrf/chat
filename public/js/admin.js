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

  const rendered = Mustache.render(template, {
    email,
    id: userId,
  });

  document.getElementById('supports').innerHTML += rendered;
}
