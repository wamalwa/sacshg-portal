<template>
  <v-app>
    <Navbar
      :userfullname="authUser.name"
      :snackbar="snackbar"
      :actionColor="actionColor"
      :actionMessage="actionMessage"
    />
    <v-main class="ma-4">
      <div class="media">
        <h1 class="subheading text--gray">
          Media
          <v-btn outlined color="primary" @click="dialog = true">
            <v-icon left>mdi-plus</v-icon>
            Upload a File
          </v-btn>
        </h1>

        <v-dialog
          v-model="dialog"
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
              src="https://sacn.univa.co.ke/api/v2/files/bg2.png"
            >
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Upload a File</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-4">
                  <v-col cols="12">
                    <v-file-input
                        v-model="newfile.file"
                        label="File*"
                        outlined
                        show-size
                        dense
                    ></v-file-input>
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
                color="success darken-1"
                :loading="saving"
                :disabled="disabled"
                text
                @click="submitFile"
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

          <v-card>
            <v-toolbar color="cyan" dense dark flat>
              <template>
                <v-tabs v-model="tab" align-with-title>
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab>All Files</v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card flat>
                  <v-card-title>
                      <v-text-field 
                        v-model="search" 
                        outlined 
                        label="Search" 
                        dense
                      ></v-text-field>
                  </v-card-title>
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="uploads"
                      :search="search"
                      :loading="loading"
                      loading-text="Loading... Please wait"
                    >
                    <template #item.actions="{item}">
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            text
                            v-bind="attrs"
                            v-on="on"
                            fab
                            @click="copyURL(item.url)"
                            small
                          > <v-icon>content_copy</v-icon>
                          </v-btn>
                        </template>
                        <span>Click to copy: {{item.url}} to clipboard</span>
                      </v-tooltip>
                    </template>
                    <template #item.preview="{item}" >
                        <v-card class="ma-3" :style="{ height: '100px', width: '144px', overflow: 'hidden', backgroundImage: 'url(' + item.url + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }">
                            
                        </v-card>
                    </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Media",
  components: {
    Navbar,
  },

  data: () => ({
    tab: null,
    search: "",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Url", value: "url" },
      { text: "Size (bytes)", value: "size", filterable: false },
      { text: "Actions", value: "actions", filterable: false },
      { text: "Preview", value: "preview", filterable: false }
    ],
    saving: false,
    disabled: false,
    loading: true,
    dialog: false,
    actionColor: "black",
    actionMessage: "",
    snackbar: false,
    imagetypes: [
      "jpg",
      "jpeg",
      "png",
    ],
    newfile: {
      file: null
    },
    authUser: {
      name: ''
    },
  }),

  computed: {
    ...mapGetters({
      uploads: "upload/UPLOADS",
      authenticated: "user/AUTHENTICATED",
    }),
  },

  methods: {
    submitFile() {
      this.saving = true;
      this.disabled = true;

      let formData = new FormData();

      formData.append("file", this.newfile.file);
      
      axios
        .post("upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.actionMessage =
            "Your file has been uploaded.";
          this.actionColor = "success";
          this.snackbar = true;
          this.saving = false;
          this.dialog = false;
          this.newfile.file = null;

          this.loading = true;

          this.$store.dispatch("upload/GET_FILES").then(() => {
            this.loading = false;
          });
        })
        .catch(() => {
          this.actionMessage =
            "An error occured while uploading the file. Please try again";
          this.actionColor = "red";
          this.snackbar = true;
          this.saving = false;
          this.dialog = false;

          this.newfile.file = null;

        });
    },

    copyURL(url) {
      navigator.clipboard.writeText(url);
    }
  },

  mounted() {
    this.$store.dispatch("upload/GET_FILES").then(() => {
      this.loading = false;
    });

    if(JSON.parse(localStorage.getItem("user"))) {
      this.authUser = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$router.replace({
        name: "login",
      });
    }
  },
};
</script>
