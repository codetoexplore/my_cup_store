<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>

        <v-list three-line>
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.header"
              >
                {{ item.header }}
              </v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-tile
                v-else
                :key="item.title"
                avatar
                @click.stop="displaydialog(item.title)"
              >
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <mydialog></mydialog>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import mydialog from './dialog.vue';
import { eventBus } from '../main';

  export default {
    data () {
      return {
        items: [
          { header: 'All Time' },
          {
            avatar: 'https://pbs.twimg.com/profile_images/952394640552005632/zsjSs7yd_bigger.jpg',
            title: 'm.diane',
            subtitle: `<span class='text--primary'>@cULTMOTHER</span> &mdash; told my boyfriend I was going to start my period and he said, "AGAIN??" it's like, you know what, you're right, I'm cancelling my subscription.`
          },
          { divider: true, inset: true },
          {
            avatar: 'https://pbs.twimg.com/profile_images/1120298627186950145/gp3dGnMf_400x400.jpg',
            title: 'ari',
            subtitle: `<span class='text--primary'>@aarifah_l</span> &mdash; Your pornstar name is:
            Your first name + your last name
            Bc it's you. You're a hoe.`
          },
          { divider: true, inset: true },
          {
            avatar: 'https://pbs.twimg.com/profile_images/1122672313646796800/ld3pL6kp_reasonably_small.jpg',
            title: 'khiry curving',
            subtitle: `<span class='text--primary'>@KhiryArion</span> &mdash; so I asked my mom why is she still talking to my old boo and she asked me “why are you still talking to my ex husband?”. Ma’am.. that is my father 
😂`
          },
          { divider: true, inset: true },
          {
            avatar: 'https://pbs.twimg.com/profile_images/1103514236494344192/aTx9f9fJ_reasonably_small.jpg',
            title: 'Alec',
            subtitle: `<span class='text--primary'>@aIecrl</span> &mdash; Today I had 800 mg of caffeine, exercised for 2 hours, ate literally 80 pizza rolls, and did a facemask. The line between self care and self destruction is a fine one but god do I walk it hard brother`
          },
          { divider: true, inset: true },
          {
            avatar: 'https://pbs.twimg.com/profile_images/1110941074116141057/XyLc6OW7_bigger.jpg',
            title: 'evelyn',
            subtitle: `<span class='text--primary'>@evelynnleee</span> &mdash; this customer walked in 10 SECONDS before we CLOSED and she had the audacity to yell “yay i made it” bitch you made what? made me mad?`
          }
        ]
      }
    },
    methods: {
      showmug(parent_el) {
        dialog = false;
        console.log(parent_el)
        
      },
      displaydialog(itemtitle) {
        eventBus.$emit('componentactivated', itemtitle);
      }
    },
    components: {
      mydialog

    }

  }
</script>

<style>

</style>