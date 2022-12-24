/// <reference path="../node_modules/@citizenfx/client/natives_universal.d.ts"/>

/**
 * Sends a message to the UI in React.js
 * @param {string} action
 * @param {object | boolean | string | number} data
 */
const sendReactMessage = (action, data) => {
    SendNuiMessage(
        JSON.stringify({
            action: action,
            data: data,
        })
    );
};

// Register Command exemple
RegisterCommand("setVisible", () => {
    SetNuiFocus(true, true);
    sendReactMessage("setVisible", true);
});

// NUI Call Example
RegisterNuiCallbackType("hideFrame");

on("__cfx_nui:hideFrame", function (_, cb) {
    SetNuiFocus(false, false);
    sendReactMessage("setVisible", false);
    cb({});
});
