<template>
  <div>
    <f7-page name="voucher">
      <f7-navbar title="Notification" back-link></f7-navbar>
      
        <f7-card>
          <f7-card-content>
            <f7-row class="align-items-center">
              <f7-col width="20">
                <f7-icon
                  class="text-color-gray"
                  size="35"
                  f7="ticket"
                ></f7-icon>
              </f7-col>
              <f7-col width="80">
                <strong class="text-color-primary">Dapatkan Promo Terbaik</strong>
                <br />
                <small class="text-color-gray">
                  Min. Order Rp
                </small>
              </f7-col>
            </f7-row>
          </f7-card-content>
        </f7-card>
    </f7-page>
  </div>
</template>
<script>
export default {
  data() {
    return {
      voucher: [],
    };
  },
  methods: {
    loadVoucher() {
      this.$axios
        .post(`vdiscount`, {
          limit: "10",
          publish: "1",
        })
        .then((res) => {
          this.voucher = res.data.content.result;
        })
        .catch((err) => {});
    },
  },
  mounted() {
    this.loadVoucher();
  },
};
</script>
