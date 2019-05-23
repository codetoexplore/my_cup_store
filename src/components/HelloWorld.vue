<template>
  <v-app id="inspire">
    <v-navigation-drawer temporary
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/" tag="button">Home</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>trending_up</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/best_sellers" tag="button">Best Sellers</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/about" tag="button">About</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon
       @click.stop="drawer = !drawer"
       class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title> 
        <v-icon left>local_cafe</v-icon>
        <router-link to="/" style="cursor: pointer" ><span class="white--text">MugTweet</span></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <router-link to="/" tag="button">
          <v-btn flat>
            <v-icon left>home</v-icon>
          Home
          </v-btn>
        </router-link>
        <router-link to="/best_sellers" tag="button">
          <v-btn flat>
            <v-icon left>trending_up</v-icon>
          Best Sellers
          </v-btn>
        </router-link>
        <router-link to="/about" tag="button">
          <v-btn flat>
            <v-icon left>contact_mail</v-icon>
          About
          </v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="contctr">
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>
            <router-view></router-view>
            
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    })
  }
</script>

<style>
body {
  justify-content: center;
}


.maincontainer {
  padding: 64px 0px 32px 60px;
}

.v-footer {
  justify-content: center;
}


@media (max-width: 414px) {
  .v-stepper__step {
    flex-direction: column;
  }
  main.v-content {
    padding: 64px 0px 32px 60px;
  }

}






</style>
