<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu :active-name="activeName" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="/" to="/">
            <Icon type="ios-navigate"></Icon>
            <span>首页</span>
          </MenuItem>
          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 目录 -->
            <Submenu :name="item.id+''" v-if="item.children">
              <template slot="title">
                <Icon :type="item.icon"></Icon>
                <span>{{item.title}}</span>
              </template>
              <MenuItem v-for="i in item.children" :key="i.id" :name="i.url" :to="i.url">{{i.title}}</MenuItem>
            </Submenu>
            <!-- 菜单 -->
            <MenuItem v-else :name="item.url" :to="item.url">{{item.title}}</MenuItem>
          </div>
        </Menu>
      </Sider>
      <Layout>
        <Header
          class="header"
          :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"
        >
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{position:'absolute',left:'10px',margin:'20px 0'}"
            type="md-menu"
            size="24"
          ></Icon>
          <div class="logOut">
            <h2>{{userInfo.username}}</h2>
            <el-button type="danger" @click="logOut">退出登录</el-button>
          </div>
        </Header>
        <Content :style="{padding: '0 16px 16px'}">
          <Breadcrumb class="breadCrumb" :style="{margin: '16px 0'}">
            <BreadcrumbItem v-if="$route.name" :to="{ path: '/' }">首页</BreadcrumbItem>
            <BreadcrumbItem>{{$route.name}}</BreadcrumbItem>
          </Breadcrumb>
          <div class="page">
            <transition name="slide">
            <router-view />
            </transition>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isCollapsed: false,
      activeName: this.$route.path,
    };
  },
  watch: {
    $route() {
      this.activeName = this.$route.path;
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    ...mapActions({
      changeUserInfoAction: "changeUserInfoAction",
    }),
    logOut() {
      //退出登录传递空对象做识别
      this.changeUserInfoAction({});
      this.$router.push("/login");
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
  },
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.breadCrumb {
  text-align: left;
}

.header{
  position: relative;
}

.header .logOut {

  position: absolute;
  right: 10px;
  height: 100%;
  padding-top: 10px;
}
.header .logOut h2 {
  margin: 10px;
  line-height: 20px;
}
.header .logOut h2,
button {
  float: left;
}

.page {
  text-align: left;
  margin: 20px 0 20px 0;
}

.slide-enter-active{
  transition: all 0.8s ease;
}

.slide-enter, .slide-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>