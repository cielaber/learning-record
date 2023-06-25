const axios = require("axios");

axios.interceptors.response.use((res) => {
  return res.data;
});

async function fetchRepoList() {
  //   return axios.get("https://api.github.com/orgs/zhu-cli/repos");
  return require("../data/repo.json");
}

async function fetchTagList(repo) {
  //   return axios.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`);
  return require(`../data/${repo}/tags.json`);
}

module.exports = {
  fetchRepoList,
  fetchTagList,
};
