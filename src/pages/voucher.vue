<template>
  <f7-page name="catalog">
    <f7-navbar title="Voucher"></f7-navbar>
    <div v-for="product in products" :key="product.id">
      <f7-card>
        <f7-card-content>
          <f7-row class="align-items-center">
            <f7-col width="20">
              <f7-icon class="text-color-gray" size="35" f7="ticket"></f7-icon>
            </f7-col>
            <f7-col width="60">
              <strong class="text-color-primary">Diskon 15%</strong>
              <br />
              <small class="text-color-gray">
                Min. Order Rp 25.000, <br />
                Maks. Diskon Rp 20.000
              </small>
            </f7-col>
            <f7-col width="20" class="text-align-center">
              <f7-link>Klaim</f7-link>
            </f7-col>
          </f7-row>
        </f7-card-content>
      </f7-card>
    </div>
    <f7-block v-if="products.length === 3">
      <f7-button fill @click="addProduct">Add Product</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
import { useStore } from "framework7-vue";
import store from "../js/store";

export default {
  setup() {
    const products = useStore("products");

    const addProduct = () => {
      store.dispatch("addProduct", {
        id: "4",
        title: "Apple iPhone 12",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
      });
    };

    return {
      products,
      addProduct,
    };
  },
};
</script>
