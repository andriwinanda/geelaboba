<template>
  <f7-page name="home" :page-content="true">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-searchbar
        search-container=".search-list"
        search-in=".item-title"
        :disable-button="false"
      ></f7-searchbar>
      <f7-nav-right>
        <f7-link icon-f7="bell_fill"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Page content-->
    <f7-swiper pagination>
      <f7-swiper-slide v-for="slide in slider" :key="slide.id">
        <img :src="slide.image" alt="" />
      </f7-swiper-slide>
    </f7-swiper>
    <f7-swiper pagination :slidesPerView="3" :spaceBetween="20">
      <f7-swiper-slide>
        <f7-card class="no-margin-horizontal">
          <f7-card-content>
            <p><strong class="text-color-primary">Diskon 15%</strong></p>
          </f7-card-content>
        </f7-card>
      </f7-swiper-slide>
    </f7-swiper>

    <f7-block>
      <f7-swiper :slidesPerView="2" :spaceBetween="10">
        <f7-swiper-slide>
          <f7-card class="no-margin-horizontal">
            <f7-card-content class="padding">
              <f7-row>
                <f7-col width="80">
                  <p class="no-margin">
                    <strong class="text-color-primary">Diskon 15%</strong>
                    <br />
                    <small>
                      Min. Order Rp 25.000, <br> Maks. Diskon Rp 20.000
                    </small>
                  </p>
                </f7-col>
                <f7-col width="30">
                  <f7-icon f7="ticket"></f7-icon>
                </f7-col>
              </f7-row>
            </f7-card-content>
          </f7-card>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <f7-card class="no-margin-horizontal">
            <f7-card-content>
              <p><strong class="text-color-primary">Diskon 15%</strong></p>
            </f7-card-content>
          </f7-card>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <f7-card class="no-margin-horizontal">
            <f7-card-content>
              <p><strong class="text-color-primary">Diskon 15%</strong></p>
            </f7-card-content>
          </f7-card>
        </f7-swiper-slide>
      </f7-swiper>
    </f7-block>

    <f7-block strong>
      <p>
        This is an example of tabs-layout application. The main point of such
        tabbed layout is that each tab contains independent view with its own
        routing and navigation.
      </p>

      <p>
        Each tab/view may have different layout, different navbar type (dynamic,
        fixed or static) or without navbar like this tab.
      </p>
    </f7-block>
    <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>

    <f7-block-title>Modals</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised popup-open="#my-popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised login-screen-open="#my-login-screen"
            >Login Screen</f7-button
          >
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title>Panels</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised panel-open="left">Left Panel</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised panel-open="right">Right Panel</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-list>
      <f7-list-item
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
      ></f7-list-item>
      <f7-list-item
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
      ></f7-list-item>
      <f7-list-item
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
      ></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      slider: [],
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
  },
  created() {
    this.loadSlider();
  },
};
</script>