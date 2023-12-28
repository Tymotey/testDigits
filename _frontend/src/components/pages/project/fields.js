import {
    labelsStatusProject,
    labelsVisibility,
} from "../../../functions/constants";

const fields = [
    {
        model: "title",
        type: "text",
        label: "Title",
        validation: [(val) => (val && val.length > 0) || "Please type a title"],
    },
    {
        model: "description",
        type: "text",
        label: "Description",
        validation: [
            (val) => (val && val.length > 0) || "Please type description",
        ],
    },
    {
        model: "assignedTo",
        type: "ajaxSelect",
        label: "Assigned to",
        validation: [
            (val) => {
                return (val && val !== "") || "Please select a user";
            },
        ],
        data: {
            collection: "users",
        },
    },
    {
        model: "visible",
        type: "select",
        label: "Visible",
        validation: [
            (val) =>
                (val != undefined && val !== "") || "Please select visibility",
        ],
        data: {
            options: labelsVisibility,
        },
    },
    {
        model: "status",
        type: "select",
        label: "Status",
        validation: [(val) => (val && val !== "") || "Please select status"],
        data: {
            options: labelsStatusProject,
        },
    },
];

export { fields };
