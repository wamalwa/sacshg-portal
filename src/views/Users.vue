<template>
  <v-app>
    <Navbar
        :actionColor="actionColor"
        :actionMessage="actionMessage"
        :role="authUser.type"
        :snackbar="snackbar"
        :userfullname="authUser.name"
    />
    <v-main class="ma-4">
      <div class="users">
        <h1 class="subheading text--gray">
          Users
          <v-btn color="primary" outlined @click="dialog = true">
            <v-icon left>mdi-plus</v-icon>
            Add User
          </v-btn>
        </h1>
        <v-dialog
            v-model="dialog"
            max-width="800px"
            persistent
            scrollable
            transition="dialog-bottom-transition"
        >
          <v-card tile>
            <v-toolbar
                color="cyan"
                dark
                dense
                flat
                src="https://api.staugustineshg.org/api/v2/files/bg2.png"
            >
              <v-btn dark icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add User</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-4">
                  <v-col cols="12">
                    <v-text-field
                        v-model="newuser.name"
                        dense
                        label="Legal Full Name*"
                        outlined
                        prepend-icon="mdi-account-box"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                        v-model="newuser.email"
                        dense
                        label="Email*"
                        outlined
                        prepend-icon="mdi-email"
                        required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                        v-model="newuser.phone"
                        dense
                        label="Phone*"
                        outlined
                        prepend-icon="mdi-phone"
                        required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                        v-model="newuser.type"
                        :items="userTypes"
                        dense
                        hide-no-data
                        item-text="name"
                        item-value="id"
                        label="User Type*"
                        outlined
                        prepend-icon="mdi-microphone-variant"
                        required
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn
                  :disabled="disabled"
                  :loading="saving"
                  color="success darken-1"
                  text
                  @click="saveUser"
              >
                <v-icon left>mdi-content-save-edit-outline</v-icon>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-container class="my-5">
          <v-dialog v-model="loading" hide-overlay persistent width="300">
            <v-card color="cyan" dark>
              <v-card-text>
                Please stand by
                <v-progress-linear
                    class="mb-0"
                    color="white"
                    indeterminate
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-card
              v-for="user in users"
              :key="user.id"
              class="pa-5 mb-3"
              hover
              outlined
          >
            <v-layout row wrap>
              <v-flex md3 sm12 xs12>
                <div class="caption grey--text">Name</div>
                <div>{{ user.name }}</div>
              </v-flex>
              <v-flex md3 sm5 xs12>
                <div class="caption grey--text">Email</div>
                <div>{{ user.email }}</div>
              </v-flex>
              <v-flex md3 sm5 xs12>
                <div class="caption grey--text">Phone</div>
                <div>{{ user.phone }}</div>
              </v-flex>
              <v-flex md2 sm2 xs6>
                <div class="caption grey--text">Type</div>
                <div>{{ user.type === 1 ? "Admin" : "Other" }}</div>
              </v-flex>
              <v-flex md1 sm2 xs6>
                <div class="caption grey--text">Actions</div>
                <v-btn color="error" fab text x-small>
                  <v-icon x-small>mdi-delete</v-icon>
                </v-btn>
                <v-btn color="info" fab text x-small>
                  <v-icon x-small>mdi-pencil</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Users",
  components: {
    Navbar,
  },

  data: () => ({
    saving: false,
    disabled: false,
    loading: true,
    dialog: false,
    actionColor: "black",
    actionMessage: "",
    snackbar: false,
    newuser: {
      id: null,
      name: "",
      email: "",
      type: "",
      phone: "",
      date_created: "",
    },
    userTypes: [
      {id: 1, name: "Admin"},
      {id: 2, name: "Staff"},
      {id: 3, name: "Manager"},
      {id: 4, name: "Member"},
    ],
    authUser: {
      name: "",
      role: 0,
    },
  }),

  computed: {
    ...mapGetters({
      users: "user/USERS",
      authenticated: "user/AUTHENTICATED",
    }),
  },

  methods: {
    ...mapActions({
      addUser: "user/SAVE_USER",
    }),
    saveUser() {
      this.saving = true;

      this.addUser(this.newuser)
          .then(() => {
            this.actionMessage =
                "You have successfully added " +
                this.newuser.name +
                " SACSHG system users!";
            this.actionColor = "success";
            this.snackbar = true;
            this.newuser = {
              id: null,
              name: "",
              type: "",
              phone: "",
            };
            this.saving = false;
            this.dialog = false;

            setTimeout(() => {
              this.actionMessage = "";
              this.actionColor = "black";
              this.snackbar = false;
            }, 4000);
          })
          .catch((err) => {
            console.log(err);
            this.actionMessage =
                "An error occured when adding " +
                this.newuser.name +
                " to SACSHG users.";
            this.actionColor = "red";
            this.snackbar = true;
            this.newuser = {
              id: null,
              name: "",
              type: "",
              phone: "",
            };
            this.saving = false;
            this.dialog = false;

            setTimeout(() => {
              this.actionMessage = "";
              this.actionColor = "black";
              this.snackbar = false;
            }, 4000);
          });
    },
  },

  mounted() {
    this.$store
        .dispatch("user/GET_STATE")
        .then(() => {
          this.$store.dispatch("user/GET_USERS").then(() => {
            this.loading = false;
          });

          if (JSON.parse(localStorage.getItem("user"))) {
            this.authUser = JSON.parse(localStorage.getItem("user"));
          } else {
            this.$router.replace({
              name: "login",
            });
          }
        })
        .catch((err) => {
          this.actionMessage = err.message + "! Please refresh this page to retry.";
          this.actionColor = "red";
          this.snackbar = true;
          this.loading = false;

          setTimeout(() => {
            this.actionMessage = "";
            this.actionColor = "black";
            this.snackbar = false;
          }, 4000);
        });
  },
};
</script>
