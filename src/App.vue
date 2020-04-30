<template>
  <div id="app">
    <h2>sadasd</h2>
    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">

        <q-input v-model="text" label="Login"></q-input>

        <q-input bottom-slots v-model="text" label="Search user">

          <template v-slot:append>
            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"></q-icon>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>

        <q-input
          v-model="emails"
          label="Emails (comma separated)"
          type="textarea"
          outlined
          autogrow
        />

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
        text: '',
        email: '',
        coupon: '',
        phoneNumber: '',
        emails: [],
        lightTheme: true,
        countryList: countryListJson,
      }
    },
    methods: {}
  }
</script>

<style>

</style>
