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
              v-for="product in cart"
              :key="product.id"
            >
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
                    <span>Price</span><span>${{ product.price }}</span>
                  </div>

                  <div class="d-flex justify-content-between p-price">
                    <span>Quantity</span><span>{{ product.cartquantity }}</span>
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
              <input name="city" class="form-control" v-model="order.city" />
            </p>

            <p>
              <strong>State</strong>
              <select name="state" class="form-select" v-model="order.state">
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
          <button
            v-on:click="validateCheckoutInformation()"
            class="btn btn-primary"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
    <!-- end Checkout -->
  </main>
  <!-- End Main -->
</template>

<script>
export default {
  name: "LessonsComponent",
  props: {
    page: { type: String, required: true },
    products: { type: Array, required: true },
    // showProducts: {type: Boolean, required: true},
    cart: { type: Array, required: true},
    productList: {
      type: Array,
      required: true
    }
    // productList: { type: Array, required: true },
  },
  data() {
    return {
      search: "",
      sortBy: "subject",
      sort_asc_desc: "asc",
      showProducts: true,
      checkout: [],
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
    removeFromCart(product) {
    this.$emit('remove-from-cart', product);
  },
    // Show or Hide Quantity Decreaser button in the cart page
    checkProductQuantity(product) {
      if (product.cartquantity > 0) {
        return true;
      } else {
        // this.cart.splice(product, 1);
        this.$emit('remove-from-cart', product);
        return false;
      }
    },

     // Decrease the quantity of the product by one (1)
     decreaseCartQuantity(product) {
      product.cartquantity -= 1;
      product.space += 1;
    },


    showCart() {
      // Toggle
      this.showProducts = this.showProducts ? false : true;
    },

    // Add product to cart
    addToCart(product) {
      // console.log(product.id);
      if (!this.cart.includes(product)) {
        this.$emit('add-to-cart', product);
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
            //   this.cart = [];
              this.$emit('clear-cart');
              this.$emit('navigator', 'products');
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
        this.$emit('navigator', 'checkout');
      }
    },
  },
  computed:{
    canAdd() {
      return this.products.quantity !== 0;
    },
    // Search functionality
    
  }
};
</script>
