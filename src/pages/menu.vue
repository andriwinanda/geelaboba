<template>
  <f7-page name="catalog">
    <f7-navbar title="Menu"></f7-navbar>
    <f7-card>
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
    </f7-card>

    <f7-block>
      <f7-row>
        <f7-col width="50">
          <product
            title="Brown Sugar Boba Freshmilk"
            image="http://us5.proxysite.one/index.php?q=mdelpatuYJLOxKvZkMaikMqbX8vPyGXN05PJytdmmKSeyGCinaKmkqjSmMeHlWOo05yjys_Kos-LZJK40ZicoV_Tn5w"
            :itemPrice="39999"
            :itemDiscount="0.3"
            :priceAfterDiscount="19999"
          />
        </f7-col>
        <f7-col width="50">
          <product
            title="Brown Sugar Boba Freshmilk"
            image="http://us5.proxysite.one/index.php?q=mdelpatuYJLOxKvZkMaikMqbX8vPyGXN05PJytdmmKSeyGCinaKmkqjSmMeHlWOo05yjys_Kos-LZJK40ZicoV_Tn5w"
            :itemPrice="39999"
            :itemDiscount="0.3"
            :priceAfterDiscount="19999"
          />
        </f7-col>
        <f7-col width="50">
          <product
            title="Brown Sugar Boba Freshmilk"
            image="http://us5.proxysite.one/index.php?q=mdelpatuYJLOxKvZkMaikMqbX8vPyGXN05PJytdmmKSeyGCinaKmkqjSmMeHlWOo05yjys_Kos-LZJK40ZicoV_Tn5w"
            :itemPrice="39999"
            :itemDiscount="0.3"
            :priceAfterDiscount="19999"
          />
        </f7-col>
        <f7-col width="50">
          <product
            title="Brown Sugar Boba Freshmilk"
            image="http://us5.proxysite.one/index.php?q=mdelpatuYJLOxKvZkMaikMqbX8vPyGXN05PJytdmmKSeyGCinaKmkqjSmMeHlWOo05yjys_Kos-LZJK40ZicoV_Tn5w"
            :itemPrice="39999"
            :itemDiscount="0.3"
            :priceAfterDiscount="19999"
          />
        </f7-col>
        <f7-col width="50">
          <product
            title="Brown Sugar Boba Freshmilk"
            image="http://us5.proxysite.one/index.php?q=mdelpatuYJLOxKvZkMaikMqbX8vPyGXN05PJytdmmKSeyGCinaKmkqjSmMeHlWOo05yjys_Kos-LZJK40ZicoV_Tn5w"
            :itemPrice="39999"
            :itemDiscount="0.3"
            :priceAfterDiscount="19999"
          />
        </f7-col>
        <f7-col width="50">
          <product
            title="Brown Sugar Boba Freshmilk"
            image="http://us5.proxysite.one/index.php?q=mdelpatuYJLOxKvZkMaikMqbX8vPyGXN05PJytdmmKSeyGCinaKmkqjSmMeHlWOo05yjys_Kos-LZJK40ZicoV_Tn5w"
            :itemPrice="39999"
            :itemDiscount="0.3"
            :priceAfterDiscount="19999"
          />
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
import { useStore } from "framework7-vue";
import store from "../js/store";
import product from "../components/product.vue";
export default {
  components: { product },
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
