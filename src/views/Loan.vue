<template>
  <v-app>
    <Navbar
      :userfullname="authUser.name"
      :snackbar="snackbar"
      :actionColor="actionColor"
      :actionMessage="actionMessage"
      :role="authUser.type"
    />

    <v-main class="ma-4">
      <div class="member">
        <h1 class="subheading text--gray">Loan Details</h1>

        <v-container class="my-5">
          <v-row>
            <v-col
              v-show="loading"
              cols="12"
              class="col-xs-12 col-sm-6 col-md-8"
            >
              <v-skeleton-loader
                class="mx-auto"
                type="card"
              ></v-skeleton-loader>
            </v-col>
            <v-col
              v-show="!loading"
              cols="12"
              class="col-xs-12 col-sm-6 col-md-8"
            >
              <v-card outlined>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="col-md-8 py-1">
                      <small>Applicant Name</small><br />
                      <span class="text-h6">{{ loan.name }} </span>
                    </v-col>
                    <v-col cols="12" class="col-md-4 py-1">
                      <div class="text-right">
                        <v-chip
                          v-show="loan.status === 'approved'"
                          class="ma-2"
                          color="success"
                          outlined
                        >
                          <v-icon left> mdi-server-plus </v-icon>
                          APPROVED
                        </v-chip>

                        <v-chip
                          v-show="loan.status === 'rejected'"
                          class="ma-2"
                          color="red"
                          outlined
                        >
                          <v-icon left> mdi-server-plus </v-icon>
                          REJECTED
                        </v-chip>

                        <v-chip
                          v-show="loan.status === 'pending'"
                          class="ma-2"
                          color="orange"
                          outlined
                        >
                          <v-icon left> mdi-server-plus </v-icon>
                          PENDING
                        </v-chip>
                      </div>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>ID/Passport Number</small><br />
                      <span class="text-h6">{{ loan.national_id }} </span>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>Date of Birth</small><br />
                      <span class="text-h6">{{ loan.date_of_birth }} </span>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>Phone Number</small><br />
                      <span class="text-h6">{{ loan.phone_number }} </span>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>Email Address</small><br />
                      <span class="text-h6">{{ loan.email_address }} </span>
                    </v-col>
                  </v-row>
                  <v-divider class="my-3"></v-divider>
                  <v-row>
                    <v-col cols="12" class="col-xs-12 pb-1">
                      <h5>Other Information</h5>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-btn
                        link
                        text
                        color="pink"
                        :href="`${loan.application_form_url}`"
                      >
                        <v-icon left>mdi-link-variant</v-icon> Loan Application
                        Form
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      Application Date: {{ loan.date_created }}
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card outlined class="mt-3">
                <v-card-title>
                  <h5>Actions</h5>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="col-xs-12 py-1">
                      <v-btn
                        text
                        color="green"
                        class="mx-1"
                        :loading="approving"
                        @click="saveLoan('approved')"
                        :disabled="
                          rejecting ||
                          loan.status === 'approved' ||
                          loan.status === 'rejected'
                        "
                        ><v-icon left>mdi-check</v-icon> Approve</v-btn
                      >
                      <v-btn text color="blue" class="mx-1"
                        ><v-icon left>mdi-pencil</v-icon> Request Review</v-btn
                      >
                      <v-btn
                        text
                        color="red"
                        class="mx-1"
                        :loading="rejecting"
                        @click="saveLoan('rejected')"
                        :disabled="
                          approving ||
                          loan.status === 'approved' ||
                          loan.status === 'rejected'
                        "
                        ><v-icon left>mdi-close</v-icon> Reject</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Member",

  components: {
    Navbar,
  },

  data() {
    return {
      actionColor: "black",
      actionMessage: "",
      snackbar: false,
      loading: true,
      approving: false,
      rejecting: false,
      authUser: {
        name: "",
      },
    };
  },

  computed: {
    ...mapGetters({
      loan: "loan/LOAN",
      authenticated: "user/AUTHENTICATED",
    }),
  },

  methods: {
    ...mapActions({
      updateLoanStatus: "loan/UPDATE_STATUS",
    }),

    saveLoan(newStatus) {
      if (newStatus === "approved") {
        this.approving = true;
      }

      if (newStatus === "rejected") {
        this.rejecting = true;
      }

      this.updateLoanStatus({
        data: {
          id: this.loan.id,
          status: {
            status: newStatus,
          },
        },
      }).then(() => {
        this.loading = true;
        this.approving = false;
        this.rejecting = false;
        this.$store
          .dispatch("loan/GET_LOAN", this.$route.params.id)
          .then(() => {
            this.loading = false;
          });
      });
    },
  },

  mounted() {
    this.$store
      .dispatch("user/GET_STATE")
      .then(() => {
        this.$store
          .dispatch("loan/GET_LOAN", this.$route.params.id)
          .then(() => {
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