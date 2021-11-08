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
import { mapState } from "vuex";
import { f7 } from "framework7-vue";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      let userLogin = {
        user: this.username,
        pass: this.password,
      };
      f7.dialog.preloader();
      this.$axios.post("/customer/login", userLogin)
        .then((res) => {
          f7.dialog.close();
          let token = res.data.token;
          let log = res.data.log;
          this.$axios
            .get("/customer/get", {
              headers: {
                "X-Auth-Token": token,
              },
            })
            .then((res) => {
              let dataLogin = {
                token: token,
                dataUser: res.data.content,
              };
              this.$store.dispatch("login", dataLogin);
              f7.toast
                .create({
                  text: "Login Success",
                  position: "bottom",
                  closeTimeout: 2000,
                  destroyOnClose: true,
                })
                .open();
              f7router.navigate("/");
              this.$axios.defaults.headers.common["X-Auth-Token"] = token;
            });
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
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.login.isLoggedIn,
    }),
  },
};
</script>
<style>
.center-wrapper {
  height: 80vh;
  display: flex;
}
</style>