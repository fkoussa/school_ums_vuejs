<template>
  <div id="app">
    <!-- Header -->
    <NavbarComponent
      :page="page"
      :cart="cart"
      :sitename="sitename"
      v-on:navigate="navigate"
    ></NavbarComponent>

    <section
      v-if="page === 'products'"
      class="py-5 text-center container-fluid jumbotron primary-background"
    >
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-bold headline-color">School UMS</h1>
          <p class="lead paragraph-color">
            A platform that allows students and their parents to look for after
            school classes and activities
          </p>
          <div class="arrow bounce">
            <a class="fa fa-arrow-down fa-2x" href="#products"></a>
          </div>
        </div>
      </div>
    </section>

    <LessonsComponent
      :page="page"
      :products="products"
      :cart="cart"
      @remove-from-cart="removeFromCart"
      @add-to-cart="addToCart"
      @navigate="navigator"
      @clear-cart="clearCart"
      @decrease-cart-quantity="decreaseCartQuantity"
    >
  
    </LessonsComponent>

    
  </div>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import LessonsComponent from "./components/LessonsComponent.vue";



/* eslint-disable */
export default {
  components: {
    NavbarComponent,
    LessonsComponent,
  },
  name: "App",
  mounted() {
    fetch("https://dry-wave-76130.herokuapp.com/api/lessons")
      .then((res) => res.json())
      .then((data) => (this.products = data));
  },
  data() {
    return {
      sitename: "School UMS",
      page: "products",
      products: [],
      cart: [],
    };
  },
  methods: {
    navigate(page) {
      this.page = page;
    },
    // Remove product from cart in the cart page
    // Remove Lesson from cart in the cart page and add quantity accordingly
    removeFromCart(product) {
      const index = this.cart.indexOf(product);
      if (index > -1) {
        this.cart.splice(index, 1);
        product.cartquantity = 0;
        product.space = product.stock;
      }
    },

    // Decrease the quantity of the product by one (1)
    decreaseCartQuantity(product) {
      console.log("Entered App.vue decreaseCartQuantity");
      console.log(
        "Product: " +
          product.id +
          " - " +
          product.subject +
          " - " +
          product.cartquantity
      );
      try {
        product.cartquantity -= 1;
        product.space += 1;
      } catch (err) {
        console.log("Error in App.vue decreaseCartQuantity" + err);
      }
      console.log(
        "Product: " +
          product.id +
          " - " +
          product.subject +
          " - " +
          product.cartquantity
      );
    },

    addToCart(product) {
      this.cart.push(product);
    },

    // Change page
    navigator(page) {
      this.page = page;
    },

    cartQuantity(product) {
      return product.cartquantity;
    },

    // Clear Cart (For checkout page)
    clearCart() {
      this.cart = [];
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
  },
  computed: {
    // Search functionality
  
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
