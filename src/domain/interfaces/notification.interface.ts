import { ENotificationType } from "@domain";

export interface INotificationState {
  isVisible: boolean;
  type: ENotificationType;
  timeout?: number | null;
  message: string;
}
