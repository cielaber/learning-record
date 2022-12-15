const { fetchRepoList, fetchTagList } = require("./request");
const Inquirer = require("inquirer");
const { wrapLoading } = require("./utils");
const downloadGitRepo = require("download-git-repo");
const util = require("util");
const path = require("path");

class Creator {
  constructor(projectName, targetDir) {
    this.name = projectName;
    this.target = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async fetchRepo() {
    let repos = await wrapLoading(fetchRepoList, "waiting fetch template");

    if (!repos) return;

    repos = repos.map((item) => item.name);

    let { repo } = await Inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "please choose a template to create project",
    });

    return repo;
  }

  async fetchTag(repo) {
    let tags = await wrapLoading(fetchTagList, "waiting fetch tag", repo);
    if (!tags) return;
    tags = tags.map((item) => item.name);

    let { tag } = await Inquirer.prompt({
      name: "tag",
      type: "list",
      choices: tags,
      message: "please choose a tag to create project",
    });
    return tag;
  }

  async download(repo, tag) {
    // 拼接出下载路径
    let requestUrl = `zhu-cli/${repo}${tag ? "#" + tag : ""}`;

    // 把资源下载到某个路径上
    // TODO：正常情况下，应该先下载到系统目录中，结合用户的其他选择，然后使用ejs、handlerbar去渲染模板，最后生成结果再写入到target目录
    // TODO：下载缓存

    await wrapLoading(
      this.downloadGitRepo,
      "waiting download ...",
      requestUrl,
      path.resolve(process.cwd(), `${repo}@${tag}`)
    );

    return this.target;
  }

  async create() {
    // 真实开始创建

    // 先去拉去当前组织下的模版
    let repo = await this.fetchRepo();
    // 通过模板找到版本号
    let tag = await this.fetchTag(repo);
    // 下载
    await this.download(repo, tag);

    // 编译模版
  }
}

module.exports = Creator;
