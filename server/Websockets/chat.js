const Message = require('../Message/model');
const Chat = require('../Chat/model');

const runSockets = (io, socket) => {
  socket.on('connect to chat', (data) => {
    console.log('connecting to chat ', data);
    socket.join(data.chatId);
  });

  socket.on('disconnect from chat', (data) => {
    console.log('disconnecting from chat ', data);
    socket.leave(data.chatId);
  });

  socket.on('send message', async (data) => {
    console.log('sending msg to chat ', data);
    const { chatId, message, authorId } = data;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return next(new AppError('No chat exists with that ID', 404));
    }

    if (!message) {
      return next(new AppError('No message to send provied', 404));
    }

    const newMessage = await Message.create({
      author: authorId,
      text: message,
    });

    chat.messages.push(newMessage);
    chat.save();
    for (userId of chat.members) {
      io.to(userId.toString()).emit('new notification', {
        type: 'message',
        notification: {
          message: newMessage,
          chatId,
        },
      });
    }
  });
};

module.exports = runSockets;
