<template>
  <div id="app">
    <!-- top div  -->
    <div class="q-pa-md">
      <div class="row justify-around">
        <div class="col-4">
          <q-toggle v-model="isDarkTheme" label="Dark Theme"></q-toggle>
        </div>
        <div class="col-2">
          <q-input
            dense square outlined class="search" v-model="searchTxt" label="Search user">
            <template v-slot:append>
              <q-icon v-if="searchTxt !== ''" name="close" @click="searchTxt = ''" class="cursor-pointer"></q-icon>
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
                ref="login" square outlined
                v-model="login" label="Login" lazy-rules
                :rules="[
                val => val && val.length || errRequired,
                val => val && !users.find(user => user.name === val) || 'Name already exists'
              ]"
              />

              <q-input
                ref="email" square outlined autogrow
                v-model="emails" label="Emails (comma separated)" lazy-rules
                :rules="[ val => val && val.length || errRequired]"
              />
              <div>
                <q-btn label="Submit" type="submit"></q-btn>
              </div>
            </q-form>
          </q-card>
        </div>
      </div>
    </div>
    <!--  End Form  -->
    <div v-if="users.length">
      <div class="q-pa-md row">
        <h4>Users</h4>
      </div>
      <div class="q-pa-md row items-start q-gutter-md ">
        <q-card v-for="user in users" :key="user.name" class="user-cards">
          <q-card-section>
            <div class="text-h6">Name: <span>{{user.name}}</span></div>
            <div class="text-h6 emails">Emails:
              <ul>
                <li v-for="email in user.emails" :key="user.name + '_' + email">{{email}}</li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  // import HelloWorld from './components/HelloWorld.vue'

  // Json from http://country.io/phone.json
  // Json has been slightly modified for the purpose of the task
  import countryListJson from './assets/_country_list.json'

  export default {
    name: 'App',
    components: {
      // HelloWorld
    },
    data: function () {
      return {
        login: '',
        searchTxt: '',
        coupon: '',
        phoneNumber: '',
        emails: '',
        users: [],
        isDarkTheme: false,
        countryList: countryListJson,
        errRequired: 'Field is required'
      }
    },
    computed: {},
    methods: {
      onSubmit() {
        this.$refs.myForm.validate();

        this.users.push({
          'name': this.login,
          'emails': this.formatEmails(),
        })

        this.resetForm();
      },
      resetForm() {
        this.login = "";
        this.emails = "";

        this.$refs.myForm.resetValidation();
      },
      formatEmails() {
        return this.emails.replace(' ', '').split(',');
      },
    },
    watch: {
      isDarkTheme(val) {
        this.$q.dark.set(val)
      }
    }
  }
</script>
