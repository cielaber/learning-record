const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require("./Creator");
module.exports = async function (projectName, options) {
  console.log(projectName, options);

  const cwd = process.cwd();

  const targetDir = path.join(cwd, projectName);

  if (fs.existsSync(targetDir)) {
    if (options.force) {
      // 如果强制创建，删除已有的
      await fs.remove(targetDir);
    } else {
      // 提示用户是否确定要覆盖
      let { action } = await Inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Traget directory already exists pick an action:",
          choices: [
            {
              name: "Overwrite",
              value: "overwrite",
            },
            {
              name: "Cancel",
              value: false,
            },
          ],
        },
      ]);
      if (!action) {
        return;
      } else if (action === "overwrite") {
        console.log(`\r\nRemoving...`);
        await fs.remove(targetDir);
      }
    }
  }

  // 创建项目
  const creator = new Creator(projectName, targetDir);
  creator.create();
};
