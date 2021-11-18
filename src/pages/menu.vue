<template>
  <div>
    <f7-page
      name="Menu"
      infinite
      :infinite-distance="50"
      :infinite-preloader="showPreloader"
      @infinite="loadMoreProduct"
    >
      <f7-navbar title="Menu" :back-link="true">
        <f7-nav-right>
          <f7-link
            class="searchbar-enable"
            data-searchbar=".searchbar-demo"
            icon-ios="f7:search"
            icon-aurora="f7:search"
            icon-md="material:search"
          ></f7-link>
        </f7-nav-right>
        <f7-searchbar
          class="searchbar-demo"
          expandable
          @input="
            search = $event.target.value;
            searchProduct();
          "
          @keypress.enter.prevent="searchProduct()"
          search-container=".search-list"
          search-in=".item-title"
        ></f7-searchbar>
      </f7-navbar>
      <!-- <f7-card>
        <f7-card-content>
          <p><strong>Lippo Mall Puri</strong></p>
          <f7-row>
            <f7-col width="80">
              <small
                >Lantai Lower Ground Floor , Jl. Puri Indah Boulevard Blok U No.
                1, Puri Indah, Jakarta Barat
              </small>
            </f7-col>
            <f7-col width="20" class="text-align-right"
              ><f7-link>Ganti</f7-link></f7-col
            >
          </f7-row>
        </f7-card-content>
      </f7-card> -->

      <f7-block>
        <f7-row>
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

      <!-- PRODUCT DETAL -->
      <product-sheet :isOpened="isProductOpened" :product="productDetail">
      </product-sheet>
    </f7-page>
  </div>
</template>
<script>
const limit = 10;
import product from "../components/product.vue";
import productSheet from "../components/productSheet.vue";
import { f7 } from "framework7-vue";
import debounce from "debounce";
export default {
  props: {
    f7router: Object,
  },
  components: { product, productSheet },
  data() {
    return {
      showPreloader: true,
      productList: [],
      productOffset: 0,
      productRecord: 0,
      isProductOpened: false,
      productDetail: {},
      search: ''
    };
  },
  methods: {
    loadProduct() {
      let data = {
        limit: limit,
        offset: this.productOffset,
      };
      this.showPreloader = true;

      let ajax;
      if (this.search) {
        data.filter = this.search;
        ajax = this.$axios.post("/product/search", data);
      } else {
        ajax = this.$axios.post("/product", data);
      }
      ajax
        .then((res) => {
          let data = res.data.content;
          if (data.result) {
            data.result.map((el) => {
              this.productList.push(el);
            });
          } else this.productList = [];
          this.productRecord = data.record;
          this.showPreloader = false;
        })
        .catch((err) => {
          this.showPreloader = false;
        });

      // this.$axios
      //   .post(`product`, data)
      //   .then((res) => {
      //     this.showPreloader = false;
      //     let productItem = res.data.content;
      //     if (productItem.result) {
      //       productItem.result.map((el) => {
      //         this.productList.push(el);
      //       });
      //     } else this.productList = [];
      //     this.productRecord = productItem.record;
      //   })
      //   .catch((err) => {
      //     this.showPreloader = false;
      //   });
    },
    searchProduct: debounce(function (event) {
      this.productList = [];
      this.productOffset = 0;
      this.productRecord = 0;
      this.loadProduct();
    }, 500),
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
    closeProduct() {
      this.productDetail = {};
      this.isProductOpened = false;
    },
  },
  created() {
    this.loadProduct();
  },
};
</script>
