<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-form v-model="valid" @submit.prevent="submit" ref="form">
            <v-card flat class="elevation-3">
              <v-snackbar v-model="snackbar" :timeout="4000" top :color="actionColor">
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
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Email Address"
                      name="login"
                      prepend-icon="person"
                      outlined
                      dense
                      type="text"
                      v-model="form.username"
                      :rules="[required('username'), emailFormat()]"
                      class="mt-12"
                      v-show="!dataSent"
                    />
                  </v-col>
                  <v-col cols="12" align-self="center">
                    <p class="text-center">
                      We'll send you an email right away if the address you
                      provided is valid and in our database.
                    </p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                      color="primary"
                      type="button"
                      :loading="loading"
                      :disabled="!valid || disabled"
                      min-width=""
                      v-show="!dataSent"
                      @click="sendLink()"
                      ><v-icon left>link</v-icon> Send Reset Link</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import validations from "@/utils/validations";
import { mapActions } from "vuex";

export default {
  name: "ResetPassword",
  data() {
    return {
      ...validations,
      form: {
        username: "",
      },
      inputRules: [
        (v) => !!v || "This field is required",
        (v) => v.length >= 3 || "Minimum length is 3 characters",
      ],
      resetMessage: "We require the email address you used to register on KCM so that we can help you reset your password. Enter it below",
      snackbar: false,
      actionColor: "black",
      loading: false,
      disabled: false,
      valid: false,
      dataSent: false
    };
  },

  methods: {
    ...mapActions({
      sendResetLink: "user/SEND_LINK",
    }),
    sendLink() {
      this.loading = true;
      this.sendResetLink({ email: this.form.username }).then(() => {
        this.loading = false;
            this.disabled = false;

            this.dataSent = true

            this.resetMessage = "We are processing your password reset request. If we find an account under your email, we'll send you the password reset link in a moment."
            this.snackbar = true;
            this.actionColor = "info";
      });
    },
  },
};
</script>