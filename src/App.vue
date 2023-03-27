<template>
  <div id="app">
        <!-- Header -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
          <a class="navbar-brand mx-5" v-text="sitename" v-on:click="navigator('products')"></a>
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


          <section v-if="page === 'products'" class="py-5 text-center container-fluid jumbotron primary-background ">
            <div class="row py-lg-5">
              <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-bold headline-color ">School UMS</h1>
                <p class="lead paragraph-color">A platform that allows students and their parents to look for after school classes and activities</p>
                <div class="arrow bounce">
                  <a class="fa fa-arrow-down fa-2x" href="#products"></a>
                </div>
              </div>
            </div>
          </section>

        <!-- Main -->
        <main class="container-fluid bg-light py-5 ">
        
        
          <!-- 
          Products Page
         -->
         <div class="row px-5"  v-if="page === 'products' ">
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
                    <option value="subject"> Subject</option>
                        <option value="price">Price</option>
                        <option value="space">Availability</option>
                        <option value="location">Location</option>
                    </select>

                <div class="row">
                  <div class="col-md-12">
                    <div class="btn-group d-flex justify-content-around">
                    <a><input type="radio" value="asc" v-model="sort_asc_desc">Ascending</a>
                    <a><input type="radio" value="desc" v-model="sort_asc_desc">Descending</a>
                 </div>
                  </div>
                </div>
              </div>
              
              
          </div>
          <div id="products" class="d-flex flex-row flex-wrap justify-content-center" v-if="page === 'products'">
            <!-- Single Card -->
            
            <div :key="item.id" v-for="item in productList" class="my-3 p-3">
                <div class="card" style="width: 14rem">
                  <img
                    class="card-img-top img-fluid"
                    v-bind:src="item.image"
                    alt="Subject Image"
                  />
                  <div class="card-body">
                    <h5 class="card-title">{{item.subject}}</h5>
                    <div class="row">
                      <p>Location: {{item.location}}</p>
                    </div>
                    <div class="row">
                      <p>Price: ${{item.price}}</p>
                    </div>
                    <div class="row">
                      <p>
                        Spaces: {{item.space}}
                      </p>
                    </div>
                    <div class="row">
                      <p>Cart Quantity: {{item.cartquantity}}</p>
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
              <div
              class="d-flex"
              v-for="product in cart"
              :key="product.id"
              >
                <div class="card p-3">
                  <div class="about-product text-center mt-2">
                    <img :src="product.image" width="250" />
                    <div>
                      <h4 style="margin-top: 15px">{{product.subject}}</h4>
                      <h6 class="mt-0 text-black-50">{{product.location}}</h6>
                    </div>
                  </div>
                  <div class="mt-2">
                    <div class="d-flex justify-content-between p-price">
                      <span>Price</span><span>${{product.price * product.cartquantity}}</span>
                    </div>
                  
                    <div class="d-flex justify-content-between p-price">
                      <span>Quantity</span><span>{{product.cartquantity}}</span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-4">
                    <button
                      class="btn btn-secondary"
                      v-on:click="removeFromCart(product)"
                    >
                      Remove
                    </button>

                    <button
                      class="btn btn-primary"
                      v-if="checkProductQuantity(product)"
                      v-on:click="decreaseCartQuantity(product)"
                    >
                      
                      <span class="fas fa-arrow-down"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- End Cart -->

          <!-- 
            Checkout
           -->
          <div class="container">
            <div v-if="page === 'checkout'">
            <h1>Checkout Page</h1>

            <div class="row">
              <div class="d-flex flex-row justify-content-around mb-5">
                <div
                  class="d-flex justify-content-center mt-5 mx-2"
                  v-for="product in cart" :key="product.id"
                >
                  <div class="card p-3">
                    <div class="about-product text-center mt-2">
                      <img :src="product.image" width="250" />
                      <div>
                        <h4 style="margin-top: 15px">{{product.subject}}</h4>
                        <h6 class="mt-0 text-black-50">{{product.location}}</h6>
                      </div>
                    </div>
                    <div class="mt-2">
                      <div class="d-flex justify-content-between p-price">
                        <span>Price</span><span>${{product.price}}</span>
                      </div>
      
                      <div class="d-flex justify-content-between p-price">
                        <span>Quantity</span
                        ><span>{{product.cartquantity}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div class="col-6">
                <p>
                  <strong>First Name</strong>
                  <input
                    name="firstName"
                    class="form-control"
                    v-model="order.firstName"
                  />
                </p>

                <p>
                  <strong>Last Name</strong>
                  <input
                    name="lastName"
                    class="form-control"
                    v-model="order.lastName"
                  />
                </p>

                <p>
                  <strong>Address</strong>
                  <input
                    name="address"
                    class="form-control"
                    v-model="order.address"
                  />
                </p>

                <p>
                  <strong>Email:</strong>
                  <input
                    name="email"
                    type="email"
                    class="form-control"
                    v-model="order.email"
                  />
                </p>
              </div>
              <div class="col-6">
                <p>
                  <strong>City</strong>
                  <input
                    name="city"
                    class="form-control"
                    v-model="order.city"
                  />
                </p>

                <p>
                  <strong>State</strong>
                  <select
                    name="state"
                    class="form-select"
                    v-model="order.state"
                  >
                    <option disablde value="State"></option>
                    <option>AL</option>
                    <option>AR</option>
                    <option>CA</option>
                    <option>WA</option>
                  </select>
                </p>

                <p>
                  <strong>Zip/Postal Code:</strong>
                  <input
                    name="zip"
                    type="number"
                    class="form-control"
                    v-model="order.zip"
                  />
                </p>

                <p>
                  <strong>Phone Number:</strong>
                  <input
                    name="phone"
                    type="number"
                    class="form-control"
                    v-model="order.phone"
                  />
                </p>
              </div>
            </div>

            <hr />

            <div class="row">
              <h2>Order Information</h2>

              <div class="col-6">
                <p>First Name: {{ order.firstName }}</p>
                <p>Last Name: {{ order.lastName }}</p>
                <p>Address: {{ order.address }}</p>
              </div>
              <div class="col-6">
                <p>City Name: {{ order.city }}</p>
                <p>State Name: {{ order.state }}</p>
                <p>Zip/Postal Code: {{ order.zip }}</p>
              </div>
              <div class="col-6">
                <p>Email: {{ order.email }}</p>
              </div>

              <div class="col-6">
                <p>Phone Number: {{ order.phone }}</p>
              </div>
            </div>

            <div class="col-12">
              <button v-on:click="validateCheckoutInformation()" class="btn btn-primary">
                Checkout
              </button>
            </div>
          </div>
          </div>
          <!-- end Checkout -->
        </main>
        <!-- End Main -->
      </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import products from './products.js';
/* eslint-disable */
export default{
  watch: {
  },
  name: 'App',
  data(){
    return{
      sitename: "School UMS",
      page: "products",
      products: products, 
      showProducts: true,
      sortBy: "subject",
      sort_asc_desc: "asc",
      cart: [],
      checkout: [],
      test: false,
      search: "",
      order: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
        phone: "",
        state: [],
      },
    }
  },
  methods: {
    // Add product to cart
    addToCart(product) {
      // console.log(product.id);
      if (!this.cart.includes(product)) {
        this.cart.push(product);
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
    },
    showCart() {
      // Toggle
      this.showProducts = this.showProducts ? false : true;
    },

    // Decrease the quantity of the product by one (1)
    decreaseCartQuantity(product) {
      product.cartquantity -= 1;
      product.space += 1;
    },

    // Remove product from cart in the cart page
    removeFromCart(product) {
      this.cart.splice(product, 1);
      product.cartquantity = 0;
      product.space = product.stock;
    },

    // Show or Hide Quantity Decreaser button in the cart page
    checkProductQuantity(product) {
      if (product.cartquantity > 0) {
        return true;
      } else {
        this.cart.splice(product, 1);
        return false;
      }
    },

    // Change page
    navigator(page) {
      this.page = page;
    },

    cartQuantity(product) {
      return product.cartquantity;
    },

    validateCheckoutInformation() {
      let name_regex = /^[A-Za-z\s]+$/;
      let phone_regex = /^[0-9]+$/;

      var first_name_validation = name_regex.test(this.order.firstName);
      var last_name_validation = name_regex.test(this.order.lastName);
      var phone_number_validation = phone_regex.test(this.order.phone);

      // Check if fields arent empty
      if (
        this.order.firstName &&
        this.order.lastName &&
        this.order.address &&
        this.order.city &&
        this.order.email &&
        this.order.phone &&
        this.order.state
      ) {
        // Regex field validation
        if (first_name_validation !== false) {
          if (last_name_validation !== false) {
            if (phone_number_validation !== false) {
              // Initiate checkout
              this.checkout.push(this.order);
              this.order = {
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                email: "",
                phone: "",
                state: "",
              };
              alert("Checkout Succeeded!");
              this.cart = [];
              this.navigator("products");
            } else {
              alert("Please verify your phone number.");
            }
          } else {
            alert("Please verify your last name");
          }
        } else {
          alert("Please verify your first name.");
        }
      } else {
        alert("Fill in Information Before Checking Out");
        this.page = "checkout";
      }
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
    cartItemCount: function () {
      return {
        itemCount: this.cart.length || ""
      }
    },
    canAdd() {
      return this.products.quantity !== 0;
    },

    

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
          console.log("b: " + b.suject )
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

.primary-background {
  background-color: #0f0e17;
}

.headline-color {
  color: #fffffe;
}

.headline-color::selection{
  columns: #fffffe;
}
.headline-color:hover{
  columns: #fffffe;
}

.paragraph-color {
  color: #a7a9be;
}

.btn-primary {
  background-color: #ff8906;
  border-color: #ff8906;
  color: #fffffe;
}

.btn-primary:hover {
  background-color: #e27900;
  border-color: #e27900;
  color: #fffffe;
}

.btn-primary:active {
  background-color: #ff9d2c;
  border-color: #ff9d2c;
  color: #fffffe;
}

.btn-secondary {
  background-color: #f25f4c;
  border-color: #f25f4c;
  color: #fffffe;
}

a {
  font-weight: 600;
}


.sticky-top.scrolled {
  background-color: #0f0e17 !important;
  transition: background-color 200ms linear;
}

.scrolled a {
  color: #fffffe;
}

img {
  min-height: 234.34px !important;
  max-height: 234.34px !important;
}

.arrow {
  text-align: center;
  margin: 8% 0;
}
.bounce {
  -moz-animation: bounce 2s infinite;
  -webkit-animation: bounce 2s infinite;
  animation: bounce 2s infinite;
}


.arrow a {
  text-decoration: none;
  color: #ff8906;
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

</style>
