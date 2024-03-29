<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-form v-model="valid" @submit.prevent="submit" ref="form">
            <v-card flat class="elevation-3">
              <v-snackbar v-model="snackbar" :timeout="4000" top color="red">
                <span>{{ loginMessage }}</span>
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
                <v-toolbar-title> St. Augustine SHG Login </v-toolbar-title>
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
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  outlined
                  dense
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  :rules="[required('password')]"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                />
                <v-row class="">
                  <v-col md="8">
                    <v-btn class="blue--text" text to="/reset-password"
                      >Forgot Password?
                    </v-btn>
                  </v-col>
                  <v-col md="4">
                    <v-btn
                      color="primary"
                      type="submit"
                      :loading="loading"
                      :disabled="!valid || disabled"
                      min-width=""
                      block
                      >Login</v-btn
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
import { mapActions } from "vuex";
import validations from "@/utils/validations";
export default {
  name: "Login",
  props: {
    source: String,
  },
  data() {
    return {
      ...validations,
      form: {
        username: "",
        password: "",
      },
      inputRules: [
        (v) => !!v || "This field is required",
        (v) => v.length >= 3 || "Minimum length is 3 characters",
      ],
      loginMessage: "",
      showPassword: false,
      snackbar: false,
      loading: false,
      disabled: false,
      valid: false,
    };
  },
  methods: {
    ...mapActions({
      signIn: "user/LOGIN",
    }),
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.disabled = true;
        this.signIn(this.form)
          .then(() => {
            this.loading = false;
            this.disabled = false;

            this.$router.replace({
              name: "dashboard",
            });
          })
          .catch((e) => {
            if (e.response.data.status === 401) {
              this.form.password = "";
              this.form.username = "";
              this.loginMessage = "Incorrect Credentials";
            } else {
              this.loginMessage = e.response.data;
            }

            this.snackbar = true;
            this.loading = false;
            this.disabled = false;
          });
      }
    },
  },
};
</script>
