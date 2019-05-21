<template>
            <v-dialog
                v-model="dialog"
                max-width="290"
            >
              <v-card>
                <v-img :src="require('../assets/cups/mockup_donald.jpg')">
                </v-img>

                

              <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                      color="blue darken-1"
                      flat="flat"
                      @click= goHome
                  >
                      Get One
                  </v-btn>

                  <v-btn
                    color="gey darken-1"
                    flat="flat"
                    @click="dialog = false"
                  >
                    Pick Another
                  </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
</template>

<script>
import { eventBus } from '../main';
  export default {
    data () {
      return {
        dialog: false,
        tweet: ''
      }
    },
    created() {
      eventBus.$on('componentactivated', (twtname) => {
        this.tweet = twtname;
        this.dialog = true;
      })

    },
    methods: {
      goHome() {
        this.$router.push('/?q='+this.tweet);
      }
    }
  }
</script>