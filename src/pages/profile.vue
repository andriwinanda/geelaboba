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
  
};
</script>
<style>
.center-wrapper {
  height: 80vh;
  display: flex;
}
</style>