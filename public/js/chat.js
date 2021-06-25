let socketAdminId = null;
let emailUser = null;

const userTemplate = document.getElementById('message-user-template').innerHTML;
const adminTemplate = document.getElementById('admin-template').innerHTML;

document
  .getElementById('send_message_button')
  .addEventListener('click', event => {
    const text = document.getElementById('message_user');

    const params = {
      text,
      socketAdminId,
    };

    socket.emit('client_send_to_admin', params);

    const template = userTemplate;

    const rendered = Mustache.render(template, {
      message: text.value,
      email: emailUser,
    });

    document.getElementById('messages').innerHTML += rendered;
  });

document.getElementById('start_chat').addEventListener('click', event => {
  const chatHelp = document.getElementById('chat_help');
  chatHelp.style.display = 'none';

  const chatInSupport = document.getElementById('chat_in_support');
  chatInSupport.style.display = 'block';

  const socket = io();

  const email = document.getElementById('email').value;
  emailUser = email;

  const text = document.getElementById('txt_help').value;

  socket.on('connect', () => {
    socket.emit('client_first_access', { email, text }, (call, err) =>
      console.log(call),
    );
  });

  socket.on('client_list_all_messages', messages => {
    let template;
    let params;

    messages.forEach(message => {
      if (!message.adminId) {
        template = userTemplate;
        params = { message: message.text, email };
      } else {
        template = adminTemplate;
        params = { message_admin: message.text };
      }

      const rendered = Mustache.render(template, params);

      document.getElementById('messages').innerHTML += rendered;
    });
  });

  socket.on('admin_send_to_client', params => {
    const template = adminTemplate;
    socketAdminId = params.socketId;

    const rendered = Mustache.render(template, {
      message_admin: params.text,
    });

    document.getElementById('messages').innerHTML += rendered;
  });
});
