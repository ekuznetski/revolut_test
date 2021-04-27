import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators, EActionTypes, IAppStore, IStore } from "@store";
import "./notifications.scss";

export function Notifications() {
  const dispatch = useDispatch();
  const defaultTimeout = 4000;
  const { notification } = useSelector<
    IStore,
    {
      notification: IAppStore["notification"];
    }
  >((state) => ({
    notification: state.app.notification,
  }));

  useEffect(() => {
    if (notification.isVisible) {
      setTimeout(
        () => dispatch(ActionCreators[EActionTypes.hideNotification]()),
        notification.timeout ? notification.timeout : defaultTimeout
      );
    }
  }, [notification.isVisible]);

  return notification.isVisible ? (
    <div className="notification-wrapper">{notification.message}</div>
  ) : null;
}
