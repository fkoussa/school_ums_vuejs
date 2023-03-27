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
      :product-list="productList"
      :cart="cart"
      @remove-from-cart="removeFromCart"
      @add-to-cart="addToCart"
      @clear-cart="clearCart"
      @navigator="navigate"
      @decrease-cart-quantity="decreaseCartQuantity"
    >
    </LessonsComponent>
  </div>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import LessonsComponent from "./components/LessonsComponent.vue";

import products from "./products.js";
/* eslint-disable */
export default {
  components: {
    NavbarComponent,
    LessonsComponent,
  },
  name: "App",
  data() {
    return {
      sitename: "School UMS",
      page: "products",
      products: products,
      // showProducts: true,
      // sortBy: "subject",
      // sort_asc_desc: "asc",
      cart: [],
      // checkout: [],
      // test: false,
      // order: {
      //   firstName: "",
      //   lastName: "",
      //   address: "",
      //   city: "",
      //   email: "",
      //   phone: "",
      //   state: [],
      // },
    };
  },
  methods: {
    navigate(page) {
      this.page = page;
    },
    clearCart() {
      this.cart = [];
    },

    // Remove product from cart in the cart page
    removeFromCart(product) {
      this.cart.splice(product, 1);
      product.cartquantity = 0;
      product.space = product.stock;
    },

     // Decrease the quantity of the product by one (1)
     decreaseCartQuantity(product) {
      console.log("Entered App.vue decreaseCartQuantity");
      console.log("Product: " + product.id + " - " + product.subject + " - " + product.cartquantity);
      try{
        product.cartquantity -= 1;
      product.space += 1;
      } catch(err){
        console.log("Error in App.vue decreaseCartQuantity" + err);
      }
      console.log("Product: " + product.id + " - " + product.subject + " - " + product.cartquantity);

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
    productList() {
      if (this.search) {
        return this.products.filter((item) => {
          try {
            return (
              item.subject.toLowerCase().includes(this.search.toLowerCase()) ||
              item.location.toLowerCase().includes(this.search.toLowerCase())
            );
          } catch (err) {
            console.log(err);
          }
        });
      } else if (this.sortBy === "subject") {
        return this.products.sort((a, b) => {
          console.log("a: " + a.subject);
          console.log("b: " + b.suject);
          if (this.sort_asc_desc === "asc") {
            return a.subject.localeCompare(b.subject);
          } else if (this.sort_asc_desc === "desc") {
            return b.subject.localeCompare(a.subject);
          }
        });
      } else if (this.sortBy === "price") {
        return this.products.sort((a, b) => {
          if (this.sort_asc_desc === "asc") {
            return a.price - b.price;
          } else if (this.sort_asc_desc === "desc") {
            return b.price - a.price;
          }
        });
      } else if (this.sortBy === "space") {
        return this.products.sort((a, b) => {
          if (this.sort_asc_desc === "asc") {
            return a.space - b.space;
          } else if (this.sort_asc_desc === "desc") {
            return b.space - a.space;
          }
        });
      } else if (this.sortBy === "location") {
        return this.products.sort((a, b) => {
          if (this.sort_asc_desc === "asc") {
            return a.location - b.location;
          } else if (this.sort_asc_desc === "desc") {
            return b.location - a.location;
          }
        });
      } else {
        return this.products;
      }
    },
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
