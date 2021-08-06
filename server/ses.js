const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-central-1",
});

let sendEmail = (code) => {
    let params = {
        Source: "UNsocial Network <maropret@hotmail.com>",
        Destination: {
            ToAddresses: ["marcellpret@gmail.com"],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Text: {
                    Data: `
                        <h3>Thanks for resetting your password</h3>
                        <h2>${code}</h2>
                        <p>Your verification code expires in 10 minutes, make sure to use it before that.</p>
                        `,
                },
            },
            Subject: {
                Data: "Your verification code",
            },
        },
    };
    return ses
        .sendEmail(params)
        .promise()
        .then(() => console.log("Email sent"))
        .catch(console.log);
};

module.exports = {
    sendEmail,
};
