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
    region: "us-east-1",
});

let sendEmail = (code) => {
    let params = {
        Source: "UNsocial Network <marcellpret@gmail.com>",
        Destination: {
            ToAddresses: ["marcellpret@gmail.com"],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Text: {
                    Data: `
                        Thanks for resetting your password
                        ${code}
                        Your verification code expires in 10 minutes, make sure to use it before that.
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
        .catch((err) => console.log("error in SES: ", err));
};

module.exports = {
    sendEmail,
};
