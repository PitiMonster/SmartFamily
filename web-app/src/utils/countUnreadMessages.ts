interface Chat {
  _id: string;
  readByMembers: string[];
}

const countUnreadMessages = (chats: Chat[]) => {
  const userId = localStorage.getItem("userId") as string;
  const unreadChatIds: string[] = [];
  for (const chat of chats) {
    if (!chat.readByMembers.includes(userId)) {
      unreadChatIds.push(chat._id);
    }
  }

  localStorage.setItem("unreadMessagesCount", unreadChatIds.length.toString());
  localStorage.setItem("unreadChatIds", unreadChatIds.toString());
};

export const addUnreadMessage = (chatId: string) => {
  const unreadChatIds = (
    localStorage.getItem("unreadChatIds") as string
  )?.split(",");
  if (!unreadChatIds?.includes(chatId)) {
    unreadChatIds.push(chatId);
    localStorage.setItem("unreadChatIds", unreadChatIds.toString());
    localStorage.setItem(
      "unreadMessagesCount",
      unreadChatIds.length.toString()
    );
  }
};

export const readUnreadMessage = (chatId: string) => {
  let unreadChatIds = (localStorage.getItem("unreadChatIds") as string)?.split(
    ","
  );
  if (unreadChatIds?.includes(chatId)) {
    unreadChatIds = unreadChatIds.filter((chat) => chat !== chatId);
    localStorage.setItem("unreadChatIds", unreadChatIds.toString());
    localStorage.setItem(
      "unreadMessagesCount",
      unreadChatIds.length.toString()
    );
  }
};

export default countUnreadMessages;
