<template>
  <div>
    <f7-page
      name="home"
      :page-content="true"
      infinite
      :infinite-distance="50"
      :infinite-preloader="showPreloader"
      @infinite="loadMoreProduct"
    >
      <!-- Top Navbar -->
      <f7-navbar title="geela boba">
        <f7-nav-right>
          <f7-link class="text-color-gray" href="/notification/" icon-f7="bell_fill"></f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-toolbar tabbar labels bottom>
        <f7-link
          tab-link
          tab-link-active
          icon-size="24"
          icon-f7="house"
          text="Home"
        ></f7-link>
        <f7-link
          tab-link
          href="/menu/"
          icon-size="24"
          icon-f7="square_list"
          text="Menu"
        ></f7-link>
        <f7-link
          tab-link
          href="/voucher/"
          icon-size="24"
          icon-f7="ticket"
          text="Voucher"
        ></f7-link>
        <f7-link
          tab-link
          href="/profile/"
          icon-size="24"
          icon-f7="person_fill"
          text="Profile"
        ></f7-link>
      </f7-toolbar>
      <!-- Page content-->
      <f7-swiper pagination :speed="500">
        <f7-swiper-slide v-for="slide in slider" :key="slide.id">
          <img class="slider-image" :src="slide.image" alt="" />
        </f7-swiper-slide>
      </f7-swiper>
      <template v-if="voucher">
        <f7-block-title class="no-margin-bottom margin-top"
          >Voucher
          <f7-link class="float-right text-color-gray" href="/voucher/">
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
          <f7-swiper-slide v-for="item in voucher" :key="item.id">
            <f7-card @click="f7router.navigate('/voucher/', { history: true })">
              <f7-card-content>
                <f7-row class="align-items-center">
                  <f7-col width="70">
                    <strong class="text-color-primary"
                      >Diskon {{ item.percentage }}%</strong
                    >
                    <br />
                    <small class="text-color-gray">
                      Min. Order Rp {{ item.minimum }}
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
      </template>

      <f7-block-title class="align-items-center display-flex">
        <p class="padding-right">Promo Hari Ini</p>

        <Timer
          v-if="timer"
          :seconds="timer.seconds"
          :minutes="timer.minutes"
          :hours="timer.hours"
          :days="timer.days"
        />
      </f7-block-title>

      <f7-block>
        <f7-row class="align-items-stretch">
          <f7-col width="50" v-for="item in productList" :key="item.id">
            <product
              @click="loadProductDetail(item.id)"
              :title="item.name"
              :image="item.image"
              :itemPrice="item.price"
              :itemDiscount="item.discount || 0"
            />
          </f7-col>
        </f7-row>
      </f7-block>

      <!-- PRODUCT DETAIL -->
      <product-sheet :isOpened="isProductOpened" :product="productDetail">
      </product-sheet>
    </f7-page>
  </div>
</template>
<script>
const limit = 10;
import product from "../components/product.vue";
import productSheet from "../components/productSheet.vue";
import Timer from "../components/timer.vue";
import Digit from "../components/digit.vue";
import { f7 } from "framework7-vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import { useTimer } from "vue-timer-hook";
export default {
  components: { product, productSheet, Timer, Digit },
  props: {
    f7router: Object,
  },
  data() {
    return {
      showPreloader: true,
      slider: [],
      voucher: [],
      productList: [],
      productOffset: 0,
      productRecord: 0,
      isProductOpened: false,
      productDetail: {},
      timer: null,
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
    loadProduct() {
      let data = {
        limit: limit,
        offset: this.productOffset,
        publish: 1,
        recommend: 1,
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
    loadProductDetail(id) {
      f7.preloader.show();
      this.$axios
        .get(`product/get/${id}`)
        .then((res) => {
          f7.preloader.hide();

          this.productDetail = res.data.content;
          this.isProductOpened = true;
        })
        .catch((err) => {
          f7.preloader.hide();
        });
    },
  },
  mounted() {
    this.loadSlider();
    this.loadProduct();
    this.loadVoucher();
    var time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
    this.timer = useTimer(time);
  },
};
</script>