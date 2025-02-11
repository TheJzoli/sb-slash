const { formatUser, getLastSegmentTime } = require("../util/formatResponse.js");
const { userComponents } = require("../util/components.js");
const { invalidPublicID } = require("../util/invalidResponse.js");
const { getUserInfo } = require("../util/min-api.js");
const { userStrictCheck } = require("../util/validation.js");

module.exports = {
  name: "lookupuser",
  execute: async ({ interaction, response }) => {
    const publicid = interaction.message.embeds[0].description.match(/(?:\*\*User ID:\*\*) `([a-f0-9]{64})`/)[1];
    if (!userStrictCheck(publicid)) return response(invalidPublicID);
    // fetch
    const parsedUser = await getUserInfo(publicid);
    // get last segment time
    const timeSubmitted = await getLastSegmentTime(parsedUser.lastSegmentID);
    return response({
      type: 4,
      data: {
        content: formatUser(parsedUser, timeSubmitted),
        components: userComponents(publicid, true),
        flags: 64
      }
    });
  }
};
