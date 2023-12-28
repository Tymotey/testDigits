import {
    labelsStatusTask,
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
        model: "content",
        type: "text",
        label: "Content",
        validation: [(val) => (val && val.length > 0) || "Please type content"],
    },
    {
        model: "projectId",
        type: "ajaxSelect",
        label: "Project",
        data: {
            collection: "projects",
        },
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
        model: "sortBy",
        type: "number",
        label: "Sort by",
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
            options: labelsStatusTask,
        },
    },
];

export { fields };
