<template>
  <f7-card class="no-margin margin-bottom product-thumb">
    <f7-card-content>
     <img :src="image" alt="" />
      <p>{{ title }}</p>
      <b>Rp {{fomatNumeric(priceAfterDiscount)}} </b> <br>
      <del>Rp {{fomatNumeric(itemPrice)}}</del> • <span class="text-color-red" v-if="itemDiscount">{{itemDiscount*100}}% OFF</span>
    </f7-card-content>
  </f7-card>
</template>
<script>
import {numeric} from '../js/function-helper'
export default {
  props: ["title", "image", "itemPrice", "itemDiscount", "priceAfterDiscount"],
  methods:{
    fomatNumeric(val){
     return numeric(val)
    }
  }
};
</script>
<style>

.product-thumb img{
  display: block;
  width: 100%;
}
</style>