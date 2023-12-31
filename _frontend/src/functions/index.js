import { fas0 } from "@quasar/extras/fontawesome-v6";
import axios from "axios";

const getNotificationSettings = (
    type = "ongoing", // positive, negative, warning, info, ongoing
    message = "Loading...",
    settingsParam
) => {
    let settingsDefault = {
        actions: null,
        color: null,
        showProgress: false,
    };
    let settings = { ...settingsDefault, ...settingsParam };
    let returnData = {
        type: type,
        timeout: 1000,
        progress: settings.progress,
        message: message,
    };

    if (settings.color !== null) returnData["color"] = settings.color;
    if (settings.textColor !== null)
        returnData["textColor"] = settings.textColor;
    if (settings.icon !== null) returnData["icon"] = settings.icon;
    if (settings.actions !== null) returnData["actions"] = settings.actions;

    return returnData;
};

const getPaginationParams = (type, store) => {
    let paginationParams = [];

    if (store.getters[type + "/getPage"]) {
        paginationParams.push("page=" + store.getters[type + "/getPage"]);
        paginationParams.push("results=" + store.getters[type + "/getPerPage"]);
    }

    return paginationParams.join("&");
};

const returnRequestResult = async (requestUrl, data) => {
    let userToken = data.store.getters["user/getUserToken"];

    let headers = {
        Authorization: `Bearer ` + userToken,
    };

    try {
        const response = await axios.get(requestUrl, {
            headers: headers,
        });
        return response.data;
    } catch (error) {
        return false;
    }
};

const doRequest = async (
    actionName = false,
    actionOnSuccess = () => {},
    actionOnError = () => {},
    data
) => {
    if (actionName) {
        let loaderSettings = {
            show: true,
            messageLoading: "Loading...",
            ...data.loader,
        };

        // Url add
        let isUserActions =
            ["login", "logout", "profile"].indexOf(actionName) !== -1;
        let isPageAction = actionName.search("/") !== -1;
        let paginationUrlAdd =
            !isUserActions || !isPageAction
                ? getPaginationParams(actionName, data.store)
                : null;

        let urlAdd = [];
        if ([null, undefined].indexOf(paginationUrlAdd) === -1) {
            urlAdd.push(paginationUrlAdd);
        }
        if ([null, undefined].indexOf(data.urlAdd) === -1) {
            urlAdd.push(data.urlAdd);
        }

        // User token
        let userToken = data.store.getters["user/getUserToken"];

        // Request type
        if (data.method === undefined) data.method = "get";
        if (data.postData === undefined) data.postData = {};

        // Get request Url
        let requestUrl = await data.store.dispatch(
            "ajax/getFullApiWithActionUrl",
            {
                action: actionName,
                urlAdd: urlAdd.join("&"),
            }
        );

        if (requestUrl) {
            let dismissThis = false;
            if (loaderSettings.show) {
                dismissThis = data.q.notify(
                    getNotificationSettings(
                        "ongoing",
                        loaderSettings.messageLoading
                    )
                );
            }

            let headers = {
                Authorization: `Bearer ` + userToken,
            };
            if (actionName === "logout") {
                headers["Accept"] = "application/json";
            }

            // Make request correctly based on method value
            let request = "";
            if (data.method === "get") {
                request = axios.get(requestUrl, {
                    headers: headers,
                });
            } else if (data.method === "delete") {
                request = axios.delete(requestUrl, {
                    headers: headers,
                });
            } else if (data.method === "put") {
                request = axios.put(requestUrl, data.postData, {
                    headers: headers,
                });
            } else {
                request = axios.post(requestUrl, data.postData, {
                    headers: headers,
                });
            }

            // Get results and run the callback
            request
                .then(async (response) => {
                    if (dismissThis !== false) dismissThis();
                    actionOnSuccess(response);
                })
                .catch((err) => {
                    console.log(err);
                    if (dismissThis !== false) dismissThis();
                    data.q.notify(
                        getNotificationSettings(
                            "negative",
                            err.response?.data?.message || "Error"
                        )
                    );
                    if (actionOnError !== null) actionOnError();
                });
        }
    }
};

export { returnRequestResult, doRequest, getNotificationSettings };
