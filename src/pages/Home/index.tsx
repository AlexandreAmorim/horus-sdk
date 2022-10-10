import React from "react";

export function Home() {
  function handleSayHello() {
    window.Main.sendMessage("Hello World");

    console.log("Message sent! Check main process log in terminal.");
  }

  function handleNotification() {
    window.Main.notificationApi("Notification");
  }

  return (
    <>
      <button onClick={handleSayHello}>Send</button>
      <button onClick={handleNotification}>Main</button>
    </>
  );
}
