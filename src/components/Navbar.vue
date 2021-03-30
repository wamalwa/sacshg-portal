<template>
  <nav>
    <v-snackbar 
    v-model="snackbar" 
    multi-line
    timeout="4000" 
    top 
    :color="actionColor"
    >
      <span>{{ actionMessage }}</span>
      <v-btn text fab @click="snackbar = false">
        <v-icon>highlight_off</v-icon>
      </v-btn>
    </v-snackbar>
    <!--v-app-bar flat app-->
    <v-app-bar app flat dark color="primary" dense src="https://sacn.univa.co.ke/api/v2/files/bg2.png">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">StAugustine</span>
        <span>SHG</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn text class="white--text text-capitalize" v-on="on">
            <v-icon left>account_circle</v-icon>
            <span>{{ userfullname }}</span>
            <v-icon right>expand_more</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click.prevent="">
            <v-list-item-title>
              <v-icon left>account_circle</v-icon>
              <span>My Profile</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="signOut">
            <v-list-item-title>
              <v-icon left>exit_to_app</v-icon>
              <span>Sign Out</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer dark v-model="drawer" app dense src="https://sacn.univa.co.ke/api/v2/files/bg2.png">
    <!--v-navigation-drawer app v-model="drawer" absolute temporary-->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-uppercase white--text">
                <span class="font-weight-light">StAugustine</span>
                <span>SHG</span>
          </v-list-item-title>
          <v-list-item-subtitle> Portal </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NavBar",
  props: {
    userfullname: String,
    actionMessage: String,
    actionColor: String,
    snackbar: Boolean,
    role: Number,
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: '/' },
        { title: "News", icon: "mdi-cast", route: '/news' },
        { title: "Events", icon: "event", route: '/events' },
        { title: "CSI", icon: "support", route: '/csi' },
        { title: "Media", icon: "mdi-image-multiple", route: '/media' },
        { title: "Members", icon: "bookmarks", route: '/members' },
        { title: "News Categories", icon: "category", route: '/categories' },
        { title: "User Management", icon: "mdi-account-box", route: '/users' },
        { title: "Messages", icon: "mdi-email", route: '/messages' },
        { title: "General Settings", icon: "settings", route: '/settings' },
      ],
      right: null,
    };
  },

  methods: {
    ...mapActions({
      signOutAction: "user/LOGOUT",
    }),

    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "login",
        });
      });
    },
  }
};
</script>