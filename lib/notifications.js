import { notification } from "antd";

const openNotification = (title, message) => {
  notification.open({
    message: title,
    description: message,
  });
};

export default openNotification;
