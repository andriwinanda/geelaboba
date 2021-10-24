<template>
  <f7-app v-bind="f7params" >
  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-home" tab-link-active icon-size="24" icon-f7="house" text="Home"></f7-link>
      <f7-link tab-link="#view-menu" icon-size="24" icon-f7="square_list" text="Menu"></f7-link>
      <f7-link tab-link="#view-voucher" icon-size="24" icon-f7="ticket" text="Voucher"></f7-link>
      <f7-link tab-link="#view-profile" icon-size="24" icon-f7="person_fill" text="Profile"></f7-link>
     
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-home" main tab tab-active url="/"></f7-view>

    <!-- Menu View -->
    <f7-view id="view-menu" name="menu" tab url="/menu/"></f7-view>

    <!-- Voucher View -->
    <f7-view id="view-voucher" name="voucher" tab url="/voucher/"></f7-view>

    <!-- Settings View -->
    <f7-view id="view-login" name="login" tab url="/login/"></f7-view>

    <!-- Settings View -->
    <!-- <f7-view id="view-settings" name="settings" tab url="/settings/"></f7-view> -->


  </f7-views>
  </f7-app>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { f7, f7ready } from 'framework7-vue';


  import routes from '../js/routes.js';
  import store from '../js/store';

  export default {
    setup() {

      // Framework7 Parameters
      const f7params = {
        name: 'Geelaboba', // App name
        theme: 'ios', // Automatic theme detection



        // App store
        store: store,
        // App routes
        routes: routes,
        // Register service worker (only on production build)
        serviceWorker: process.env.NODE_ENV ==='production' ? {
          path: '/service-worker.js',
        } : {},
      };
      // Login screen data
      const username = ref('');
      const password = ref('');

      const alertLoginData = () => {
        f7.dialog.alert('Username: ' + username.value + '<br>Password: ' + password.value, () => {
          f7.loginScreen.close();
        });
      }
      onMounted(() => {
        f7ready(() => {


          // Call F7 APIs here
        });
      });

      return {
        f7params,
        username,
        password,
        alertLoginData
      }
    }
  }
</script>
<style>
html {
  background-color: #000000;
}
body {
  max-width: 30rem !important;
  margin: 0 auto !important;
}
.page{
  background-color: #fdfdfd !important;
}
</style>