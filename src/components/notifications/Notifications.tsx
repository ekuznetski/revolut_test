import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAppStore, IStore } from "@store";
import "./notifications.scss";

export function Notifications() {
   const { notification } = useSelector<
    IStore,
    {
      notification: IAppStore["notification"];
    }
  >((state) => ({
    notification: state.app.notification,
  }));



  return notification.isVisible ? (
    <div className="notification-wrapper">{notification.message}</div>
  ) : null;
}
