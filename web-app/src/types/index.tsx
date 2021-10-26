export type User = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  sex: string;
  profilePhoto: string;
  role: string;
  birthDate: Date;
  families: Family[] | string[];
  notifications: Notification[] | string[];
  purchasedRewards: Reward[] | string[];
  parent?: User | string;
  pointsCount: Number;
  tasks: Task[] | string[];
  invitations: Invitation[] | string[];
};

export type Task = {
  _id: string;
  name: string;
  createdAt: Date;
  completionDate: Date;
  points: Number;
  principal: User | string;
  contractor: User | string;
  status: string;
  description?: string;
};

export type ShoppingItem = {
  _id: string;
  name: string;
  authorName: string;
  count: Number;
  description?: string;
};

export type Reward = {
  _id: string;
  name: string;
  photo: string;
  points: Number;
  description?: string;
};

export type Notification = {
  _id: string;
  type: string;
  text: string;
  photo: string;
  receiver: User | string;
  calendarEvent?: CalendarEvent | string;
  task?: Task | string;
  invitation?: Invitation | string;
};

export type Message = {
  _id: string;
  author: User | string;
  text: string;
  createdAt: Date;
};

export type Invitation = {
  _id: string;
  sender: User | string;
  receiver: User | string;
  family: Family | string;
  createdAt: Date;
};

export type Family = {
  _id: string;
  name: string;
  members: User[] | string[];
  photo: string;
  chat: Chat | string;
  calendarEvents: CalendarEvent[] | string[];
  budgets: Budget[] | string[];
  shoppingList: ShoppingItem[] | string[];
  tasks: Task[] | string[];
  rewards: Reward[] | string[];
};

export type Chat = {
  _id: string;
  members: User[] | string[];
  name: string;
  messages: Message[] | string[];
};

export type CalendarEvent = {
  _id: string;
  name: string;
  date: Date;
  author: User | string;
  description?: string;
};

export type Expense = {
  _id: string;
  name: string;
  value: Number;
};

export type Budget = {
  _id: string;
  name: string;
  budgetValue: Number;
  expenses: Expense[] | string[];
  renewalDate?: Date;
};