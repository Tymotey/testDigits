import { useStore } from "vuex";
import axios from "axios";
import { useQuasar } from "quasar";

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

const doRequestList = async (
    url = false,
    actionOnSuccess = () => {},
    actionOnError = () => {},
    loader
) => {
    if (url) {
        const store = useStore();
        const $q = useQuasar();
        let loaderSettings = {
            show: false,
            messageLoading: "Loading...",
            ...loader,
        };
        let userToken = store.getters["user/getUserToken"];
        let requestUrl = await store.dispatch(
            "ajax/getFullApiWithActionUrl",
            url
        );

        if (requestUrl) {
            let dismissThis = false;
            if (loaderSettings.show) {
                dismissThis = $q.notify(
                    getNotificationSettings(
                        "ongoing",
                        loaderSettings.messageLoading
                    )
                );
            }

            let headers = {
                Authorization: `Bearer ` + userToken,
            };
            if (url === "logout") {
                headers["Accept"] = "application/json";
            }

            await axios
                .get(requestUrl, {
                    headers: headers,
                })
                .then(async (response) => {
                    if (dismissThis !== false) dismissThis();
                    actionOnSuccess(response);
                })
                .catch((err) => {
                    console.log(err);
                    if (dismissThis !== false) dismissThis();
                    $q.notify(
                        getNotificationSettings(
                            "negative",
                            err.response?.data?.message || "Error"
                        )
                    );
                    actionOnError();
                });
        }
    }
};

export { doRequestList, getNotificationSettings };
