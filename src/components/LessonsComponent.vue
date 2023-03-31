<template>
  <!-- Main -->
  <main class="container-fluid bg-light py-5">
    <!-- 
        Products Page
       -->
    <div class="row px-5" v-if="page === 'products'">
      <div class="col-md-6">
        <a>Search</a>
        <input
          name="search"
          class="form-control"
          placeholder="Search"
          v-model="search"
        />
      </div>
      <div class="col-md-6">
        <a>Sort By: </a>
        <select class="form-select" v-model="sortBy">
          <option value="subject">Subject</option>
          <option value="price">Price</option>
          <option value="space">Availability</option>
          <option value="location">Location</option>
        </select>

        <div class="row">
          <div class="col-md-12">
            <div class="btn-group d-flex justify-content-around">
              <a
                ><input
                  type="radio"
                  value="asc"
                  v-model="sort_asc_desc"
                />Ascending</a
              >
              <a
                ><input
                  type="radio"
                  value="desc"
                  v-model="sort_asc_desc"
                />Descending</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="products"
      class="d-flex flex-row flex-wrap justify-content-center"
      v-if="page === 'products'"
    >
      <!-- Single Card -->

      <div :key="item.id" v-for="item in productList" class="my-3 p-3">
        <div class="card" style="width: 14rem">
          <img
            class="card-img-top img-fluid"
            v-bind:src="item.image"
            alt="Subject Image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.subject }}</h5>
            <div class="row">
              <p>Location: {{ item.location }}</p>
            </div>
            <div class="row">
              <p>Price: ${{ item.price }}</p>
            </div>
            <div class="row">
              <p>Spaces: {{ item.space }}</p>
            </div>
            <div class="row">
              <p>Cart Quantity: {{ item.cartquantity }}</p>
            </div>
            <div class="col-12 d-flex justify-content-center">
              <div class="row">
                <button
                  class="btn btn-primary"
                  v-bind:disabled="!canAdd"
                  v-on:click="addToCart(item)"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Page -->
    <div v-if="page === 'cart'">
      <h1 style="text-align: center; margin-top: 15px">Your Cart</h1>
      <div class="row d-flex text-center">
        <div class="col-sm-12 mt-5">
          <h3 v-if="cart.length === 0">No items in your cart!</h3>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-around">
        <div class="d-flex" v-for="product in cart" :key="product.id">
          <div class="card p-3">
            <div class="about-product text-center mt-2">
              <img :src="product.image" width="250" />
              <div>
                <h4 style="margin-top: 15px">{{ product.subject }}</h4>
                <h6 class="mt-0 text-black-50">{{ product.location }}</h6>
              </div>
            </div>
            <div class="mt-2">
              <div class="d-flex justify-content-between p-price">
                <span>Price</span
                ><span>${{ product.price * product.cartquantity }}</span>
              </div>

              <div class="d-flex justify-content-between p-price">
                <span>Quantity</span><span>{{ product.cartquantity }}</span>
              </div>
            </div>
            <div class="d-flex justify-content-between mt-4">
              <button
                class="btn btn-secondary"
                @click="removeFromCart(product)"
              >
                Remove
              </button>

              <button
                class="btn btn-primary"
                v-if="checkProductQuantity(product)"
                @click="decreaseQuantity(product)"
              >
                <span class="fas fa-arrow-down"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- End Cart -->

        <!-- Start Checkout -->
        <CheckoutComponent v-if="page === 'checkout'"
        :cart="cart"
        @clear-cart="clearCart"
        @navigator="navigator"
      
      />
      <!-- End Checkout -->
  </main>
  <!-- End Main -->
</template>

<script>
import CheckoutComponent from "./CheckoutComponent.vue";

export default {
  
  name: "LessonsComponent",
  components:{
    CheckoutComponent
  },
  props: {
    page:     { type: String, required: true },
    products: { type: Array,  required: true },
    cart:     { type: Array,  required: true },
  },
  data() {
    return {
      sortBy: "subject",
      sort_asc_desc: "asc",
      showProducts: true,
      search: "",
      order: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {

    // Navigate Page (used in Checkout component)
    navigator(page){
      this.$emit("navigate", page);
    },

    // clear cart
    clearCart() {
      this.$emit("clear-cart");
    },


    // Decrease quantity of product
    decreaseQuantity(product){
        console.log("Decreasing Quantity...");
        console.log(product);
        this.$emit("decrease-cart-quantity", product);
    },
    // Remove product from cart
    removeFromCart(product) {
        console.log("Removing from cart...");
        console.log("Cart", this.cart);
        console.log("Product: ", product);
        this.$emit("remove-from-cart", product);
    },
    // Show or Hide Quantity Decreaser button in the cart page
    checkProductQuantity(product) {
      if (product.cartquantity > 0) {
        return true;
      } else {
        // this.cart.splice(product, 1);
        this.$emit("remove-from-cart", product);
        return false;
      }
    },
    showCart() {
      // Toggle
      this.showProducts = this.showProducts ? false : true;
    },

    // Add product to cart
    addToCart(product) {
      // console.log(product.id);
      if (!this.cart.includes(product)) {
        this.$emit("add-to-cart", product);
        // this.cart.push(product);
        product.cartquantity += 1;
        product.space--;
        console.log("cart doesnt contain product");
      } else if (product.cartquantity == product.stock) {
        // Check if product spaces == cartquantity
        console.log("No more spaces left!");
      } else {
        console.log("cart contains product");
        product.cartquantity += 1;
        product.space--;
      }
    }
  },
  computed: {
    // Check quantity
    canAdd() {
      return this.products.quantity !== 0;
    },

    // List products with search and sorting
    productList() {
      let products = this.products;
      if (this.search) {
        console.log(this.search);
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
        return products.sort((a, b) => {
          console.log("a: " + a.subject);
          console.log("b: " + b.suject )
          if (this.sort_asc_desc === "asc") {
            return a.subject.localeCompare(b.subject);
          } else if (this.sort_asc_desc === "desc") {
            return b.subject.localeCompare(a.subject);
          }
        });
      } else if (this.sortBy === "price") {
        return products.sort((a, b) => {
          if (this.sort_asc_desc === "asc") {
            return a.price - b.price;
          } else if (this.sort_asc_desc === "desc") {
            return b.price - a.price;
          }
        });
      } else if (this.sortBy === "space") {
        return products.sort((a, b) => {
          if (this.sort_asc_desc === "asc") {
            return a.space - b.space;
          } else if (this.sort_asc_desc === "desc") {
            return b.space - a.space;
          }
        });
      } else if (this.sortBy === "location") {
        return products.sort((a, b) => {
          if (this.sort_asc_desc === "asc") {
            return a.location - b.location;
          } else if (this.sort_asc_desc === "desc") {
            return b.location - a.location;
          }
        });
      } else {
        return products;
      }
    }
},
};
</script>
