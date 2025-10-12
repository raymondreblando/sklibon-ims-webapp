import { configureEcho } from "@laravel/echo-react";
import { api } from "../axios";

configureEcho({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  enabledTransports: ["ws", "wss"],
  authorizer: (channel) => ({
    authorize: (socketId, callback) => {
      api
        .post("/broadcasting/auth", {
          socket_id: socketId,
          channel_name: channel.name,
        })
        .then((res) => callback(null, res.data))
        .catch((err) => callback(err, err));
    },
  }),
});
