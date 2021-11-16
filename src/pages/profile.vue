<template>
  <div>
    <f7-page name="profile">
      <f7-navbar title="Profile" back-link></f7-navbar>
      <f7-block v-if="!user" class="align-items-center center-wrapper">
        <div style="margin: 0 auto">
          <p class="text-align-center text-color-gray">
            Silahkan login terlebih dulu!
          </p>
          <br />
          <f7-button fill href="/login/">Login</f7-button>
        </div>
      </f7-block>
      <template v-else>
        <f7-block class="no-margin-bottom">
          <h2 class="is-capitalized no-margin-bottom">
            {{ user.fname }}
          </h2>
          <f7-link @click="popupOpened = true"
            ><small>Edit Profile</small></f7-link
          >
        </f7-block>
        <f7-card @click="f7router.navigate('/voucher/')">
          <f7-card-content>
            <f7-row class="align-items-center">
              <f7-col width="20">
                <f7-icon
                  class="text-color-gray"
                  size="48"
                  f7="ticket"
                ></f7-icon>
              </f7-col>
              <f7-col width="80">
                <strong>Voucher Spesial Untuk Kamu</strong>
                <br />
                <small class="text-color-primary"> Lihat Voucher </small>
              </f7-col>
            </f7-row>
          </f7-card-content>
        </f7-card>
        <f7-list class="no-hairlines">
          <f7-list-item title="Notifkasi" link="#">
            <template #media>
              <f7-icon class="text-color-gray" f7="bell_fill"></f7-icon>
            </template>
          </f7-list-item>
          <f7-list-item title="Live Chat" link="#">
            <template #media>
              <f7-icon
                class="text-color-gray"
                f7="chat_bubble_2_fill"
              ></f7-icon>
            </template>
          </f7-list-item>
          <f7-list-item title="About Us" link="#">
            <template #media>
              <f7-icon class="text-color-gray" f7="info_circle_fill"></f7-icon>
            </template>
          </f7-list-item>
        </f7-list>
        <f7-block>
          <f7-button @click="logout()">Logout</f7-button>
        </f7-block>

        <!-- Update Profile -->
        <f7-popup
          class="demo-popup"
          :opened="popupOpened"
          @popup:closed="popupOpened = false"
        >
          <f7-page>
            <f7-navbar title="Edit Profile" no-hairline no-shadow>
              <f7-nav-right>
                <f7-link popup-close icon-f7="multiply" />
              </f7-nav-right>
            </f7-navbar>
            <f7-toolbar position="bottom">
              <f7-block style="width: 100%" padding>
                <f7-button
                  fill
                  @click="updateProfile()"
                  :loading="showPreloader"
                  >Save</f7-button
                >
              </f7-block>
            </f7-toolbar>
            <f7-list no-hairlines-md>
              <f7-list-input
                label="Name"
                type="text"
                placeholder="Your name"
                :value="user.fname"
                @input="user.fname = $event.target.value"
                clear-button
              >
              </f7-list-input>

              <f7-list-input
                label="E-mail"
                type="email"
                placeholder="Your e-mail"
                :value="user.email"
                @input="user.email = $event.target.value"
                clear-button
              >
              </f7-list-input>

              <f7-list-input
                label="Phone"
                type="tel"
                placeholder="Your phone number"
                :value="user.phone1"
                @input="user.phone1 = $event.target.value"
                clear-button
              >
              </f7-list-input>
              <f7-list-input
                label="Password"
                type="password"
                @input="user.password = $event.target.value"
                placeholder="Your password"
                clear-button
              >
              </f7-list-input>
            </f7-list>
          </f7-page>
        </f7-popup>
      </template>
    </f7-page>
  </div>
</template>
<script>
import { useStore } from "framework7-vue";
import store from "../js/store";
import { f7 } from "framework7-vue";

export default {
  props: {
    f7router: Object,
  },
  data() {
    return {
      dataUser: {},
      popupOpened: false,
      showPreloader: false,
      update: {
        tname: "",
        temail: "",
        tpassword: "",
        tphone1: "",
      },
    };
  },
  setup() {
    const user = useStore("user");

    // const login = () => {
    //   store.dispatch("addProduct", {
    //     id: "4",
    //     title: "Apple iPhone 12",
    //     description:
    //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
    //   });
    // };
    return {
      user,
    };
  },
  methods: {
    logout() {
      store.dispatch("logout");
    },
    updateProfile() {
      let dataUpdate ={
        tname : this.user.fname,
        temail : this.user.email,
        tphone1 : this.user.phone1,
        tpassword: this.user.password
      }
      if (!dataUpdate.tpassword) {
        delete dataUpdate.tpassword;
      }
      this.showPreloader = true;
      this.$axios
        .post("/customer/update", dataUpdate)
        .then((res) => {
          this.showPreloader = false;
          this.popupOpened = false;
          f7.toast
            .create({
              text: res.data.content,
              position: "bottom",
              closeTimeout: 2000,
              destroyOnClose: true,
            })
            .open();
        })
        .catch((error) => {
          this.showPreloader = false;
          f7.toast
            .create({
              text: error.response.data.error,
              position: "bottom",
              closeTimeout: 2000,
              destroyOnClose: true,
            })
            .open();
        });
    },
  },
  mounted() {},
};
</script>
<style>
.center-wrapper {
  height: 80vh;
  display: flex;
}
</style>