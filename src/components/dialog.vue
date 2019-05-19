<template>
            <v-dialog
                v-model="dialog"
                max-width="290"
            >
              <v-card>
                <v-img> </v-img>

                <v-card-text>
                   This sturdy mug is perfect for your morning coffee, afternoon tea, or whatever hot beverage you enjoy. It's glossy white and yields vivid prints that retain their quality when dish-washed and microwaved.
                      <ul>
                      <li>Ceramic</li>
                      <li>Height - 3.85" (9.8 cm), diameter - 3.35" (8.5 cm)</li>
                      <li>Dishwasher and microwave safe</li>
                      </ul>
                </v-card-text>

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