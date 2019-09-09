const Developer = require("../models/Developer");

module.exports = {
  async store(req, res) {
    console.log("REQ IO: ", req.io, "REQ.CONNECTEDUSERS: ", req.connectedUsers);

    const { user } = req.headers;
    const { developerID } = req.params;

    const loggedDeveloper = await Developer.findById(user);
    const targetDeveloper = await Developer.findById(developerID);

    if (!targetDeveloper) {
      return res.status(400).json({ error: "DEVELOPER NOT EXISTS" });
    }

    if (targetDeveloper.likes.includes(loggedDeveloper._id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[developerID];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit("match", targetDeveloper);
      }
      if (targetSocket) {
        req.io.to(targetSocket).emit("match", loggedDeveloper);
      }
    }
    loggedDeveloper.likes.push(targetDeveloper._id);

    await loggedDeveloper.save();
    return res.json(loggedDeveloper);
  }
};
