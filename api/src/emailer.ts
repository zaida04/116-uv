import Mailgun from "mailgun.js";

if (!process.env.MAILGUN_API_KEY && process.env.BUN_ENV === "production") {
    throw new Error("MAILGUN_API_KEY is not defined");
}

const emailer = new Mailgun(FormData).client({
    "username": "api",
    "key": process.env.MAILGUN_API_KEY! ?? "test"
});

export { emailer }