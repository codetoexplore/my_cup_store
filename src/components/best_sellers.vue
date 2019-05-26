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
                @click.stop="displaydialog(item.handle)"
              >
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                
            
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                      <v-list-tile-handle v-html="item.handle"></v-list-tile-handle>
             
  
                  
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
            avatar: 'https://pbs.twimg.com/profile_images/1112033582569136128/0vZG4q0Y_bigger.jpg',
            title: 'nope',
            handle: '@LilNasX',
            subtitle: `my music taste is crazy i can go from old town road`
          },
          { divider: true, inset: true },
          {
            avatar: 'https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_400x400.jpg',
            title: 'Barack Obama',
            handle: '@BarackObama',
            subtitle: `I’ve always drawn inspiration from what Dr. King called life’s most persistent and urgent question: "What are you doing for others?"...`
          },
          { divider: true, inset: true },
          {
            avatar: 'https://pbs.twimg.com/profile_images/1053330932906639362/9OfK5qOh_400x400.jpg',
            title: 'Ellen DeGeneres',
            handle: '@TheEllenShow',
            subtitle: `The #royalbaby is here! Congratulations, Meghan Markle and Prince Harry. The baby is 7th in line for the throne, which is crazy...`
          },
          { divider: true, inset: true },
          {
            avatar: 'https://pbs.twimg.com/profile_images/1127326694585421826/kuFXswNr_400x400.jpg',
            title: 'Ariana Grande',
            handle: '@ArianaGrande',
            subtitle: `love u`
          },
          { divider: true, inset: true },
          {
            avatar: 'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg',
            title: 'Donald J. Trump',
            handle: `@realDonaldTrump`,
            subtitle: `MAKE AMERICA GREAT AGAIN!` 
          }
        ]
      }
    },
    methods: {
      showmug(parent_el) {
        dialog = false;
        
      },
      displaydialog(itemhandle) {
        eventBus.$emit('componentactivated', itemhandle);
      }
    },
    components: {
      mydialog

    }

  }
</script>

<style>

</style>