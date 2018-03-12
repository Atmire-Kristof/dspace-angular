/* tslint:disable:max-classes-per-file */
import {ENV_CONFIG} from '../../../config';

export class Notification {
  message: string;
  title: string;
  type: string;
  timeout: number;
  dismissible: boolean;

  static getBuilder(message: string): Builder {
    return new Builder(message);
  }

  constructor(message: string) {
    if (message == undefined) {
      this.message = ENV_CONFIG.notification.message;
    } else {
      this.message = message;
    }
    this.title = '';
    this.type = ENV_CONFIG.notification.type;
    this.timeout = ENV_CONFIG.notification.timeout;
    this.dismissible = ENV_CONFIG.notification.dismissible;
  }
}

class Builder {
  private notification: Notification;

  constructor(message: string) {
    this.notification = new Notification(message);
  }

  public title(title: string): Builder {
    this.notification.title = title;
    return this;
  }

  public type(type: string): Builder {
    this.notification.type = type;
    return this;
  }

  public timeout(timeout: number): Builder {
    this.notification.timeout = timeout;
    return this;
  }

  public dismissible(dismissible: boolean): Builder {
    this.notification.dismissible = dismissible;
    return this;
  }

  public build(): Notification {
    return this.notification;
  }
}
