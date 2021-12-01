<template>
    <f7-toolbar tabbar labels bottom>
      <f7-link
        v-for="(item, i) in menu"
        :key="i"
        tab-link
        tab-link-active
        icon-size="24"
        :icon-f7="item.icon"
        :href="item.link"
        :text="item.title"
      ></f7-link>
      <f7-link>{{ f7route }}</f7-link>
    </f7-toolbar>
</template>
<script>
export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      menu: [
        {
          title: "Home",
          icon: "house",
          link: "/",
        },
        {
          title: "Menu",
          icon: "square_list",
          link: "/menu/",
        },
        {
          title: "Voucher",
          icon: "ticket",
          link: "/voucher/",
        },
        {
          title: "Profile",
          icon: "person_fill",
          link: "/profile/",
        },
      ],
    };
  },
  created() {
    console.log(this.f7route);
  },
};
</script>