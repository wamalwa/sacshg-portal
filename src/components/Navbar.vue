<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      multi-line
      top
      :color="actionColor"
      timeout="8000"
    >
      {{ actionMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn fab text v-bind="attrs" @click="snackbar = false">
          <v-icon>highlight_off</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <nav>
      <!--v-snackbar
      v-model="snackbar"
      multi-line
      timeout="100000"
      top
      :color="actionColor"
    >
      <span>{{ actionMessage }}</span>
      <v-btn right text fab @click="snackbar = false">
        <v-icon>highlight_off</v-icon>
      </v-btn>
    </v-snackbar-->

      <!--v-app-bar flat app-->
      <v-app-bar
        app
        flat
        dark
        color="primary"
        dense
        src="https://api.staugustineshg.org/api/v2/files/bg2.png"
      >
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

      <v-navigation-drawer
        dark
        v-model="drawer"
        app
        dense
        src="https://api.staugustineshg.org/api/v2/files/bg2.png"
      >
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
          <v-list-item
            v-for="item in myView"
            :key="item.title"
            link
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="role < 3"
            class="deep-purple lighten-2 text-caption"
          >
            <v-list-item-icon>
              <v-icon>info</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span
                >Some features might be unavailable due to your account
                permission level.</span
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>
  </div>
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
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          route: "/",
          access: 1,
        },
        { title: "News", icon: "mdi-cast", route: "/news", access: 1 },
        { title: "Events", icon: "event", route: "/events", access: 1 },
        { title: "CSI", icon: "support", route: "/csi", access: 1 },
        {
          title: "Media",
          icon: "mdi-image-multiple",
          route: "/media",
          access: 1,
        },
        { title: "Members", icon: "bookmarks", route: "/members", access: 3 },
        {
          title: "Loans",
          icon: "mdi-currency-usd",
          route: "/loans",
          access: 3,
        },
        {
          title: "News Categories",
          icon: "category",
          route: "/categories",
          access: 2,
        },
        {
          title: "User Management",
          icon: "mdi-account-box",
          route: "/users",
          access: 2,
        },
        { title: "Messages", icon: "mdi-email", route: "/messages", access: 1 },
        {
          title: "General Settings",
          icon: "settings",
          route: "/settings",
          access: 3,
        },
      ],
      right: null,
    };
  },

  computed: {
    myView() {
      var rl = this.role ? this.role : 0;
      return this.items.filter((item) => item.access <= rl);
    },
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
  },
};
</script>