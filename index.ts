import { promisify } from "util";
const awscred = require("awscred");

const loadAwsCred = promisify(awscred.load);

enum Attribute {
  accessKeyId = "accessKeyId",
  secretAccessKey = "secretAccessKey",
  sessionToken = "sessionToken",
}

export const templateTags = [
  {
    name: "iamaws",
    displayName: "iamaws",
    description: "Insomnia plugin - IAM AWS",
    args: [
      {
        displayName: "Attribute",
        type: "enum",
        options: [
          {
            displayName: Attribute.accessKeyId,
            value: Attribute.accessKeyId,
          },
          {
            displayName: Attribute.secretAccessKey,
            value: Attribute.secretAccessKey,
          },
          {
            displayName: Attribute.sessionToken,
            value: Attribute.sessionToken,
          },
        ],
      },
      {
        displayName: "Profile",
        description: "Profile name",
        type: "string",
        defaultValue: "default",
      },
    ],
    async run(context: object, attribute: Attribute, profile: String) {
      const loadedCredentialObject = await loadAwsCred({
        profile: profile,
      });
      return loadedCredentialObject.credentials[attribute];
    },
  },
];
