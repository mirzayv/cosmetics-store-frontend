import axios from "axios";
import { serverApi } from "../../lib/config";
import { Message, MessageInput } from "../../lib/types/message";

class MessageService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async createMessage(input: MessageInput): Promise<Message> {
    try {
      const url = `${this.path}/message/create`;
      const result = await axios.post(url, input);

      return result.data;
    } catch (err) {
      console.log("Error, createMessage:", err);
      throw err;
    }
  }
}

export default MessageService;
