/// <reference path="../node_modules/@citizenfx/client/natives_universal.d.ts"/>

/**
 * Gets player data
 * @returns {cb} callback with player data
 */
const getPlayerData = (cb) => {
    emit("Framework:Player:GetPlayerData", (data) => {
        cb(data);
    });
};

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

RegisterCommand("phone-show", () => {
    getPlayerData((playerData) => {
        console.log("phone-show: checking if player has a phone number active");

        emitNet("phone-show", playerData);
    });
});

onNet("phone-show", (data) => {
    if (data && data.length > 0) {
        console.log("phone-show: phone number: ", data[0]);

        SetNuiFocus(true, true);
        sendReactMessage("setVisible", true);
    } else {
        console.log("phone-show: player don't have a phone number");
    }
});

RegisterCommand("phone-create-number", () => {
    getPlayerData((playerData) => {
        console.log("phone-create-number: creating phone number");

        emitNet("phone-create-number", playerData);
    });
});

onNet("phone-create-number", (data) => {
    console.log("phone-number created", data);
});

RegisterNuiCallbackType("hideFrame");

on("__cfx_nui:hideFrame", function (_, cb) {
    SetNuiFocus(false, false);
    sendReactMessage("setVisible", false);
    cb({});
});

// messages app

RegisterNuiCallbackType("phone-send-message");

on("__cfx_nui:phone-send-message", function (data, cb) {
    getPlayerData((playerData) => {
        emitNet("phone-send-message", playerData, data);

        cb({});
    });
});

RegisterNuiCallbackType("phone-get-messages");

on("__cfx_nui:phone-get-messages", function (_data, cb) {
    getPlayerData((playerData) => {
        console.log("client:phone-get-messages: called");

        emitNet("phone-get-messages", playerData);

        cb({});
    });
});

onNet("phone-get-messages", (data) => {
    console.log("server:phone-get-messages: received ", data);

    sendReactMessage("phone-receive-messages", data);
});

RegisterNuiCallbackType("phone-get-messages-from-user");

on("__cfx_nui:phone-get-messages-from-user", function (data, cb) {
    const player = getPlayerId();

    emitNet("phone-get-messages-from-user", player, data);

    cb({});
});

onNet("phone-get-messages-from-user", (data) => {
    sendReactMessage("phone-receive-messages-from-user", data);
});

// email app

RegisterNuiCallbackType("phone-send-email");

on("__cfx_nui:phone-send-email", function (data, cb) {
    const player = getPlayerId();

    emitNet("phone-send-email", player, data);

    cb({});
});

RegisterNuiCallbackType("phone-get-emails");

on("__cfx_nui:phone-get-emails", function (_data, cb) {
    const player = getPlayerId();

    emitNet("phone-get-emails", player);

    cb({});
});

onNet("phone-get-emails", (data) => {
    sendReactMessage("phone-get-emails", data);
});

RegisterNuiCallbackType("phone-get-emails-from-user");

on("__cfx_nui:phone-get-emails-from-user", function (data, cb) {
    const player = getPlayerId();

    emitNet("phone-get-emails-from-user", player, data);

    cb({});
});

onNet("phone-get-emails-from-user", (data) => {
    sendReactMessage("phone-get-emails-from-user", data);
});

// contacts app

RegisterNuiCallbackType("phone-get-contacts");

on("__cfx_nui:phone-get-contacts", function (data, cb) {
    const player = getPlayerId();

    emitNet("phone-get-contacts", player, data);

    cb({});
});

onNet("phone-get-contacts", (data) => {
    sendReactMessage("phone-get-contacts", data);
});

RegisterNuiCallbackType("phone-get-contact");

on("__cfx_nui:phone-get-contact", function (data, cb) {
    const player = getPlayerId();

    emitNet("phone-get-contact", player, data);

    cb({});
});

onNet("phone-get-contact", (data) => {
    sendReactMessage("phone-get-contact", data);
});

RegisterNuiCallbackType("phone-delete-contact");

on("__cfx_nui:phone-delete-contact", function (data, cb) {
    const player = getPlayerId();

    emitNet("phone-delete-contact", player, data);

    cb({});
});

RegisterNuiCallbackType("phone-edit-contact");

on("__cfx_nui:phone-edit-contact", function (data, cb) {
    const player = getPlayerId();

    emitNet("phone-edit-contact", player, data);

    cb({});
});

RegisterNuiCallbackType("phone-new-contact");

on("__cfx_nui:phone-new-contact", function (data, cb) {
    const player = getPlayerId();

    emitNet("phone-new-contact", player, data);

    cb({});
});
