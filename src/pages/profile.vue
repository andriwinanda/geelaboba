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
      <f7-block class="no-margin-bottom" v-else>
        <h2 class="is-capitalized no-margin-bottom">
          {{ user.fname }}
        </h2>
        <f7-link><small>Edit Profile</small></f7-link>
      </f7-block>
      <f7-card @click="f7router.navigate('/voucher/')">
        <f7-card-content>
          <f7-row class="align-items-center">
            <f7-col width="20">
              <f7-icon class="text-color-gray" size="48" f7="ticket"></f7-icon>
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
            <f7-icon class="text-color-gray" f7="chat_bubble_2_fill"></f7-icon>
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
    </f7-page>
  </div>
</template>
<script>
import { useStore } from "framework7-vue";
import store from "../js/store";

export default {
  props: {
    f7router: Object,
  },
  data() {
    return {
      dataUser: {},
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
    logout(){
      store.dispatch("logout");
    }
  },
  mounted() {
  },
};
</script>
<style>
.center-wrapper {
  height: 80vh;
  display: flex;
}
</style>