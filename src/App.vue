<template>
  <div id="app">
    <div class="q-pa-md doc-container">
      <div class="column items-center">
        <div class="col-8">
          <q-toggle v-model="isDarkTheme" label="Dark Theme"></q-toggle>
          <q-input
            dense square outlined :filled="isDarkTheme"
            class="search" v-model="searchTxt" label="Search user">
            <template v-slot:append>
              <q-icon v-if="searchTxt !== ''" name="close" @click="searchTxt = ''" class="cursor-pointer"></q-icon>
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-form @submit.prevent="onSubmit" class="q-gutter-md" ref="myForm">
            <q-input
              ref="login"
              square
              outlined
              :filled="isDarkTheme"
              v-model="login"
              label="Login"
              lazy-rules
              :rules="[
                val => val && val.length || 'Please type something',
                val => val && !users.find(user => user.name === val) || 'Name already exists'
              ]"
            />

            <q-input
              ref="email"
              square
              outlined
              autogrow
              :filled="isDarkTheme"
              v-model="emails"
              label="Emails (comma separated)"
              lazy-rules
              :rules="[ val => val && val.length || 'Please type something']"
            />
            <div>
              <q-btn label="Submit" type="submit"></q-btn>
            </div>
          </q-form>
        </div>
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
      }
    },
    computed: {
    },
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
