import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ?? "";
const broadcastAuthEndpoint = `${apiUrl}/api/broadcasting/auth`;

const echo = new Echo({
    broadcaster: "reverb",

    key: import.meta.env.VITE_REVERB_APP_KEY,

    wsHost: import.meta.env.VITE_REVERB_HOST,

    wsPort: Number(import.meta.env.VITE_REVERB_PORT),

    wssPort: Number(import.meta.env.VITE_REVERB_PORT),

    forceTLS: import.meta.env.VITE_REVERB_SCHEME === "https",

    enabledTransports: ["ws", "wss"],

    channelAuthorization: {
        endpoint: broadcastAuthEndpoint,
        headersProvider: () => {
            const token = localStorage.getItem("token");

            return token ? { Authorization: `Bearer ${token}` } : {};
        },
    },
});

export default echo;