<template>
  <div>
    <f7-page name="voucher">
      <f7-navbar title="Voucher Detail" back-link></f7-navbar>

            <f7-toolbar position="bottom">
              <f7-block style="width: 100%" padding>
                <f7-button
                  fill
                  :loading="showPreloader"
                  >Di klik oleh kasir</f7-button
                >
              </f7-block>
            </f7-toolbar>
        <f7-card  class="bg-color-primary">
          <f7-card-content text-color="white" >
            <h2 class="no-margin">
            Diskon 80%
            </h2>
            <small> Minimal Order Rp 15.000</small> <br/>
            <small>Berlaku sampai dengan 21 November pukul 23:00</small>
          </f7-card-content>
        </f7-card>
        <f7-block>
            <p class="text-color-gray">
            <small>
              Cara menggunakan kupon : <br/>
              - Kupon berlaku untuk Beli 1 Gratis 1 minuman ukuran Grande.<br/>
              - Harga paling rendah akan dijadikan free.<br/>
              - Tunjukkan kupon ini ke kasir.<br/>
              - Berlaku 1x di 21 September 2021<br/>
              - Tidak berlaku untuk minuman harga spesial.<br/>
              - Tidak dapat digabungkan dengan promo lainnya.<br/>
              - Minuman harus diambil saat transaksi.<br/>

            </small>
            </p>
        </f7-block>
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
      showPreloader: false
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
