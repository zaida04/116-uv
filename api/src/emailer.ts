import Mailgun from "mailgun.js";

if (!process.env.MAILGUN_API_KEY) {
    throw new Error("MAILGUN_API_KEY is not defined");
}

const emailer = new Mailgun(FormData).client({
    "username": "api",
    "key": process.env.MAILGUN_API_KEY!
});

export { emailer }