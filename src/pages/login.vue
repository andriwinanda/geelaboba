<template>
  <div>
    <f7-page login-screen>
      <f7-login-screen-title> Login </f7-login-screen-title>
      <f7-list form>
        <f7-list-input
          type="text"
          name="username"
          placeholder="Username"
          :autofocus="true"
          :value="username"
          @input="username = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          type="password"
          name="password"
          placeholder="Password"
          :value="password"
          @keypress.enter.prevent="login()"
          @input="password = $event.target.value"
        ></f7-list-input>
      </f7-list>
      <f7-block>
        <f7-button large fill color="primary" @click.prevent="login()"
          >Login</f7-button
        >
      </f7-block>
    </f7-page>
  </div>
</template>
<script>
import { useStore } from "framework7-vue";
import store from "../js/store";
import { f7 } from "framework7-vue";
export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  setup() {
    // const login = () => {
    //   store.dispatch("addProduct", {
    //     id: "4",
    //     title: "Apple iPhone 12",
    //     description:
    //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
    //   });
    // };
    // return {
    //   login,
    // };
  },
  methods: {
    login() {
      let userLogin = {
        username: this.username,
        password: this.password,
        device: "",
      };
      f7.dialog.preloader();
      this.$axios
        .post("/customer/login", userLogin)
        .then((res) => {
          f7.dialog.close();
          let token = res.data.content.token;
          // this.$axios
          //   .get("/customer/get", {
          //     headers: {
          //       "X-Auth-Token": token,
          //     },
          //   })
          //   .then((res) => {
          let dataLogin = {
            token: token,
            // dataUser: res.data.content,
          };
          f7.toast
            .create({
              text: "Login Success",
              position: "bottom",
              closeTimeout: 2000,
              destroyOnClose: true,
            })
            .open();
          this.$axios.defaults.headers.common["X-Auth-Token"] = token;
          store.dispatch("login", dataLogin);
          this.f7router.navigate("/");
          // });
        })
        .catch((error) => {
          f7.dialog.close();
          if (!error.response || error.response.status === 500) {
            f7.dialog.alert(
              "Please check your network connection!",
              "Connection Lost!"
            );
          } else if (error.response.status === 404) {
            f7.dialog.alert("Username/password incorrect", "Incorrect");
          }
        });
    },
  },
};
</script>
<style>
.center-wrapper {
  height: 80vh;
  display: flex;
}
</style>