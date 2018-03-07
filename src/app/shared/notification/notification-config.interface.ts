import {Config} from '../../../config/config.interface';

export interface NotificationConfig extends Config {
  message: string;
  type: string;
  timeout: number;
  dismissible: boolean;
}
