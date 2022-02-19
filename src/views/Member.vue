<template>
  <v-app>
    <Navbar
      :userfullname="authUser.name"
      :snackbar="snackbar"
      :actionColor="actionColor"
      :actionMessage="actionMessage"
      :role="authUser.type"
    />

    <v-dialog
        v-model="reviewDialog"
        transition="dialog-bottom-transition"
        scrollable
        max-width="600px"
        persistent
    >
      <v-card tile>
        <v-toolbar
            flat
            dense
            dark
            color="cyan"
            src="https://api.staugustineshg.org/api/v2/files/bg2.png"
        >
          <v-btn icon dark @click="reviewDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ reviewDialogMessage }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row class="mt-4">
              <v-col cols="12">
                <v-text-field
                    v-model="comment"
                    label="Comment*"
                    outlined
                    dense
                    prepend-icon="mdi-comment"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="reviewDialog = false">
            Close
          </v-btn>
          <v-btn
              color="success darken-1"
              :loading="saving"
              :disabled="disabled"
              text
              @click="reviewMember"
          >
            <v-icon left>mdi-content-save-edit-outline</v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main class="ma-4">
      <div class="member">
        <h1 class="subheading text--gray">Member Details</h1>

        <v-container class="my-5">
          <v-row>
            <v-col cols="12" class="col-xs-12 col-sm-6 col-md-4">
              <v-row>
                <v-col cols="12 px-0">
                  <v-btn
                    link
                    text
                    color="pink"
                    :href="`https://api.staugustineshg.org/api/v2/reg/docs/${member.kra_url}`"
                  >
                    <v-icon left>mdi-link-variant</v-icon> KRA Pin Scan
                  </v-btn>
                  <br />
                  <v-btn
                    link
                    text
                    color="pink"
                    :href="`https://api.staugustineshg.org/api/v2/reg/docs/${member.form_url}`"
                  >
                    <v-icon left>mdi-link-variant</v-icon> Filled Application
                    Form
                  </v-btn>
                </v-col>
                <v-col cols="4 px-0">
                  <v-card
                    class="mx-auto"
                    outlined
                    color="grey lighten-4"
                    rounded="0"
                  >
                    <v-card-text class="pa-1">
                      <v-img
                        :src="`https://api.staugustineshg.org/api/v2/reg/docs/${member.passport_photo_url}`"
                      ></v-img>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="8 px-0">
                  <v-card
                    class="mx-auto"
                    outlined
                    color="grey lighten-4"
                    rounded="0"
                  >
                    <v-card-text class="pa-1">
                      <v-img
                        :src="`https://api.staugustineshg.org/api/v2/reg/docs/${member.id_passport_url}`"
                      ></v-img>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="col-xs-12 col-sm-6 col-md-8">
              <v-card outlined>
                <v-card-title>
                  <h3>
                    {{
                      member.salutation +
                      ". " +
                      member.surname +
                      " " +
                      member.first_name +
                      " " +
                      member.other_names
                    }}
                  </h3>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="col-md-4 py-1">
                      <small>ID/Passport Number</small><br />
                      <span class="text-h6">{{ member.id_number }} </span>
                    </v-col>
                    <v-col cols="12" class="col-md-4 py-1">
                      <small>Date of Birth</small><br />
                      <span class="text-h6">{{ member.date_of_birth }} </span>
                    </v-col>
                    <v-col cols="12" class="col-md-4 py-1">
                      <small>Phone Number</small><br />
                      <span class="text-h6">{{ member.phone_number }} </span>
                    </v-col>
                    <v-col cols="12" class="col-md-3 py-1">
                      <small>Nationality</small><br />
                      <span class="text-subtitle-2"
                        >{{ member.nationality }}
                      </span>
                    </v-col>
                    <v-col cols="12" class="col-md-3 py-1">
                      <small>Gender</small><br />
                      <span class="text-subtitle-2">{{ member.gender }} </span>
                    </v-col>
                    <v-col cols="12" class="col-md-3 py-1">
                      <small>Marital Status</small><br />
                      <span class="text-subtitle-2"
                        >{{ member.marital_status }}
                      </span>
                    </v-col>
                    <v-col cols="12" class="col-md-3 py-1">
                      <small>Religion</small><br />
                      <span class="text-subtitle-2"
                        >{{ member.religion }}
                      </span>
                    </v-col>
                  </v-row>
                  <v-divider class="my-3"></v-divider>
                  <v-row>
                    <v-col cols="12" class="col-xs-12 pb-1">
                      <h5>Other Information</h5>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>Current Address</small><br />
                      <span class="text-subtitle-2">{{ member.address }} </span>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>Area of Residence</small><br />
                      <span class="text-subtitle-2"
                        >{{ member.residence }}
                      </span>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>Estate/Village</small><br />
                      <span class="text-subtitle-2">{{ member.estate }} </span>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card outlined class="mt-3">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="col-xs-12 py-1">
                      <v-data-table
                        :headers="headers"
                        :items="beneficiaries"
                        class="cyan--text"
                        dense
                      >
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>Beneficiaries</v-toolbar-title>
                          </v-toolbar>
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-row>
                  <v-divider class="my-3"></v-divider>
                  <v-row>
                    <v-col cols="12" class="col-xs-12 pb-1">
                      <h4>Next of Kin</h4>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>Full Name</small><br />
                      <span class="text-subtitle-2">{{ nok.name }} </span>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>Relationship to Member</small><br />
                      <span class="text-subtitle-2"
                        >{{ nok.relationship }}
                      </span>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>Mobile Number</small><br />
                      <span class="text-subtitle-2"
                        >{{ nok.mobile_number }}
                      </span>
                    </v-col>
                    <v-col cols="12" class="col-md-6 py-1">
                      <small>ID/Passport Number</small><br />
                      <span class="text-subtitle-2"
                        >{{ nok.id_passport }}
                      </span>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card
                outlined
                class="mt-3"
                v-show="member.stage === 'management' && authUser.type === 3"
              >
                <v-card-title>
                  <h5>Actions</h5>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="col-xs-12 py-1">
                      <v-btn text color="green" class="mx-1" @click="triggerStatusUpdate(1)"
                        ><v-icon left>mdi-check</v-icon> Approve</v-btn
                      >
                      <v-btn text color="blue" class="mx-1" @click="triggerStatusUpdate(2)"
                        ><v-icon left>mdi-pencil</v-icon> Request Review</v-btn
                      >
                      <v-btn text color="red" class="mx-1" @click="triggerStatusUpdate(3)"
                        ><v-icon left>mdi-close</v-icon> Reject</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card
                outlined
                class="mt-3"
                v-show="member.stage === 'operations' && authUser.type === 4"
              >
                <v-card-title>
                  <h5>Actions</h5>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="col-xs-12 py-1">
                      <v-btn text color="green" class="mx-1" @click="triggerStatusUpdate(1)"
                        ><v-icon left>mdi-check</v-icon> Approve</v-btn
                      >
                      <v-btn text color="blue" class="mx-1" @click="triggerStatusUpdate(2)"
                        ><v-icon left>mdi-pencil</v-icon> Request Review</v-btn
                      >
                      <v-btn text color="red" class="mx-1" @click="triggerStatusUpdate(3)"
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
import {mapActions, mapGetters} from "vuex";

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
      reviewDialog: false,
      action: "",
      comment: "",
      reviewDialogMessage: "",
      saving: false,
      disabled: false,
      authUser: {
        name: "",
      },
      headers: [
        {
          text: "Full Names",
          align: "start",
          sortable: false,
          value: "full_name",
        },
        { text: "R/ship to Member", value: "relationship" },

        { text: "D. of Birth", value: "date_of_birth" },
        { text: "Gender", value: "gender" },
        { text: "Allocation (%)", value: "allocation" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      member: "member/MEMBER",
      beneficiaries: "member/BENEFICIARIES",
      nok: "member/NOK",
      reviewResult: "member/UPDATE_RESULT",
      authenticated: "user/AUTHENTICATED",
    }),
  },

  methods: {
    ...mapActions({
      updateMemberStatus: "member/UPDATE_MEMBER_STATUS",
    }),
    triggerStatusUpdate(type) {
      this.comment = "";
      this.action = type === 1 ? "approved" : (type === 2 ? "review" : (type === 3 ? "rejected" : ""));
      this.reviewDialogMessage = type === 1 ? `Approve ${this.member.first_name}'s membership request`
          : (type === 2 ? `Request review on ${this.member.first_name}'s membership request`
              : (type === 3 ? `Reject ${this.member.first_name}'s membership request` : ""));
      this.reviewDialog = true;
    },
    reviewMember() {
      this.saving = true;
      this.disabled = true;
      const payload = {
        id: this.member.id,
        action: this.action,
        comment: this.comment
      }

      this.updateMemberStatus(payload).then(() => {
        this.actionColor = this.reviewResult.status === 1000 ? "success" : "danger";
        this.saving = false;
        this.reviewDialog = false;
        this.comment = "";
        this.action = "";

        this.actionMessage = this.reviewResult.message;
        this.snackbar = true;

        setTimeout(() => {
          this.actionMessage = "";
          this.actionColor = "black";
          this.snackbar = false;
          this.disabled = false;
        }, 4000);

      }).catch((err) => {
        console.log(err);
        this.actionMessage =
            "An error occured when updating status";
        this.actionColor = "red";
        this.snackbar = true;
        this.comment = "";
        this.action = "";
        this.saving = false;
        this.reviewDialog = false;

        setTimeout(() => {
          this.actionMessage = "";
          this.actionColor = "black";
          this.snackbar = false;
        }, 4000);
      }).finally(() => {
        this.$store.dispatch("member/GET_MEMBER", this.$route.params.id);
      });
    }
  },

  mounted() {
    this.$store
      .dispatch("user/GET_STATE")
      .then(() => {
        this.$store.dispatch("member/GET_MEMBER", this.$route.params.id);
        this.$store.dispatch("member/GET_BENEFICIARIES", this.$route.params.id);
        this.$store.dispatch("member/GET_NOK", this.$route.params.id);

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