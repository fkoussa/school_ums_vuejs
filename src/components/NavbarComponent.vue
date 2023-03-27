<template>
  <!-- Header -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
          <a class="navbar-brand mx-5" v-bind:page="page" v-text="sitename" v-on:click="navigator('products')"></a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end px-5" id="navbarNavAltMarkup">
            <div class="navbar-nav d-flex">
              <!-- products Page Cart Button -->
              <button
                class="btn btn-primary"
                v-if="(page === 'products' || page === 'checkout') && cart.length > 0"
                v-on:click="navigator('cart')">
                <a v-text="cartItemCount"></a>
                <span class="fas fa-cart-plus"></span>
                Show Cart
              </button>

              <!-- Cart Page products Button -->
              <button
                class="btn btn-primary mx-3"
                v-if="page === 'cart' || page === 'checkout' "
                v-on:click="navigator('products')"
              >
              <i class="fas fa-arrow-left"></i>

                Products
              </button>

              <!--
                TODO #1
               -->
              <button
                class="btn btn-danger"
                v-if="page === 'cart' && !isCartEmpty()"
                v-on:click="navigator('checkout')"
              >
                Checkout
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </nav>
        <!-- End Header -->
</template>

<script>
export default {
  name: 'NavbarComponent',
  props:{
    cart: Array,
    page: {type: String, required: true},
    sitename: String
  },
  computed: {
    cartItemCount: function () {
      return {
        itemCount: this.cart.length || ""
      }
    },
  },

  methods: {
    navigator(page) {
      this.$emit('navigate', page)
    },
    isCartEmpty: function () {
      if (this.cart.length > 0) {
        console.log("Cart length is greater than 0");
        return false;
      } else {
        console.log("Cart length is less than 0");
        return true;
      }
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
