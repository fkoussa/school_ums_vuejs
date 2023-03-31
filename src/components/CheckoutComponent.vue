<template>
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
        <button @click="validateCheckoutInformation()" class="btn btn-primary">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckoutComponent",
  props: {
    cart: { type: Array, required: true },
  },
  data() {
    return {
      page: "checkout",
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
  computed: {},
  methods: {
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
              console.log("Clearing Cart");
              this.$emit("clear-cart");
              this.$emit("navigator", "products");
              alert("Checkout Succeeded!");
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
        this.$emit("navigator", "checkout");
      }
    },
  },
};
</script>
