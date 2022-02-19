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
      <div class="users">
        <h1 class="subheading text--gray">
          News
          <v-btn outlined color="primary" @click="dialog = true">
            <v-icon left>mdi-plus</v-icon>
            Add News
          </v-btn>
        </h1>

        <v-dialog v-model="deleteDialog" persistent max-width="400px">
          <v-card outlined>
            <v-card-text class="error--text my-5"
              >Delete
              <b>{{ deleteIndex > -1 ? news[deleteIndex].title : "" }}</b
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
          persistent
          fullscreen
        >
          <v-card>
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
              <v-toolbar-title>Add News</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-3">
                  <v-col cols="12" sm="12" md="8">
                    <v-text-field
                      v-model="newnews.title"
                      label="Title*"
                      outlined
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      v-model="newnews.category"
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      required
                      dense
                      outlined
                      hide-no-data
                      label="Category*"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newnews.main_tag_line"
                      label="Main Tag Line*"
                      outlined
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newnews.secondary_tag_line"
                      label="Secondary Tag Line*"
                      outlined
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newnews.block_quote"
                      label="Block Quote*"
                      outlined
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="newnews.image_url"
                      label="Main Image URL*"
                      outlined
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-img
                      class="grey lighten-4 ma-1 elevation-3 rounded"
                      :src="
                        newnews.image_url != ''
                          ? newnews.image_url
                          : 'https://api.staugustineshg.org/api/v2/files/placeholder.png'
                      "
                    ></v-img>
                  </v-col>
                  <v-col>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      v-model="newnews.body"
                    ></ckeditor>
                  </v-col>
                </v-row>

                <small>*indicates required field</small>
              </v-container>
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
                @click="saveNews"
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

          <v-col v-for="(item, index) in news" :key="item.id" cols="12">
            <v-card color="cyan--text" outlined hover>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                    v-text="item.title"
                  ></v-card-title>

                  <v-card-subtitle
                    v-text="item.main_tag_line"
                  ></v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-5"
                      color="cyan"
                      dark
                      rounded
                      small
                      @click="editNews(index)"
                    >
                      <v-icon left>mdi-pencil</v-icon>
                      Edit
                    </v-btn>
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      color="error"
                      @click="deleteNews(index)"
                    >
                      <v-icon left>mdi-delete-outline</v-icon>
                      Delete
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="item.image_url"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
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
  name: "News",
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
    editIndex: -1,
    deleteIndex: -1,
    deleteDialog: false,
    deleting: false,
    saving: false,
    disabled: false,
    loading: true,
    dialog: false,
    actionColor: "black",
    actionMessage: "",
    snackbar: false,
    newnews: {
      id: null,
      title: "",
      category: "",
      main_tag_line: "",
      secondary_tag_line: "",
      block_quote: "",
      image_url: "",
      body: "",
    },
    authUser: {
      name: "",
    },
  }),

  computed: {
    ...mapGetters({
      news: "news/NEWS",
      categories: "category/CATEGORIES",
      authenticated: "user/AUTHENTICATED",
    }),
  },

  methods: {
    ...mapActions({
      addNews: "news/SAVE_NEWS",
      updateNews: "news/EDIT_NEWS",
      deleteNewsV: "news/DELETE_NEWS",
    }),
    deleteNews(index) {
      this.deleteIndex = index;
      this.deleteDialog = true;
    },
    cancelDelete() {
      this.deleteIndex = -1;
      this.deleteDialog = false;
    },
    confirmDelete() {
      this.deleting = true;

      this.deleteNewsV({
        index: this.deleteIndex,
        data: { id: this.news[this.deleteIndex].id },
      })
        .then(() => {
          this.actionMessage = "News Item delete successfully";
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
    editNews(index) {
      this.editIndex = index;
      this.newnews = this.news[index];
      this.dialog = true;
    },
    clearForm() {
      this.editIndex = -1;
      this.newnews = {
        id: null,
        title: "",
        category: "",
        main_tag_line: "",
        secondary_tag_line: "",
        block_quote: "",
        image_url: "",
        body: "",
      };
    },
    saveNews() {
      this.saving = true;

      if (this.editIndex > -1) {
        this.updateNews({
          index: this.editIndex,
          data: this.newnews,
        })
          .then(() => {
            this.actionMessage =
              "You have successfully updated " + this.newnews.title;
            this.actionColor = "success";
            this.snackbar = true;
            this.newnews = {
              id: null,
              title: "",
              category: "",
              main_tag_line: "",
              secondary_tag_line: "",
              block_quote: "",
              image_url: "",
              body: "",
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
              "An error occured when updating " + this.newnews.name;
            this.actionColor = "red";
            this.snackbar = true;
            this.newnews = {
              id: null,
              title: "",
              category: "",
              main_tag_line: "",
              secondary_tag_line: "",
              block_quote: "",
              image_url: "",
              body: "",
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
        this.addNews(this.newnews)
          .then(() => {
            this.actionMessage =
              "You have successfully reported " + this.newnews.title;
            this.actionColor = "success";
            this.snackbar = true;
            this.newnews = {
              id: null,
              title: "",
              category: "",
              main_tag_line: "",
              secondary_tag_line: "",
              block_quote: "",
              image_url: "",
              body: "",
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
              this.newnews.name +
              " to SACSHG users.";
            this.actionColor = "red";
            this.snackbar = true;
            this.newnews = {
              id: null,
              title: "",
              category: "",
              main_tag_line: "",
              secondary_tag_line: "",
              block_quote: "",
              image_url: "",
              body: "",
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
  },

  mounted() {
    this.$store
      .dispatch("user/GET_STATE")
      .then(() => {
        this.$store.dispatch("news/GET_NEWS").then(() => {
          this.loading = false;
        });

        this.$store.dispatch("category/GET_CATEGORIES");

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
