import { labelsUserRole } from "../../../functions/constants";

const fields = [
    {
        model: "name",
        type: "text",
        label: "Name",
        validation: [(val) => (val && val.length > 0) || "Please type a name"],
    },
    {
        model: "email",
        type: "email",
        label: "Email",
        validation: [
            (val) => (val && val.length > 0) || "Please type an email",
        ],
    },
    {
        model: "role",
        type: "select",
        label: "Role",
        validation: [
            (val) => (val != undefined && val !== "") || "Please select role",
        ],
        data: {
            options: labelsUserRole,
        },
    },
    {
        model: "password",
        type: "password",
        label: "Password",
        hint: "Complete password fields to change password.",
    },
    {
        model: "confirmPassword",
        type: "password",
        label: "Confirm password",
    },
];

export { fields };
