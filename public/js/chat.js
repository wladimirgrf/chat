document.querySelector('#start_chat').addEventListener('click', event => {
  const chatHelp = document.getElementById('chat_help');
  chatHelp.style.display = 'none';

  const chatInSupport = document.getElementById('chat_in_support');
  chatInSupport.style.display = 'block';

  const socket = io();

  const email = document.getElementById('email').value;
  const text = document.getElementById('txt_help').value;

  socket.on('connect', () => {
    socket.emit('client_first_access', { email, text }, (call, err) => {
      if (err) {
        console.err(err);
      } else {
        console.log(call);
      }
    });
  });

  socket.on('client_list_all_messages', messages => {
    let template;
    let params;

    messages.forEach(message => {
      if (!message.adminId) {
        template = document.getElementById('message-user-template').innerHTML;
        params = { message: message.text, email };
      } else {
        template = document.getElementById('admin-template').innerHTML;
        params = { message_admin: message.text };
      }

      const rendered = Mustache.render(template, params);

      document.getElementById('messages').innerHTML += rendered;
    });
  });
});
