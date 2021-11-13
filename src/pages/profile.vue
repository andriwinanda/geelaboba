<template>
  <div>
    <f7-page name="profile">
      <f7-navbar title="Profile" back-link></f7-navbar>
      <f7-block class="align-items-center center-wrapper">
        <div style="margin: 0 auto">
          <p class="text-align-center text-color-gray">
            Silahkan login terlebih dulu!
          </p>
          <br />
          <f7-button fill href="/login/">Login</f7-button>
        </div>
      </f7-block>
    </f7-page>
  </div>
</template>
<script>
export default {
  data(){
    return{
      dataUser: {}
    }
  },
  methods: {
    loadUser() {
      this.$axios
        .post(`customer/get`)
        .then((res) => {
          this.dataUser = res.data.content.result;
        })
        .catch((err) => {});
    },
  },
  mounted(){
    this.loadUser()
  }
};
</script>
<style>
.center-wrapper {
  height: 80vh;
  display: flex;
}
</style>