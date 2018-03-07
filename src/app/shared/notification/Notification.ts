export class Notification {
  static _id: number = 0;

  id: number;
  message: string;
  type: string;

  constructor(message: string, type: string) {
    this.id = Notification._id++;
    this.message = message;
    this.type = type;
  }
}
