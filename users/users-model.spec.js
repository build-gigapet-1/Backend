const User = require("./users-model.js");
const db = require("../database/dbConfig.js");

describe("user model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("add()", () => {
    it("adds a user to the database", async () => {
      await User.add({ username: "Rick", password: "pickle", phone: "8174948372" });
      const user = await db("users");
      expect(user).toHaveLength(1);
    });
  });
  describe("remove()", () => {
    it("adds a user and then removes them", async () => {
      const useradd = await User.add({ username: "Joe", password: "vice", phone: "8174464372"  });
      await User.del(useradd.id);
      const userdel = await db("users");
      return expect(userdel).toHaveLength(0);
    });
  });
});