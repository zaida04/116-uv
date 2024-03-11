import Mailgun from "mailgun.js";

if (!process.env.MAILGUN_API_KEY && process.env.BUN_ENV === "production") {
    throw new Error("MAILGUN_API_KEY is not defined");
}

const API_KEY = process.env.MAILGUN_API_KEY! || "test";
const emailer = new Mailgun(FormData).client({
    "username": "api",
    "key": API_KEY
});

export { emailer }