<template>
  <div>
    <f7-page name="voucher">
      <f7-navbar title="Voucher Detail" back-link></f7-navbar>
        <f7-card>
          <f7-card-content>
           Hello {{f7route.query}}
          </f7-card-content>
        </f7-card>
    </f7-page>
  </div>
</template>
<script>
export default {
  props: {
      f7route: Object,
      f7router: Object,
    },
  data() {
    return {
      voucher: [],
    };
  },
  methods: {
    loadVoucherDetail(id) {
      this.$axios
        .get(`vdiscount/get/${id}`)
        .then((res) => {
          this.voucher = res.data.content.result;
        })
        .catch((err) => {});
    },
  },
  mounted() {
    this.loadVoucherDetail(this.f7route.params.id);
  },
};
</script>
