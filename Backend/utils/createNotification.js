const Notification = require("../models/Notification");

const createNotification = async (
  receiver,
  sender,
  title,
  message,
  type = "info",
  link = "/",
  referenceId = null,
) => {
  await Notification.create({
    receiver,
    sender,
    title,
    message,
    type,
    link,
    referenceId,
  });
};

module.exports = createNotification;
