const Developer = require("../models/Developer");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { developerID } = req.params;

    const loggedDeveloper = await Developer.findById(user);
    const targetDeveloper = await Developer.findById(developerID);

    if (!targetDeveloper) {
      return res.status(400).json({ error: "DEVELOPER NOT EXISTS" });
    }

    loggedDeveloper.dislikes.push(targetDeveloper._id);

    await loggedDeveloper.save();
    return res.json(loggedDeveloper);
  }
};
