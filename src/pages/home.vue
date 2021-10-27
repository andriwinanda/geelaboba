<template>
  <f7-page
    name="home"
    :page-content="true"
    infinite
    :infinite-distance="50"
    :infinite-preloader="showPreloader"
    @infinite="loadMoreProduct"
  >
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-searchbar
        search-container=".search-list"
        search-in=".item-title"
        :disable-button="false"
      ></f7-searchbar>
      <f7-nav-right>
        <f7-link class="text-color-gray" icon-f7="bell_fill"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Page content-->
    <f7-swiper pagination>
      <f7-swiper-slide v-for="slide in slider" :key="slide.id">
        <img class="slider-image" :src="slide.image" alt="" />
      </f7-swiper-slide>
    </f7-swiper>
    <f7-block-title class="no-margin-bottom margin-top"
      >Voucher
      <f7-link class="float-right text-color-gray">
        <small>lihat semua</small>
      </f7-link>
    </f7-block-title>
    <f7-swiper
      class="voucher-slide"
      data-pagination='{"el": ".swiper-pagination"}'
      slidesPerView="auto"
      data-centered-slides
      :spaceBetween="0"
    >
      <f7-swiper-slide>
        <f7-card @click="f7router.navigate('/voucher/')">
          <f7-card-content>
            <f7-row class="align-items-center">
              <f7-col width="70">
                <strong class="text-color-primary">Diskon 15%</strong>
                <br />
                <small class="text-color-gray">
                  Min. Order Rp 25.000, <br />
                  Maks. Diskon Rp 20.000
                </small>
              </f7-col>
              <f7-col width="30" class="text-align-center">
                <f7-icon
                  class="text-color-gray"
                  size="35"
                  f7="ticket"
                ></f7-icon>
              </f7-col>
            </f7-row>
          </f7-card-content>
        </f7-card>
      </f7-swiper-slide>
      <f7-swiper-slide>
        <f7-card>
          <f7-card-content>
            <f7-row class="align-items-center">
              <f7-col width="70">
                <strong class="text-color-primary">Diskon 15%</strong>
                <br />
                <small class="text-color-gray">
                  Min. Order Rp 25.000, <br />
                  Maks. Diskon Rp 20.000
                </small>
              </f7-col>
              <f7-col width="30" class="text-align-center">
                <f7-icon
                  class="text-color-gray"
                  size="35"
                  f7="ticket"
                ></f7-icon>
              </f7-col>
            </f7-row>
          </f7-card-content>
        </f7-card>
      </f7-swiper-slide>
      <f7-swiper-slide>
        <f7-card>
          <f7-card-content>
            <f7-row class="align-items-center">
              <f7-col width="70">
                <strong class="text-color-primary">Diskon 15%</strong>
                <br />
                <small class="text-color-gray">
                  Min. Order Rp 25.000, <br />
                  Maks. Diskon Rp 20.000
                </small>
              </f7-col>
              <f7-col width="30" class="text-align-center">
                <f7-icon
                  class="text-color-gray"
                  size="35"
                  f7="ticket"
                ></f7-icon>
              </f7-col>
            </f7-row>
          </f7-card-content>
        </f7-card>
      </f7-swiper-slide>
    </f7-swiper>
    <f7-block-title>Promo Hari Ini</f7-block-title>
    <!-- <vue-countdown
      :time="2 * 24 * 60 * 60 * 1000"
      v-slot="{ days, hours, minutes, seconds }"
    >
      Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes,
      {{ seconds }} seconds.
    </vue-countdown> -->

    <f7-block>
      <f7-row class="align-items-stretch">
        <f7-col width="50" v-for="item in productList" :key="item.id">
          <product
            :title="item.name"
            :image="item.image"
            :itemPrice="item.price"
            :itemDiscount="item.discount || 0"
          />
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
const limit = 10;
import product from "../components/product.vue";
export default {
  components: { product },
  props: {
    f7router: Object,
  },
  data() {
    return {
      showPreloader: true,
      slider: [],
      productList: [],
      productOffset: 0,
      productRecord: 0,
    };
  },
  methods: {
    loadSlider() {
      this.$axios
        .get(`slider`)
        .then((res) => {
          this.slider = res.data.content.result;
        })
        .catch((err) => {});
    },
    loadProduct() {
      let data = {
        limit: limit,
        offset: this.productOffset,
      };
      this.showPreloader = true;
      this.$axios
        .post(`product`, data)
        .then((res) => {
          this.showPreloader = false;
          let productItem = res.data.content;
          if (productItem.result) {
            productItem.result.map((el) => {
              this.productList.push(el);
            });
          } else this.productList = [];
          this.productRecord = productItem.record;
        })
        .catch((err) => {
          this.showPreloader = false;
        });
    },
    loadMoreProduct() {
      if (!this.showPreloader && this.productList.length < this.productRecord) {
        this.productOffset += limit;
        this.loadProduct();
      }
    },
  },
  created() {
    this.loadSlider();
    this.loadProduct();
  },
};
</script>