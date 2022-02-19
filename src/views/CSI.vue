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
      <div class="csi">
        <h1 class="subheading text--gray">
          CSI
          <v-btn outlined color="primary" @click="dialog = true">
            <v-icon left>mdi-plus</v-icon>
            Add CSI
          </v-btn>
        </h1>

        <v-dialog v-model="deleteDialog" persistent max-width="400px">
          <v-card outlined>
            <v-card-text class="error--text my-5"
              >Delete
              <b>{{ deleteIndex > -1 ? csis[deleteIndex].title : "" }}</b
              >?<br /><small
                >This activity cannot be undone once you click 'Delete'
                below.</small
              ></v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                text
                small
                @click="cancelDelete"
                v-if="!deleting"
              >
                <v-icon left>mdi-close</v-icon> Cancel</v-btn
              >
              <v-btn
                color="error ml-3"
                text
                small
                @click="confirmDelete"
                :loading="deleting"
              >
                <v-icon left>mdi-delete</v-icon> Delete</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          scrollable
          max-width="1024px"
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
              <v-btn
                icon
                dark
                @click="
                  dialog = false;
                  clearForm();
                "
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add CSI</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-4">
                  <v-col cols="12">
                    <v-text-field
                      v-model="newcsi.title"
                      label="CSI Title*"
                      outlined
                      dense
                      prepend-icon="mdi-title"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="newcsi.description"
                      label="CSI Description*"
                      hint="A few lines about the csi"
                      outlined
                      prepend-icon="mdi-semantic-web"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="newcsi.main_image_url"
                      label="Image URL"
                      prepend-icon="mdi-link"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-img
                      class="grey lighten-4 ma-1 elevation-3 rounded"
                      :src="
                        newcsi.main_image_url != ''
                          ? newcsi.main_image_url
                          : 'https://api.staugustineshg.org/api/v2/files/placeholder.png'
                      "
                    ></v-img>
                  </v-col>
                  <v-col>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      v-model="newcsi.story"
                    ></ckeditor>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error darken-1"
                text
                @click="
                  dialog = false;
                  clearForm();
                "
              >
                Close
              </v-btn>
              <v-btn
                color="success darken-1"
                :loading="saving"
                :disabled="disabled"
                text
                @click="saveCsi"
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
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-card
            outlined
            hover
            tile
            v-for="(csi, index) in csis"
            :key="csi.id"
            class="ma-3"
          >
            <v-card-text class="d-flex flex-wrap pa-0">
              <v-col sm="12" md="8">
                <h3>{{ csi.title }}</h3>
                <p>{{ csi.description }}</p>

                <v-row class="mt-5">
                  <v-col>
                    <v-btn
                      dark
                      color="cyan"
                      rounded
                      small
                      class="mr-3"
                      @click="editCsi(index)"
                    >
                      <v-icon left>mdi-pencil</v-icon>
                      Edit
                    </v-btn>

                    <v-btn
                      dark
                      color="error"
                      outlined
                      rounded
                      small
                      @click="deleteCsi(index)"
                    >
                      <v-icon left>mdi-delete</v-icon>
                      Delete
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col sm="12" md="2" class="pa-0">
                <v-img :src="csi.main_image_url"></v-img>
              </v-col>
            </v-card-text>
          </v-card>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapGetters, mapActions } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "CSI",
  components: {
    Navbar,
  },

  data: () => ({
    editor: ClassicEditor,
    editorConfig: {
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "blockQuote",
      ],
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
        ],
      },
    },
    editorData: "",
    saving: false,
    disabled: false,
    loading: true,
    dialog: false,
    modal: false,
    modal2: false,
    editIndex: -1,
    deleteIndex: -1,
    deleteDialog: false,
    deleting: false,
    actionColor: "black",
    actionMessage: "",
    snackbar: false,
    months: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    newcsi: {
      id: null,
      title: "",
      description: "",
      main_image_url: "",
      story: "",
    },
    authUser: {
      name: "",
    },
  }),

  computed: {
    ...mapGetters({
      csis: "csi/CSI",
      authenticated: "user/AUTHENTICATED",
    }),
  },

  methods: {
    ...mapActions({
      addCsi: "csi/SAVE_CSI",
      deleteCsiV: "csi/DELETE_CSI",
      updateCsi: "csi/EDIT_CSI",
    }),
    deleteCsi(index) {
      this.deleteIndex = index;
      this.deleteDialog = true;
    },
    cancelDelete() {
      this.deleteIndex = -1;
      this.deleteDialog = false;
    },
    confirmDelete() {
      this.deleting = true;

      this.deleteCsiV({
        index: this.deleteIndex,
        data: { id: this.csis[this.deleteIndex].id },
      })
        .then(() => {
          this.actionMessage = "CSI deleted successfully";
          this.actionColor = "success";
          this.snackbar = true;
          this.deleteIndex = -1;
          this.deleting = false;
          this.deleteDialog = false;

          setTimeout(() => {
            this.actionMessage = "";
            this.actionColor = "black";
            this.snackbar = false;
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          this.actionMessage = "An error occured when deleting.";
          this.actionColor = "red";
          this.snackbar = true;
          this.deleteIndex = -1;
          this.deleting = false;
          this.deleteDialog = false;

          setTimeout(() => {
            this.actionMessage = "";
            this.actionColor = "black";
            this.snackbar = false;
          }, 4000);
        });
    },
    editCsi(index) {
      this.editIndex = index;
      this.newcsi = this.csis[index];
      this.dialog = true;
    },
    clearForm() {
      this.editIndex = -1;
      this.newcsi = {
        id: null,
        title: "",
        description: "",
        main_image_url: "",
        story: "",
      };
    },
    saveCsi() {
      this.saving = true;

      if (this.editIndex > -1) {
        this.updateCsi({
          index: this.editIndex,
          data: this.newcsi,
        })
          .then(() => {
            this.actionMessage =
              "You have successfully updated the csi " + this.newcsi.title;
            this.actionColor = "success";
            this.snackbar = true;
            this.newcsi = {
              id: null,
              title: "",
              description: "",
              main_image_url: "",
              story: "",
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
              "An error occured when updating csi " + this.newcsi.title;
            this.actionColor = "red";
            this.snackbar = true;
            this.newcsi = {
              id: null,
              title: "",
              description: "",
              main_image_url: "",
              story: "",
            };
            this.saving = false;
            this.dialog = false;

            setTimeout(() => {
              this.actionMessage = "";
              this.actionColor = "black";
              this.snackbar = false;
            }, 4000);
          });
      } else {
        this.addCsi(this.newcsi)
          .then(() => {
            this.actionMessage =
              "You have successfully added the csi " + this.newcsi.title;
            this.actionColor = "success";
            this.snackbar = true;
            this.newcsi = {
              id: null,
              title: "",
              description: "",
              main_image_url: "",
              story: "",
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
              "An error occured when adding csi " + this.newcsi.title;
            this.actionColor = "red";
            this.snackbar = true;
            this.newcsi = {
              id: null,
              title: "",
              description: "",
              main_image_url: "",
              story: "",
            };
            this.saving = false;
            this.dialog = false;

            setTimeout(() => {
              this.actionMessage = "";
              this.actionColor = "black";
              this.snackbar = false;
            }, 4000);
          });
      }
    },
    amOrPm(tm) {
      var hr = tm.split(":")[0];
      var min = tm.split(":")[1];

      if (hr >= 0 && hr <= 24 && min >= 0 && min <= 60) {
        let postF = "AM";
        if (hr > 12) postF = "PM";
        hr = hr % 12;
        return hr + ":" + min + " " + postF;
      }
    },
    ordinalDay(n) {
      var s = ["TH", "ST", "ND", "RD"],
        v = n % 100;
      return String(n).padStart(2, "0") + (s[(v - 20) % 10] || s[v] || s[0]);
    },
  },

  mounted() {
    this.$store
      .dispatch("user/GET_STATE")
      .then(() => {
        this.$store.dispatch("csi/GET_CSI").then(() => {
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
