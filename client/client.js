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

// Register Command exemple
RegisterCommand("phone-show", () => {
    getPlayerData((playerData) => {
        console.log("phone-show: checking if player has a phone number active");

        emitNet("phone-show", playerData);
    });
});

//  listener example
onNet("phone-show", (data) => {
    if (data && data.length > 0) {
        console.log("phone-show: phone number: ", data[0]);

        SetNuiFocus(true, true);
        sendReactMessage("setVisible", true);
    } else {
        console.log("phone-show: player don't have a phone number");
    }
});

// NUI Call Example
RegisterNuiCallbackType("hideFrame");

on("__cfx_nui:hideFrame", function (_, cb) {
    SetNuiFocus(false, false);
    sendReactMessage("setVisible", false);
    cb({});
});
