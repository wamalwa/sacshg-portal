<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-form v-model="valid" @submit.prevent="submit" ref="form">
            <v-card flat class="elevation-3">
              <v-snackbar
                v-model="snackbar"
                :timeout="4000"
                top
                :color="actionColor"
              >
                <span>{{ resetMessage }}</span>
                <v-btn text fab @click="snackbar = false">
                  <v-icon>highlight_off</v-icon>
                </v-btn>
              </v-snackbar>
              <v-toolbar
                color="primary"
                dark
                flat
                src="https://api.staugustineshg.org/api/v2/files/bg2.png"
              >
                <v-img
                  src="https://api.staugustineshg.org/api/v2/files/logo.png"
                  style="max-width: 72px"
                  class="mr-3"
                ></v-img>
                <v-toolbar-title> Reset Password </v-toolbar-title>
                <v-spacer />
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large link to="/" v-on="on">
                      <v-icon>mdi-home</v-icon>
                    </v-btn>
                  </template>
                  <span>Portal Home</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <span class="overline">{{ resetTitle }}</span>
                <br />
                <span class="body-2">{{ resetMessage }}</span>
                <v-text-field
                  label="Email Address"
                  name="login"
                  prepend-icon="person"
                  outlined
                  dense
                  readonly
                  disabled
                  type="text"
                  :class="`pt-5 ${dataSent ? 'd-none' : ''}`"
                  :value="form.jsaUser.username"
                  :rules="[required('email'), emailFormat()]"
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  :class="`${dataSent ? 'd-none' : ''}`"
                  outlined
                  dense
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.jsaUser.password"
                  :rules="[
                    required('password'),
                    password(),
                    minLength('Password', 8),
                  ]"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                />

                <v-text-field
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  prepend-icon="lock"
                  :class="`${dataSent ? 'd-none' : ''}`"
                  outlined
                  dense
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[
                    required('password confirmation'),
                    matchesFields(
                      form.jsaUser.password,
                      'Passwords do not match'
                    ),
                  ]"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn class="primary--text" text to="/login"
                  >Back to Login
                </v-btn>
                <v-btn
                  v-if="regenerate"
                  class="warning--text"
                  text
                  to="/reset-password"
                  >Generate another Link
                </v-btn>
                <v-spacer />
                <v-btn
                  color="primary"
                  type="submit"
                  :class="`${dataSent ? 'd-none' : ''}`"
                  :loading="loading"
                  :disabled="!valid || disabled"
                  >Reset Password</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import validations from "@/utils/validations";
export default {
  name: "Reset",
  props: {
    source: String,
  },
  data() {
    return {
      ...validations,
      regenerate: false,
      form: {
        confirmationToken: "",
        jsaUser: {
          user_id: 0,
          username: "",
          password: "",
        },
      },
      inputRules: [
        (v) => !!v || "This field is required",
        (v) => v.length >= 3 || "Minimum length is 3 characters",
      ],
      resetMessage:
        "We have filled in the email address for you. Kindly set a new password",

      resetTitle: "Invalid Token!",
      snackbar: false,
      actionColor: "info",
      showPassword: false,
      loading: false,
      disabled: false,
      valid: false,
      dataSent: false,
    };
  },
  methods: {
    ...mapActions({
      resetPassword: "user/CONFIRM_RESET_PASSWORD",
    }),
    submit() {
      if (this.valid) {
        this.loading = true;
        this.disabled = true;
        this.resetPassword(this.form)
          .then(() => {
            //this.loading = false;
            //this.disabled = false;

            if (this.confirmationToken === "Success!") {
              this.dataSent = true;

              this.resetMessage =
                "You have successfully reset your password. Wait a moment as we take you to the login page.";
              this.resetTitle = "SUCCESS!";
              this.actionColor = "success";
              this.snackbar = true;

              setTimeout(() => {
                this.$router.replace({
                  name: "login",
                });
              }, 2000);
            } else {
              this.resetMessage = this.confirmationToken;
              this.snackbar = true;
              this.actionColor = "red";
              this.loading = false;
              this.disabled = false;
            }

            // Hide textbox and button, change paragraph text
          })
          .catch((e) => {
            this.resetMessage = e.message;

            this.snackbar = true;
            this.actionColor = "red";
            this.loading = false;
            this.disabled = false;
          });
      }
    },
  },

  computed: {
    ...mapGetters({
      confirmationToken: "user/RESET_TOKEN",
    }),
  },
  mounted() {
    this.$store
      .dispatch("user/GET_RESET_TOKEN", {
        token: this.$route.params.token,
      })
      .then(() => {
        if (this.confirmationToken === "" || this.confirmationToken === null) {
          this.resetMessage = "The link is expired, broken or invalid";
          this.resetTitle = "Invalid Token!";
          this.regenerate = true;
          this.snackbar = true;
          this.actionColor = "red";
          this.dataSent = true;
        } else {
          this.form.jsaUser.user_id = this.confirmationToken.jsaUser.user_id;
          this.form.confirmationToken =
            this.confirmationToken.confirmationToken;
          this.form.jsaUser.username = this.confirmationToken.jsaUser.username;
        }
        this.loading = false;
      })
      .catch((e) => {
        this.resetMessage = "The link is expired, broken or invalid";
        this.resetTitle = "Invalid Token!";
        this.regenerate = true;
        console.log(e.message);
        this.snackbar = true;
        this.actionColor = "red";
        this.dataSent = true;
      });
  },
};
</script>
