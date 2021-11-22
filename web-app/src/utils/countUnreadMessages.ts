interface Chat {
  readByMembers: string[];
}

const countUnreadMessages = (chats: Chat[]) => {
  const userId = localStorage.getItem("userId") as string;
  let unreadMessagesCount = 0;
  console.log(chats);
  for (const chat of chats) {
    if (!chat.readByMembers.includes(userId)) {
      unreadMessagesCount += 1;
    }
  }

  localStorage.setItem("unreadMessagesCount", unreadMessagesCount.toString());
};

export default countUnreadMessages;
