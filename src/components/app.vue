<template>
  <f7-app v-bind="f7params" >
  <!-- Views/Tabs container -->
  <!-- <f7-views tabs class="safe-areas"> -->
    <!-- Tabbar for switching views-tabs -->
    <!-- <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-home" tab-link-active icon-size="24" icon-f7="house" text="Home"></f7-link>
      <f7-link tab-link="#view-menu" icon-size="24" icon-f7="square_list" text="Menu"></f7-link>
      <f7-link tab-link="#view-voucher" icon-size="24" icon-f7="ticket" text="Voucher"></f7-link>
      <f7-link tab-link="#view-profile" icon-size="24" icon-f7="person_fill" text="Profile"></f7-link>
     
    </f7-toolbar> -->

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <!-- <f7-view id="view-home" main tab tab-active url="/"></f7-view> -->

    <!-- Menu View -->
    <!-- <f7-view id="view-menu" name="menu" tab url="/menu/"></f7-view> -->

    <!-- Voucher View -->
    <!-- <f7-view id="view-voucher" name="voucher" tab url="/voucher/"></f7-view> -->

    <!-- Settings View -->
    <!-- <f7-view id="view-login" name="login" tab url="/login/"></f7-view> -->

    <!-- Settings View -->
    <!-- <f7-view id="view-settings" name="settings" tab url="/settings/"></f7-view> -->


  <!-- </f7-views> -->
    <f7-view main class="safe-areas" :browser-history="true" :reloadCurrent="true" browser-history-separator>
      <tabbar/>
    </f7-view>

  </f7-app>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { f7, f7ready } from 'framework7-vue';
  import tabbar from './Tabbar.vue'
  import routes from '../js/routes.js';
  import store from '../js/store';

  export default {
    components:{ 
      tabbar
    },
    props: {
    f7route: Object,
    f7router: Object,
  },
    setup() {

      // Framework7 Parameters
      const f7params = {
        name: 'Geelaboba', // App name
        theme: 'md', // Automatic theme detection



        // App store
        store: store,
        // App routes
        routes: routes,
        // Register service worker (only on production build)
        serviceWorker: process.env.NODE_ENV ==='production' ? {
          path: '/service-worker.js',
        } : {},
      };
      // Menu screen data
      const menu = [
        {
          title: 'Home',
          icon: 'house',
          link: '/'
        },
        {
          title: 'Menu',
          icon: 'square_list',
          link: '/menu/'
        },
        {
          title: 'Voucher',
          icon: 'ticket',
          link: '/voucher/'
        },
        {
          title: 'Profile',
          icon: 'person_fill',
          link: '/profile/'
        },
      ];

      onMounted(() => {
        f7ready(() => {
          // Call F7 APIs here
        });
      });

      return {
        f7params,
        menu
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