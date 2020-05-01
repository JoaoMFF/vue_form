<template>
  <div id="app">
    <!-- top div  -->
    <div class="q-pa-md">
      <div class="row justify-around">
        <div class="col-2">
          <q-toggle v-model="isDarkTheme" label="Dark Theme"></q-toggle>
        </div>
        <div class="col-4 col-md-auto">
          <q-input
            dense square outlined class="search" v-model="searchTxt" label="Search user">
            <template v-slot:append>
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <!-- End top div  -->
    <!-- Form   -->
    <div class="q-pa-md">
      <div class="row justify-center">
        <div class="col-12 col-md-auto">
          <q-card>
            <q-form @submit.prevent="onSubmit" class="q-gutter-md" ref="myForm">
              <q-input
                square outlined
                v-model="user.name" label="Name" lazy-rules
                :rules="[
                val => val && val.length || errRequired,
                val => val && !users.find(existingUser => existingUser.name === val) || 'Name already exists'
              ]"
              />

              <q-input
                square outlined autogrow
                v-model="user.emails" label="Emails (comma separated)" lazy-rules
                :rules="[ val => val && val.length || errRequired]"
              />

              <q-input
                square outlined
                v-model="user.telNumber" type="tel" class="phone-field"
                label="Phone number"
                bottom-slots>
                <template v-slot:append>
                  <span class="optional-tag">(Optional)</span>
                </template>
                <template v-slot:prepend>
                  <select v-model="selectedTelCode">
                    <option v-for="(value, key) in countryList" :key="value + '_' + key" :value="value">{{value}}
                    </option>
                  </select>
                  <span>
                    +{{selectedTelCode}}
                    <q-icon name="keyboard_arrow_down"/>
                  </span>
                </template>
              </q-input>

              <q-input
                dense class="coupon" square outlined v-model="coupon.code" label="Coupon"
                bottom-slots :class="{'coupon--invalid': coupon.isValid === false, 'coupon--valid': coupon.isValid}">
                <template v-slot:append>
                  <span class="addCoupon" @click="validateCoupon">
                    <q-icon name="add"/>
                  </span>
                </template>
                <template v-slot:hint>
                  <span class='hint' v-if="coupon.isValid">This coupon has been applied to {{coupon.label}}</span>
                  <span class='hint' v-if="coupon.isValid === false">{{coupon.label}}</span>
                </template>
              </q-input>

              <div>
                <q-btn label="Submit" type="submit"></q-btn>
              </div>
            </q-form>
          </q-card>
        </div>
      </div>
    </div>
    <!--  End Form  -->
    <!--  User Cards  -->
    <div v-if="users.length">
      <div class="q-pa-md row">
        <h5>Users</h5>
      </div>
      <div class="q-pa-md row items-start q-gutter-md ">
        <q-card v-for="user in filteredUsers" :key="user.name" class="user-cards">
          <q-card-section>
            <div class="text">Name: <span>{{user.name}}</span></div>
            <div class="text" v-if="user.telNumber">
              Phone number: <span>+{{user.telCode}} {{user.telNumber}}</span>
            </div>
            <div class="text emails">Emails:
              <ul>
                <li v-for="email in user.emails" :key="user.name + '_' + email">{{email}}</li>
              </ul>
            </div>
            <div class="text" v-if="user.coupon">
              Coupon: <span>{{user.coupon}}</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- End User Cards  -->
  </div>
</template>

<script>
  // Json from http://country.io/phone.json
  // Json has been slightly modified for the purpose of the task
  import countryListJson from './assets/_country_list.json'
  import couponListJson from './assets/_coupon_list.json'

  export default {
    name: 'App',
    data: function () {
      return {
        searchTxt: '',
        selectedTelCode: 421,
        coupon: {
          code: '',
          label: 'This Coupon is not valid',
          isValid: null,
        },
        user: {
          name: '',
          emails: '',
          telNumber: '',
          validCoupon: '',
          coupon: '',
        },
        users: [],
        isDarkTheme: false,
        countryList: countryListJson,
        couponList: couponListJson,
        errRequired: 'Field is required'
      }
    },
    computed: {
      filteredUsers() {
        if (!this.searchTxt) {
          return this.users;
        } else {
          let regex = new RegExp("^" + this.searchTxt, 'i');
          let findUser = this.users.filter(value => regex.test(value.name));
          return findUser ? findUser : []
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.myForm.validate();

        this.users.push({
          'name': this.user.name,
          'emails': this.formatEmails(),
          'telNumber': this.user.telNumber,
          'telCode': this.selectedTelCode,
          'coupon': this.user.coupon,
        })

        this.triggerNotification('User added!');
        this.resetForm();
      },
      resetForm() {
        this.user.name = '';
        this.user.emails = '';
        this.user.telNumber = '';
        this.user.coupon = '';
        this.coupon.code = '';
        this.coupon.label = '';
        this.coupon.isValid = null;
        this.selectedTelCode = '';

        this.$refs.myForm.resetValidation();
      },
      validateCoupon() {
        if (this.coupon.code) {
          let findCoupon = this.couponList.find(coupon => coupon.code === this.coupon.code)
          if (findCoupon) {
            this.coupon.isValid = true;
            this.coupon.label = findCoupon.label;
            this.user.coupon = this.coupon.code;
            this.triggerNotification('Coupon added!');
          } else {
            this.setInvalidCoupon()
          }
        } else {
          this.setInvalidCoupon()
        }
      },
      setInvalidCoupon() {
        this.coupon.isValid = false;
        this.coupon.label = 'Invalid coupon';
      },
      triggerNotification(msg) {
        this.$q.notify({
          message: msg,
          type: 'positive',
        })
      },
      formatEmails() {
        return this.user.emails.replace(' ', '').split(',');
      },
    },
    watch: {
      isDarkTheme(val) {
        this.$q.dark.set(val)
      },
      'coupon.code'() {
        this.coupon.isValid = null;
      },
    }
  }
</script>
