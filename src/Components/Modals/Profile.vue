<template>
  <div>
    <div class="col-md-12 val-form">
      <form class="needs-validation" id="validated-form">
        <div class="row">
          <div class="col-md-6 mb-3 p-form">
            <label for="firstName">First name</label>
            <div class="input-group">
              <span class="input-group-addon">
                <font-awesome-icon size="sm" class="pointer" icon="user" />
              </span>
              <input
                type="text"
                class="form-control"
                name="firstName"
                placeholder
                v-model="userData.contactInformation.name.first"
                required
              />
              <div>
                <span
                  class="text-danger"
                  v-if="validationErrors.firstName"
                  v-text="validationErrors.firstName"
                ></span>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3 p-form">
            <label for="lastName">Last name</label>
            <div class="input-group">
              <span class="input-group-addon">
                <font-awesome-icon size="sm" class="pointer" icon="user" />
              </span>
              <input
                type="text"
                class="form-control"
                name="lastName"
                placeholder
                v-model="userData.contactInformation.name.last"
                required
              />
            </div>
            <div>
              <span
                class="text-danger"
                v-if="validationErrors.lastName"
                v-text="validationErrors.lastName"
              ></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3 p-form">
            <label for="telephone">Telephone</label>
            <div class="input-group">
              <span class="input-group-addon">
                <font-awesome-icon size="sm" class="pointer" icon="phone" />
              </span>
              <input
                type="text"
                class="form-control"
                name="telephone"
                placeholder="Telephone"
                v-model="userData.contactInformation.phoneNumber"
                required
              />
            </div>
            <div>
              <span
                class="text-danger"
                v-if="validationErrors.telephone"
                style="width: 100%;"
                v-text="validationErrors.telephone"
              ></span>
            </div>
          </div>

          <div class="col-md-6 mb-3 p-form">
            <label for="email">Email</label>
            <div class="input-group">
              <span class="input-group-addon">
                <font-awesome-icon size="sm" class="pointer" icon="envelope" />
              </span>
              <input
                type="email"
                class="form-control"
                name="email"
                placeholder="Email"
                required
                readonly
                v-model="userData.contactInformation.email"
              />
            </div>
            <div>
              <span
                class="text-danger"
                v-if="validationErrors.email"
                style="width: 100%;"
                v-text="validationErrors.email"
              ></span>
            </div>
          </div>

          <!-- <div class="col-md-12 mb-3 p-form">
            <label for="address">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              placeholder="1234 Main St"
              required
            />
            <span
              class="text-danger"
              v-if="validationErrors.address"
              style="width: 100%;"
              v-text="validationErrors.address"
            ></span>
          </div>-->
        </div>
        <!-- <div class="row">
          <div class="col-md-5 mb-3 p-form">
            <label for="country">Country</label>
            <select class="custom-select d-block w-100 form-control" name="country" required>
              <option value>Choose...</option>
              <option>Nigeria</option>
            </select>
            <span
              class="text-danger"
              v-if="validationErrors.country"
              style="width: 100%;"
              v-text="validationErrors.country"
            ></span>
          </div>
          <div class="col-md-4 mb-3 p-form">
            <label for="state">State</label>
            <select class="custom-select d-block w-100 form-control" name="state" required>
              <option value>Choose...</option>
              <option>Lagos</option>
            </select>
            <span
              class="text-danger"
              v-if="validationErrors.state"
              style="width: 100%;"
              v-text="validationErrors.state"
            ></span>
          </div>
          <div class="col-md-3 mb-3 p-form">
            <label for="zip">Zip</label>
            <input
              type="text"
              class="form-control"
              name="zip"
              placeholder
              pattern="[0-9]{7}"
              title="Enter a valid Nigerian zip code"
              required
            />
            <span
              class="text-danger"
              v-if="validationErrors.zip"
              style="width: 100%;"
              v-text="validationErrors.zip"
            ></span>
          </div>
        </div>-->

        <button
          class="btn btn-primary btn-lg btn-block p-form"
          type="submit"
          @click.prevent="onClickSave()"
        >SAVE</button>
      </form>
    </div>
  </div>
</template>

<script>
import store from "./../../Vuex/store";
export default {
  data() {
    return {
      formData: {
        contactInformation: {
          name: {
            first: "",
            last: ""
          },
          email: "",
          phoneNumber: ""
        }
      },
      validationErrors: {
        firstName: null,
        lastName: null,
        username: null,
        telephone: null,
        email: null,
        address: null,
        country: null,
        state: null,
        zip: null
      }
    };
  },
  mounted() {
    this.$store.dispatch("requestUser");
  },
  computed: {
    userData: function() {
      return this.$store.getters.returnUser;
    }
  },
  methods: {
    onClickSave() {
      if (this.validateForm()) {
        this.$store
          .dispatch("updateUserProfile", this.userData)
          .then(success => {
            this.$modal.hide("userProfile");
          })
          .catch(err => {});
      }
    },
    validateForm(
      formId = "validated-form",
      errorObjectName = "validationErrors"
    ) {
      var nodes = document.querySelectorAll(`#${formId} :invalid`);
      var vm = this; //current vue instance;

      Object.keys(this[errorObjectName]).forEach(key => {
        this[errorObjectName][key] = null;
      });

      if (nodes.length > 0) {
        nodes.forEach(node => {
          if (node.title) {
            this[errorObjectName][node.name] = node.title;
          } else {
            this[errorObjectName][node.name] = node.validationMessage;
          }

          node.addEventListener("change", function(e) {
            vm.validateForm(formId, errorObjectName);
          });
        });

        return false;
      } else {
        return true;
      }
    }
  }
};
</script>