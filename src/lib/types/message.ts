export interface MessageInput {
  memberNick: string;
  memberEmail: string;
  memberMsg: string;
}

export interface Message {
  _id: string;
  memberNick: string;
  memberEmail: string;
  memberMsg: string;
  createdAt: Date;
  updatedAt: Date;
}
