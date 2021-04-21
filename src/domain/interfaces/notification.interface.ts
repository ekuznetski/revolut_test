import { ENotificationType } from "@domain";

export interface INotificationState {
  visible: boolean;
  type: ENotificationType;
  timeout?: number | null;
  message: string;
}
