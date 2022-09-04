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
      <div class="events">
        <h1 class="subheading text--gray">Settings</h1>

        <v-dialog
            v-model="dialog"
            max-width="1024px"
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
              <v-btn
                  dark
                  icon
                  @click="
                  dialog = false;
                  clearForm();
                "
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add Carousel Item</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-4">
                  <v-col class="col-md-6" cols="12">
                    <v-text-field
                        v-model="newcarousel.image_url"
                        dense
                        label="Image URL*"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-img
                        :src="
                        newcarousel.image_url != ''
                          ? newcarousel.image_url
                          : 'https://api.staugustineshg.org/api/v2/files/placeholder.png'
                      "
                        class="grey lighten-4 ma-1 elevation-3 rounded"
                    ></v-img>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        v-model="newcarousel.image_caption"
                        dense
                        label="Image Caption*"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        v-model="newcarousel.tag_line"
                        dense
                        label="Tag Line*"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                        v-model="newcarousel.cta_btn_text"
                        dense
                        label="Button Text*"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                        v-model="newcarousel.cta_btn_url"
                        dense
                        label="Button URL*"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                        v-model="newcarousel.cta_btn_icon"
                        :items="icons"
                        dense
                        hide-no-data
                        hint="Go to https://linearicons.com/ to see the list of icons. Here we use the icons without the lnr- prefix"
                        label="Button Icon*"
                        outlined
                        required
                    ></v-autocomplete>
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
                  :disabled="disabled"
                  :loading="saving"
                  color="success darken-1"
                  text
                  @click="saveCarousel"
              >
                <v-icon left>mdi-content-save-edit-outline</v-icon>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
            v-model="faqDialog"
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
              <v-btn dark icon @click="faqDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add FAQ</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-4">
                  <v-col cols="12">
                    <v-text-field
                        v-model="newfaq.question"
                        dense
                        label="Frequently Asked Question*"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                        v-model="newfaq.answer"
                        dense
                        label="Answer*"
                        outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" text @click="faqDialog = false">
                Close
              </v-btn>
              <v-btn
                  :disabled="disabled"
                  :loading="saving"
                  color="success darken-1"
                  text
                  @click="saveFaq"
              >
                <v-icon left>mdi-content-save-edit-outline</v-icon>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
            v-model="productDialog"
            fullscreen
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
              <v-btn dark icon @click="productDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add Product</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-4">
                  <v-col cols="12" md="5">
                    <v-img
                        :src="
                        newproduct.image != ''
                          ? newproduct.image
                          : 'https://api.staugustineshg.org/api/v2/files/placeholder.png'
                      "
                        class="grey lighten-4 ma-1 elevation-3 rounded"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                        v-model="newproduct.image"
                        dense
                        label="Image URL*"
                        outlined
                        required
                    ></v-text-field>
                    <v-autocomplete
                        v-model="newproduct.service"
                        :items="services"
                        dense
                        hide-no-data
                        item-text="name"
                        item-value="id"
                        label="Service*"
                        outlined
                        required
                    ></v-autocomplete>
                    <v-text-field
                        v-model="newproduct.name"
                        dense
                        label="Product Name*"
                        outlined
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="newproduct.description"
                        dense
                        height="115"
                        label="Description*"
                        outlined
                    ></v-textarea>
                  </v-col>
                  <v-col cols="11" md="11">
                    <h3 class="mb-3">Product Additional Info</h3>
                    <quillEditor v-model="newproduct.additionalinfo"/>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" text @click="productDialog = false">
                Close
              </v-btn>
              <v-btn
                  :disabled="disabled"
                  :loading="saving"
                  color="success darken-1"
                  text
                  @click="saveProduct"
              >
                <v-icon left>mdi-content-save-edit-outline</v-icon>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
            v-model="servicesDialog"
            max-width="700px"
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
              <v-btn dark icon @click="servicesDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add Service</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-4">
                  <v-col cols="12" md="4">
                    <v-autocomplete
                        v-model="newservice.icon"
                        :items="icons"
                        dense
                        hide-no-data
                        hint="Go to https://linearicons.com/ to see the list of icons. Here we use the icons without the lnr- prefix"
                        label="Service Icon*"
                        outlined
                        persistent-hint
                        required
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                        v-model="newservice.name"
                        dense
                        label="Service Name*"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        v-model="newservice.description"
                        dense
                        label="Service Description*"
                        outlined
                        required
                    ></v-text-field>
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
                  @click="servicesDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                  :disabled="disabled"
                  :loading="saving"
                  color="success darken-1"
                  text
                  @click="saveService"
              >
                <v-icon left>mdi-content-save-edit-outline</v-icon>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
            v-model="testimonialsDialog"
            max-width="700px"
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
              <v-btn dark icon @click="testimonialsDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add Testimonial</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-4">
                  <v-col cols="12" md="7">
                    <v-text-field
                        v-model="newtestimonial.name"
                        dense
                        label="Name of Client*"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field
                        v-model="newtestimonial.designation"
                        dense
                        label="Designation*"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-text-field
                        v-model="newtestimonial.avatar"
                        dense
                        label="Avatar URL*"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-avatar>
                      <v-img
                          :src="
                          newtestimonial.avatar != ''
                            ? newtestimonial.avatar
                            : 'https://api.staugustineshg.org/api/v2/files/placeholder.png'
                        "
                          class="grey lighten-4 ma-1 elevation-3 rounded"
                      ></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                        v-model="newtestimonial.message"
                        dense
                        label="Message*"
                        outlined
                    ></v-textarea>
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
                  @click="testimonialsDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                  :disabled="disabled"
                  :loading="saving"
                  color="success darken-1"
                  text
                  @click="saveTestimonial"
              >
                <v-icon left>mdi-content-save-edit-outline</v-icon>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-skeleton-loader
            v-if="loading"
            :transition="transition"
            class="ma-5"
            height="300"
            type="card"
        ></v-skeleton-loader>

        <v-container v-else class="my-5">
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

          <v-card>
            <v-toolbar color="cyan" dark dense flat>
              <template>
                <v-tabs v-model="tab" align-with-title>
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab>Carousel</v-tab>
                  <v-tab>General Information</v-tab>
                  <v-tab>Our Services</v-tab>
                  <v-tab>Products</v-tab>
                  <v-tab>Testimonials</v-tab>
                  <v-tab>FAQ</v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-dialog
                        v-model="deleteCarouselDialog"
                        max-width="400px"
                        persistent
                    >
                      <v-card outlined>
                        <v-card-text class="error--text my-5"
                        >Delete
                          <b>{{
                              deleteCarouselIndex > -1
                                  ? carousels[deleteCarouselIndex].image_caption
                                  : ""
                            }}</b
                          >?<br/><small
                          >This activity cannot be undone once you click
                            'Delete' below.</small
                          ></v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              v-if="!deleting"
                              color="success"
                              small
                              text
                              @click="cancelDeleteCarousel"
                          >
                            <v-icon left>mdi-close</v-icon>
                            Cancel
                          </v-btn
                          >
                          <v-btn
                              :loading="deleting"
                              color="error ml-3"
                              small
                              text
                              @click="confirmDeleteCarousel"
                          >
                            <v-icon left>mdi-delete</v-icon>
                            Delete
                          </v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <h2 class="subheading text--gray">
                      Carousel Items
                      <v-btn color="primary" outlined @click="dialog = true">
                        <v-icon left>mdi-plus</v-icon>
                        Add Item
                      </v-btn>
                    </h2>

                    <v-row class="mt-4">
                      <draggable v-model="carousels" group="people" @end="drag=false" @start="drag=true">
                        <!--                        <div v-for="element in myArray" :key="element.id">{{element.name}}</div>-->
                        <!--                      -->
                        <v-col
                            cols="12"
                            v-for="(carousel, index) in carousels"
                            :key="carousel.id"
                        >
                          <v-card hover outlined>
                            <v-card-text>
                              <h3>{{ carousel.image_caption }}</h3>
                              <i>{{ carousel.tag_line }}</i>
                            </v-card-text>
                            <v-card-actions>
                              <v-btn
                                  class="ml-2"
                                  color="primary"
                                  outlined
                                  rounded
                                  small
                                  @click="editCarousel(index)"
                              >
                                <v-icon left>mdi-pencil</v-icon>
                                Edit
                              </v-btn>
                              <v-btn
                                  class="ml-2"
                                  color="error"
                                  outlined
                                  rounded
                                  small
                                  @click="deleteCarousel(index)"
                              >
                                <v-icon left>mdi-delete-outline</v-icon>
                                Delete
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-col>
                      </draggable>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <h2 class="subheading text--gray">
                      General Website Information
                      <v-btn
                          :disabled="editing"
                          color="primary"
                          outlined
                          @click="activateEdit()"
                      >
                        <v-icon left>mdi-pencil</v-icon>
                        Edit
                      </v-btn>
                    </h2>
                    <v-row v-if="editing" class="mt-3">
                      <v-col cols="12">
                        <v-card hover outlined>
                          <fullscreen
                              ref="fullscreen"
                              class="white"
                              @change="fullscreenChange"
                          >
                            <v-card-title>
                              <v-spacer></v-spacer>
                              <v-btn
                                  :loading="saving"
                                  color="success"
                                  text
                                  @click="saveComponents()"
                              >
                                <v-icon color="success" left
                                >mdi-content-save
                                </v-icon
                                >
                                Save
                              </v-btn>

                              <v-btn
                                  :loading="loading"
                                  color="error"
                                  text
                                  @click="discardChanges()"
                              >
                                <v-icon color="error" left>mdi-delete</v-icon>
                                Discard
                              </v-btn>

                              <v-btn color="primary" text @click="toggle"
                              >
                                <v-icon color="primary" left
                                >mdi-fullscreen
                                </v-icon
                                >
                                Fullscreen
                              </v-btn
                              >
                            </v-card-title>
                            <v-card-text>
                              <v-row>
                                <v-col cols="12">
                                  <v-textarea
                                      v-model="editwebsite.about"
                                      dense
                                      label="About Us*"
                                      outlined
                                  ></v-textarea>
                                </v-col>
                                <v-col cols="12" md="6">
                                  <v-textarea
                                      v-model="editwebsite.mission"
                                      dense
                                      label="Our Mission*"
                                      outlined
                                  ></v-textarea>
                                </v-col>
                                <v-col cols="12" md="6">
                                  <v-textarea
                                      v-model="editwebsite.vision"
                                      dense
                                      label="Our Vision*"
                                      outlined
                                  ></v-textarea>
                                </v-col>
                                <v-col cols="12" md="4">
                                  <v-text-field
                                      v-model="editwebsite.address"
                                      dense
                                      label="Address*"
                                      outlined
                                      required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                  <v-text-field
                                      v-model="editwebsite.phone"
                                      dense
                                      label="Phone Number*"
                                      outlined
                                      required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                  <v-text-field
                                      v-model="editwebsite.email"
                                      dense
                                      label="Email Address*"
                                      outlined
                                      required
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <small
                              >* Use semicolon(;) to separate multiple entries
                                for address, phone and email. E.g. St. Augustine
                                Catholic Church Juja; Gachororo Road; Opposite
                                JKUAT</small
                              >
                            </v-card-text>
                          </fullscreen>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row v-else class="mt-3">
                      <v-col cols="12">
                        <v-card outlined>
                          <v-card-text>
                            <v-row>
                              <v-col cols="12">
                                <v-card flat>
                                  <v-card-title><h4>About Us</h4></v-card-title>
                                  <v-card-text
                                      v-html="website.about"
                                  ></v-card-text>
                                </v-card>
                              </v-col>

                              <v-col cols="12" md="6">
                                <v-card flat>
                                  <v-card-title
                                  ><h5>Our Mission</h5></v-card-title
                                  >
                                  <v-card-text
                                      v-html="website.mission"
                                  ></v-card-text>
                                </v-card>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-card flat>
                                  <v-card-title
                                  ><h5>Our Vision</h5></v-card-title
                                  >
                                  <v-card-text
                                      v-html="website.vision"
                                  ></v-card-text>
                                </v-card>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-card flat>
                                  <v-card-title
                                  ><h6>Our Address</h6></v-card-title
                                  >
                                  <v-card-text
                                      v-html="splitAddress(website.address)"
                                  ></v-card-text>
                                </v-card>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-card flat>
                                  <v-card-title
                                  ><h6>Our Phone Numbers</h6></v-card-title
                                  >
                                  <v-card-text
                                      v-html="splitAddress(website.phone)"
                                  ></v-card-text>
                                </v-card>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-card flat>
                                  <v-card-title
                                  ><h6>Our Email Address</h6></v-card-title
                                  >
                                  <v-card-text
                                      v-html="splitAddress(website.email)"
                                  ></v-card-text>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-dialog
                        v-model="deleteServiceDialog"
                        max-width="400px"
                        persistent
                    >
                      <v-card outlined>
                        <v-card-text class="error--text my-5"
                        >Delete
                          <b>{{
                              deleteServiceIndex > -1
                                  ? services[deleteServiceIndex].name
                                  : ""
                            }}</b
                          >?<br/><small
                          >This activity cannot be undone once you click
                            'Delete' below.</small
                          ></v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              v-if="!deleting"
                              color="success"
                              small
                              text
                              @click="cancelDeleteService"
                          >
                            <v-icon left>mdi-close</v-icon>
                            Cancel
                          </v-btn
                          >
                          <v-btn
                              :loading="deleting"
                              color="error ml-3"
                              small
                              text
                              @click="confirmDeleteService"
                          >
                            <v-icon left>mdi-delete</v-icon>
                            Delete
                          </v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <h2 class="subheading text--gray">
                      Our Services
                      <v-btn
                          color="primary"
                          outlined
                          @click="servicesDialog = true"
                      >
                        <v-icon left>mdi-plus</v-icon>
                        Add Service
                      </v-btn>
                    </h2>

                    <v-row class="mt-3">
                      <v-col
                          v-for="(svc, index) in services"
                          :key="svc.id"
                          md="4"
                      >
                        <v-card hover outlined>
                          <v-card-text>
                            <h3>{{ svc.name }}</h3>
                            <p>{{ svc.description }}</p>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn
                                class="ml-2"
                                color="primary"
                                outlined
                                rounded
                                small
                                @click="editService(index)"
                            >
                              <v-icon left>mdi-pencil</v-icon>
                              Edit
                            </v-btn>

                            <v-btn
                                class="ml-2"
                                color="error"
                                outlined
                                rounded
                                small
                                @click="deleteService(index)"
                            >
                              <v-icon left>mdi-delete-outline</v-icon>
                              Delete
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-dialog
                        v-model="deleteProductDialog"
                        max-width="400px"
                        persistent
                    >
                      <v-card outlined>
                        <v-card-text class="error--text my-5"
                        >Delete
                          <b>{{
                              deleteProductIndex > -1
                                  ? products[deleteProductIndex].name
                                  : ""
                            }}</b
                          >?<br/><small
                          >This activity cannot be undone once you click
                            'Delete' below.</small
                          ></v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              v-if="!deleting"
                              color="success"
                              small
                              text
                              @click="cancelDeleteProduct"
                          >
                            <v-icon left>mdi-close</v-icon>
                            Cancel
                          </v-btn
                          >
                          <v-btn
                              :loading="deleting"
                              color="error ml-3"
                              small
                              text
                              @click="confirmDeleteProduct"
                          >
                            <v-icon left>mdi-delete</v-icon>
                            Delete
                          </v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <h2 class="subheading text--gray">
                      Products
                      <v-btn
                          color="primary"
                          outlined
                          @click="productDialog = true"
                      >
                        <v-icon left>mdi-plus</v-icon>
                        Add Product
                      </v-btn>
                    </h2>

                    <v-row class="mt-3">
                      <v-col
                          v-for="(product, index) in products"
                          :key="product.id"
                          cols="12"
                          md="6"
                      >
                        <v-card hover outlined>
                          <v-card-text>
                            <h3>{{ product.name }}</h3>
                            <v-chip
                                v-if="product.service > 0"
                                class="my-2 pa-1"
                                color="cyan"
                                outlined
                                x-small
                            >
                              {{ product.servicename }}
                            </v-chip>
                            <p>{{ product.description }}</p>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn
                                class="ml-2"
                                color="primary"
                                outlined
                                rounded
                                small
                                @click="editProduct(index)"
                            >
                              <v-icon left>mdi-pencil</v-icon>
                              Edit
                            </v-btn>

                            <v-btn
                                class="ml-2"
                                color="error"
                                outlined
                                rounded
                                small
                                @click="deleteProduct(index)"
                            >
                              <v-icon left>mdi-delete-outline</v-icon>
                              Delete
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-dialog
                        v-model="deleteTestimonialDialog"
                        max-width="400px"
                        persistent
                    >
                      <v-card outlined>
                        <v-card-text class="error--text my-5"
                        >Delete
                          <b>{{
                              deleteTestimonialIndex > -1
                                  ? testimonials[deleteTestimonialIndex].name
                                  : ""
                            }}</b
                          >?<br/><small
                          >This activity cannot be undone once you click
                            'Delete' below.</small
                          ></v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              v-if="!deleting"
                              color="success"
                              small
                              text
                              @click="cancelDeleteTestimonial"
                          >
                            <v-icon left>mdi-close</v-icon>
                            Cancel
                          </v-btn
                          >
                          <v-btn
                              :loading="deleting"
                              color="error ml-3"
                              small
                              text
                              @click="confirmDeleteTestimonial"
                          >
                            <v-icon left>mdi-delete</v-icon>
                            Delete
                          </v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <h2 class="subheading text--gray">
                      Testimonials
                      <v-btn
                          color="primary"
                          outlined
                          @click="testimonialsDialog = true"
                      >
                        <v-icon left>mdi-plus</v-icon>
                        Add Testimonial
                      </v-btn>
                    </h2>

                    <v-row class="mt-3">
                      <v-col
                          v-for="(testimonial, index) in testimonials"
                          :key="testimonial.id"
                          md="12"
                      >
                        <v-card hover outlined>
                          <v-card-text>
                            <h3>{{ testimonial.name }}</h3>
                            <p>{{ testimonial.message }}</p>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn
                                class="ml-2"
                                color="primary"
                                outlined
                                rounded
                                small
                                @click="editTestimonial(index)"
                            >
                              <v-icon left>mdi-pencil</v-icon>
                              Edit
                            </v-btn>

                            <v-btn
                                class="ml-2"
                                color="error"
                                outlined
                                rounded
                                small
                                @click="deleteTestimonial(index)"
                            >
                              <v-icon left>mdi-delete-outline</v-icon>
                              Delete
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-dialog
                        v-model="deleteFaqDialog"
                        max-width="400px"
                        persistent
                    >
                      <v-card outlined>
                        <v-card-text class="error--text my-5"
                        >Delete
                          <b>{{
                              deleteFaqIndex > -1
                                  ? faqs[deleteFaqIndex].question
                                  : ""
                            }}</b
                          >?<br/><small
                          >This activity cannot be undone once you click
                            'Delete' below.</small
                          ></v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              v-if="!deleting"
                              color="success"
                              small
                              text
                              @click="cancelDeleteFaq"
                          >
                            <v-icon left>mdi-close</v-icon>
                            Cancel
                          </v-btn
                          >
                          <v-btn
                              :loading="deleting"
                              color="error ml-3"
                              small
                              text
                              @click="confirmDeleteFaq"
                          >
                            <v-icon left>mdi-delete</v-icon>
                            Delete
                          </v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <h2 class="subheading text--gray">
                      FAQs
                      <v-btn color="primary" outlined @click="faqDialog = true">
                        <v-icon left>mdi-plus</v-icon>
                        Add FAQ
                      </v-btn>
                    </h2>

                    <v-row class="mt-3">
                      <v-col v-for="(faq, index) in faqs" :key="faq.id" md="12">
                        <v-card hover outlined>
                          <v-card-text>
                            <h3>{{ faq.question }}</h3>
                            <p>{{ faq.answer }}</p>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn
                                class="ml-2"
                                color="primary"
                                outlined
                                rounded
                                small
                                @click="editFaq(index)"
                            >
                              <v-icon left>mdi-pencil</v-icon>
                              Edit
                            </v-btn>

                            <v-btn
                                class="ml-2"
                                color="error"
                                outlined
                                rounded
                                small
                                @click="deleteFaq(index)"
                            >
                              <v-icon left>mdi-delete-outline</v-icon>
                              Delete
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
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
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Navbar from "@/components/Navbar";
import {mapActions, mapGetters} from "vuex";
// import Editor from "@tinymce/tinymce-vue";
import {quillEditor} from "vue-quill-editor";
import draggable from 'vuedraggable';

export default {
  name: "Settings",
  components: {
    Navbar,
    quillEditor,
    draggable,
    // 'editor': Editor
  },

  data: () => ({
    editorConfig: {
      uiColor: "#F7B42C",
      toolbar: [
        "undo",
        "redo",
        "bold",
        "italic",
        "blockQuote",
        "ckfinder",
        "imageTextAlternative",
        "heading",
        "imageStyle:full",
        "imageStyle:side",
        "link",
        "numberedList",
        "bulletedList",
        "mediaEmbed",
        "insertTable",
        "tableColumn",
        "tableRow",
        "mergeTableCells",
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
    tab: 0,
    editing: false,
    text: "center",
    fullscreen: false,
    transition: "scale-transition",
    transitions: [
      {
        text: "None",
        value: undefined,
      },
      {
        text: "Fade Transition",
        value: "fade-transition",
      },
      {
        text: "Scale Transition",
        value: "scale-transition",
      },
    ],
    items: ["web", "shopping", "videos", "images", "news"],
    icons: [
      "home",
      "apartment",
      "pencil",
      "magic-wand",
      "drop",
      "lighter",
      "poop",
      "sun",
      "moon",
      "cloud",
      "cloud-upload",
      "cloud-download",
      "cloud-sync",
      "cloud-check",
      "database",
      "lock",
      "cog",
      "trash",
      "dice",
      "heart",
      "star",
      "star-half",
      "star-empty",
      "flag",
      "envelope",
      "paperclip",
      "inbox",
      "eye",
      "printer",
      "file-empty",
      "file-add",
      "enter",
      "exit",
      "graduation-hat",
      "license",
      "music-note",
      "film-play",
      "camera-video",
      "camera",
      "picture",
      "book",
      "bookmark",
      "user",
      "users",
      "shirt",
      "store",
      "cart",
      "tag",
      "phone-handset",
      "phone",
      "pushpin",
      "map-marker",
      "map",
      "location",
      "calendar-full",
      "keyboard",
      "spell-check",
      "screen",
      "smartphone",
      "tablet",
      "laptop",
      "laptop-phone",
      "power-switch",
      "bubble",
      "heart-pulse",
      "construction",
      "pie-chart",
      "chart-bars",
      "gift",
      "diamond",
      "linearicons",
      "dinner",
      "coffee-cup",
      "leaf",
      "paw",
      "rocket",
      "briefcase",
      "bus",
      "car",
      "train",
      "bicycle",
      "wheelchair",
      "select",
      "earth",
      "smile",
      "sad",
      "neutral",
      "mustache",
      "alarm",
      "bullhorn",
      "volume-high",
      "volume-medium",
      "volume-low",
      "volume",
      "mic",
      "hourglass",
      "undo",
      "redo",
      "sync",
      "history",
      "clock",
      "download",
      "upload",
      "enter-down",
      "exit-up",
      "bug",
      "code",
      "link",
      "unlink",
      "thumbs-up",
      "thumbs-down",
      "magnifier",
      "cross",
      "menu",
      "list",
      "chevron-up",
      "chevron-down",
      "chevron-left",
      "chevron-right",
      "arrow-up",
      "arrow-down",
      "arrow-left",
      "arrow-right",
      "move",
      "warning",
      "question-circle",
      "menu-circle",
      "checkmark-circle",
      "cross-circle",
      "plus-circle",
      "circle-minus",
      "arrow-up-circle",
      "arrow-down-circle",
      "arrow-left-circle",
      "arrow-right-circle",
      "chevron-up-circle",
      "chevron-down-circle",
      "chevron-left-circle",
      "chevron-right-circle",
      "crop",
      "frame-expand",
      "frame-contract",
      "layers",
      "funnel",
      "text-format",
      "text-format-remove",
      "text-size",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "highlight",
      "text-align-left",
      "text-align-center",
      "text-align-right",
      "text-align-justify",
      "line-spacing",
      "indent-increase",
      "indent-decrease",
      "pilcrow",
      "direction-ltr",
      "direction-rtl",
      "page-break",
      "sort-alpha-asc",
      "sort-amount-asc",
      "hand",
      "pointer-up",
      "pointer-right",
      "pointer-down",
      "pointer-left",
    ],
    saving: false,
    disabled: false,
    loading: true,
    dialog: false,
    faqDialog: false,
    productDialog: false,
    servicesDialog: false,
    testimonialsDialog: false,
    modal: false,
    modal2: false,
    deleteCarouselIndex: -1,
    deleteCarouselDialog: false,
    deleteServiceIndex: -1,
    deleteServiceDialog: false,
    deleteTestimonialIndex: -1,
    deleteTestimonialDialog: false,
    deleteFaqIndex: -1,
    deleteFaqDialog: false,
    deleteProductIndex: -1,
    deleteProductDialog: false,
    deleting: false,
    actionColor: "black",
    actionMessage: "",
    snackbar: false,
    editCarouselIndex: -1,
    editServiceIndex: -1,
    editTestimonialIndex: -1,
    editFaqIndex: -1,
    editProductIndex: -1,
    editwebsite: {
      about: "",
      mission: "",
      vision: "",
      address: "",
      phone: "",
      email: "",
    },
    newcarousel: {
      id: null,
      image_url: "",
      image_caption: "",
      tag_line: "",
      cta_btn_text: "",
      cta_btn_icon: "",
      cta_btn_url: "",
    },
    newfaq: {
      id: null,
      question: "",
      answer: "",
    },
    newproduct: {
      id: null,
      image: "",
      name: "",
      description: "",
      additionalinfo: "",
      service: -1,
    },
    newservice: {
      id: null,
      icon: "",
      name: "",
      description: "",
    },
    newtestimonial: {
      id: null,
      avatar: "",
      name: "",
      designation: "",
      message: "",
    },
    authUser: {
      name: "",
    },
  }),

  computed: {
    ...mapGetters({
      carousels: "landing/CAROUSELS",
      faqs: "landing/FAQS",
      products: "landing/PRODUCTS",
      website: "landing/WEBSITE",
      services: "landing/SERVICES",
      testimonials: "landing/TESTIMONIALS",
      authenticated: "user/AUTHENTICATED",
    }),
  },

  methods: {
    ...mapActions({
      addCarousel: "landing/SAVE_CAROUSEL",
      updateCarousel: "landing/EDIT_CAROUSEL",
      deleteCarouselV: "landing/DELETE_CAROUSEL",
      addFaq: "landing/SAVE_FAQ",
      updateFaq: "landing/EDIT_FAQ",
      deleteFaqV: "landing/DELETE_FAQ",
      addProduct: "landing/SAVE_PRODUCT",
      updateProduct: "landing/EDIT_PRODUCT",
      deleteProductV: "landing/DELETE_PRODUCT",
      addService: "landing/SAVE_SERVICE",
      updateService: "landing/EDIT_SERVICE",
      deleteServiceV: "landing/DELETE_SERVICE",
      addTestimonial: "landing/SAVE_TESTIMONIAL",
      updateTestimonial: "landing/EDIT_TESTIMONIAL",
      deleteTestimonialV: "landing/DELETE_TESTIMONIAL",
      updateComponent: "landing/SAVE_COMPONENT",
    }),
    deleteCarousel(index) {
      this.deleteCarouselIndex = index;
      this.deleteCarouselDialog = true;
    },
    cancelDeleteCarousel() {
      this.deleteCarouselIndex = -1;
      this.deleteCarouselDialog = false;
    },
    deleteService(index) {
      this.deleteServiceIndex = index;
      this.deleteServiceDialog = true;
    },
    cancelDeleteService() {
      this.deleteServiceIndex = -1;
      this.deleteServiceDialog = false;
    },
    deleteTestimonial(index) {
      this.deleteTestimonialIndex = index;
      this.deleteTestimonialDialog = true;
    },
    cancelDeleteTestimonial() {
      this.deleteTestimonialIndex = -1;
      this.deleteTestimonialDialog = false;
    },
    deleteFaq(index) {
      this.deleteFaqIndex = index;
      this.deleteFaqDialog = true;
    },
    deleteProduct(index) {
      this.deleteProductIndex = index;
      this.deleteProductDialog = true;
    },
    cancelDeleteFaq() {
      this.deleteFaqIndex = -1;
      this.deleteFaqDialog = false;
    },
    cancelDeleteProduct() {
      this.deleteProductIndex = -1;
      this.deleteProductDialog = false;
    },
    confirmDeleteCarousel() {
      this.deleting = true;

      this.deleteCarouselV({
        index: this.deleteCarouselIndex,
        data: {id: this.carousels[this.deleteCarouselIndex].id},
      })
          .then(() => {
            this.actionMessage = "Carousel Item deleted successfully";
            this.actionColor = "success";
            this.snackbar = true;
            this.deleteCarouselIndex = -1;
            this.deleting = false;
            this.deleteCarouselDialog = false;

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
            this.deleteCarouselIndex = -1;
            this.deleting = false;
            this.deleteCarouselDialog = false;

            setTimeout(() => {
              this.actionMessage = "";
              this.actionColor = "black";
              this.snackbar = false;
            }, 4000);
          });
    },
    confirmDeleteService() {
      this.deleting = true;

      this.deleteServiceV({
        index: this.deleteServiceIndex,
        data: {id: this.services[this.deleteServiceIndex].id},
      })
          .then(() => {
            this.actionMessage = "Service deleted successfully";
            this.actionColor = "success";
            this.snackbar = true;
            this.deleteServiceIndex = -1;
            this.deleting = false;
            this.deleteServiceDialog = false;

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
            this.deleteServiceIndex = -1;
            this.deleting = false;
            this.deleteServiceDialog = false;

            setTimeout(() => {
              this.actionMessage = "";
              this.actionColor = "black";
              this.snackbar = false;
            }, 4000);
          });
    },
    confirmDeleteTestimonial() {
      this.deleting = true;

      this.deleteTestimonialV({
        index: this.deleteTestimonialIndex,
        data: {id: this.testimonials[this.deleteTestimonialIndex].id},
      })
          .then(() => {
            this.actionMessage = "Testimonial deleted successfully";
            this.actionColor = "success";
            this.snackbar = true;
            this.deleteTestimonialIndex = -1;
            this.deleting = false;
            this.deleteTestimonialDialog = false;

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
            this.deleteTestimonialIndex = -1;
            this.deleting = false;
            this.deleteTestimonialDialog = false;

            setTimeout(() => {
              this.actionMessage = "";
              this.actionColor = "black";
              this.snackbar = false;
            }, 4000);
          });
    },
    confirmDeleteFaq() {
      this.deleting = true;

      this.deleteFaqV({
        index: this.deleteFaqIndex,
        data: {id: this.faqs[this.deleteFaqIndex].id},
      })
          .then(() => {
            this.actionMessage = "Faq deleted successfully";
            this.actionColor = "success";
            this.snackbar = true;
            this.deleteFaqIndex = -1;
            this.deleting = false;
            this.deleteFaqDialog = false;

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
            this.deleteFaqIndex = -1;
            this.deleting = false;
            this.deleteFaqDialog = false;

            setTimeout(() => {
              this.actionMessage = "";
              this.actionColor = "black";
              this.snackbar = false;
            }, 4000);
          });
    },
    confirmDeleteProduct() {
      this.deleting = true;

      this.deleteProductV({
        index: this.deleteFaqIndex,
        data: {id: this.products[this.deleteProductIndex].id},
      })
          .then(() => {
            this.actionMessage = "Product deleted successfully";
            this.actionColor = "success";
            this.snackbar = true;
            this.deleteProductIndex = -1;
            this.deleting = false;
            this.deleteProductDialog = false;

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
            this.deleteProductIndex = -1;
            this.deleting = false;
            this.deleteProductDialog = false;

            setTimeout(() => {
              this.actionMessage = "";
              this.actionColor = "black";
              this.snackbar = false;
            }, 4000);
          });
    },
    editCarousel(index) {
      this.editCarouselIndex = index;
      this.newcarousel = this.carousels[index];
      this.dialog = true;
    },
    editService(index) {
      this.editServiceIndex = index;
      this.newservice = this.services[index];
      this.servicesDialog = true;
    },
    editTestimonial(index) {
      this.editTestimonialIndex = index;
      this.newtestimonial = this.testimonials[index];
      this.testimonialsDialog = true;
    },
    editFaq(index) {
      this.editFaqIndex = index;
      this.newfaq = this.faqs[index];
      this.faqDialog = true;
    },
    editProduct(index) {
      this.editProductIndex = index;
      this.newproduct = this.products[index];
      this.productDialog = true;
    },
    clearForm() {
      this.editCarouselIndex = -1;
      this.editServiceIndex = -1;
      this.editTestimonialIndex = -1;
      this.editFaqIndex = -1;
      this.editProductIndex = -1;
      this.newcarousel = {
        id: null,
        image_url: "",
        image_caption: "",
        tag_line: "",
        cta_btn_text: "",
        cta_btn_icon: "",
        cta_btn_url: "",
      };
      this.newservice = {
        id: null,
        icon: "",
        name: "",
        description: "",
      };
      this.newfaq = {
        id: null,
        question: "",
        answer: "",
      };
      this.newproduct = {
        id: null,
        image: "",
        name: "",
        description: "",
        additionalinfo: "",
        service: -1,
      };
      this.newtestimonial = {
        id: null,
        avatar: "",
        name: "",
        designation: "",
        message: "",
      };
    },
    saveComponents() {
      this.saving = true;

      var comps = [];
      if (this.editwebsite.about !== this.website.about) {
        comps.push({key: "about", val: this.editwebsite.about});
      }

      if (this.editwebsite.mission !== this.website.mission) {
        comps.push({key: "mission", val: this.editwebsite.mission});
      }

      if (this.editwebsite.vision !== this.website.vision) {
        comps.push({key: "vision", val: this.editwebsite.vision});
      }

      if (this.editwebsite.address !== this.website.address) {
        comps.push({key: "address", val: this.editwebsite.address});
      }

      if (this.editwebsite.phone !== this.website.phone) {
        comps.push({key: "phone", val: this.editwebsite.phone});
      }

      if (this.editwebsite.email !== this.website.email) {
        comps.push({key: "email", val: this.editwebsite.email});
      }

      if (comps.length === 0) {
        this.saving = false;

        this.actionMessage = "Nothing to save!";
        this.actionColor = "info";
        this.snackbar = true;

        setTimeout(() => {
          this.actionMessage = "";
          this.actionColor = "black";
          this.snackbar = false;
        }, 4000);
      } else {
        this.updateComponent(comps)
            .then(() => {
              this.actionMessage = "Website info updated successfully!";
              this.actionColor = "success";
              this.snackbar = true;

              this.saving = false;
              this.editing = false;

              this.$store.dispatch("landing/GET_WEBSITE");

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            })
            .catch((err) => {
              console.log(err);
              this.actionMessage = "An error occured when saving website info";
              this.actionColor = "red";
              this.snackbar = true;

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
    splitAddress(str) {
      if (str) {
        return str.toString().replace(/;/g, "<br/>");
      } else return "None";
    },
    discardChanges() {
      this.loading = true;
      this.$store.dispatch("landing/GET_WEBSITE").then(() => {
        this.editing = false;
        this.loading = false;
      });
    },
    toggle() {
      this.$refs["fullscreen"].toggle(); // recommended
      // this.fullscreen = !this.fullscreen // deprecated
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    activateEdit() {
      this.editwebsite = {
        about: this.website.about,
        mission: this.website.mission,
        vision: this.website.vision,
        address: this.website.address,
        phone: this.website.phone,
        email: this.website.email,
      };
      this.editing = !this.editing;
    },
    saveCarousel() {
      this.saving = true;

      if (this.editCarouselIndex > -1) {
        this.updateCarousel({
          index: this.editCarouselIndex,
          data: this.newcarousel,
        })
            .then(() => {
              this.actionMessage = "Item Updated successfully!";
              this.actionColor = "success";
              this.snackbar = true;
              this.newcarousel = {
                id: null,
                image_url: "",
                image_caption: "",
                tag_line: "",
                cta_btn_text: "",
                cta_btn_icon: "",
                cta_btn_url: "",
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
              this.actionMessage = "An error occured when updating item";
              this.actionColor = "red";
              this.snackbar = true;
              this.newcarousel = {
                id: null,
                image_url: "",
                image_caption: "",
                tag_line: "",
                cta_btn_text: "",
                cta_btn_icon: "",
                cta_btn_url: "",
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
        this.addCarousel(this.newcarousel)
            .then(() => {
              this.actionMessage = "Item Added successfully!";
              this.actionColor = "success";
              this.snackbar = true;
              this.newcarousel = {
                id: null,
                image_url: "",
                image_caption: "",
                tag_line: "",
                cta_btn_text: "",
                cta_btn_icon: "",
                cta_btn_url: "",
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
              this.actionMessage = "An error occured when adding item";
              this.actionColor = "red";
              this.snackbar = true;
              this.newcarousel = {
                id: null,
                image_url: "",
                image_caption: "",
                tag_line: "",
                cta_btn_text: "",
                cta_btn_icon: "",
                cta_btn_url: "",
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
    saveFaq() {
      this.saving = true;

      if (this.editFaqIndex > -1) {
        this.updateFaq({
          index: this.editFaqIndex,
          data: this.newfaq,
        })
            .then(() => {
              this.actionMessage = "FAQ Updated successfully!";
              this.actionColor = "success";
              this.snackbar = true;
              this.newfaq = {
                id: null,
                question: "",
                answer: "",
              };
              this.saving = false;
              this.faqDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            })
            .catch((err) => {
              console.log(err);
              this.actionMessage = "An error occured when updating FAQ";
              this.actionColor = "red";
              this.snackbar = true;
              this.newfaq = {
                id: null,
                question: "",
                answer: "",
              };
              this.saving = false;
              this.faqDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            });
      } else {
        this.addFaq(this.newfaq)
            .then(() => {
              this.actionMessage = "FAQ Added successfully!";
              this.actionColor = "success";
              this.snackbar = true;
              this.newfaq = {
                id: null,
                question: "",
                answer: "",
              };
              this.saving = false;
              this.faqDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            })
            .catch((err) => {
              console.log(err);
              this.actionMessage = "An error occured when adding FAQ";
              this.actionColor = "red";
              this.snackbar = true;
              this.newfaq = {
                id: null,
                question: "",
                answer: "",
              };
              this.saving = false;
              this.faqDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            });
      }
    },
    saveProduct() {
      this.saving = true;

      if (this.editProductIndex > -1) {
        this.updateProduct({
          index: this.editProductIndex,
          data: this.newproduct,
        })
            .then(() => {
              this.actionMessage = "Product Updated successfully!";
              this.actionColor = "success";
              this.snackbar = true;
              this.newproduct = {
                id: null,
                image: "",
                name: "",
                description: "",
                additionalinfo: "",
                service: -1,
              };
              this.saving = false;
              this.productDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            })
            .catch((err) => {
              console.log(err);
              this.actionMessage = "An error occured when updating Product";
              this.actionColor = "red";
              this.snackbar = true;
              this.newproduct = {
                id: null,
                image: "",
                name: "",
                description: "",
                additionalinfo: "",
                service: -1,
              };
              this.saving = false;
              this.productDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            });
      } else {
        this.addProduct(this.newproduct)
            .then(() => {
              this.actionMessage = "Product Added successfully!";
              this.actionColor = "success";
              this.snackbar = true;
              this.newproduct = {
                id: null,
                image: "",
                name: "",
                description: "",
                additionalinfo: "",
                service: -1,
              };
              this.saving = false;
              this.productDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            })
            .catch((err) => {
              console.log(err);
              this.actionMessage = "An error occured when adding Product";
              this.actionColor = "red";
              this.snackbar = true;
              this.newproduct = {
                id: null,
                image: "",
                name: "",
                description: "",
                additionalinfo: "",
                service: -1,
              };
              this.saving = false;
              this.productDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            });
      }
    },
    saveService() {
      this.saving = true;

      if (this.editServiceIndex > -1) {
        this.updateService({
          index: this.editServiceIndex,
          data: this.newservice,
        })
            .then(() => {
              this.actionMessage = "Service Updated successfully!";
              this.actionColor = "success";
              this.snackbar = true;
              this.newservice = {
                id: null,
                icon: "",
                name: "",
                description: "",
              };
              this.saving = false;
              this.servicesDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            })
            .catch((err) => {
              console.log(err);
              this.actionMessage = "An error occured when updating service";
              this.actionColor = "red";
              this.snackbar = true;
              this.newservice = {
                id: null,
                icon: "",
                name: "",
                description: "",
              };
              this.saving = false;
              this.servicesDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            });
      } else {
        this.addService(this.newservice)
            .then(() => {
              this.actionMessage = "Service Added successfully!";
              this.actionColor = "success";
              this.snackbar = true;
              this.newservice = {
                id: null,
                icon: "",
                name: "",
                description: "",
              };
              this.saving = false;
              this.servicesDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            })
            .catch((err) => {
              console.log(err);
              this.actionMessage = "An error occured when adding FAQ";
              this.actionColor = "red";
              this.snackbar = true;
              this.newservice = {
                id: null,
                icon: "",
                name: "",
                description: "",
              };
              this.saving = false;
              this.servicesDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            });
      }
    },
    saveTestimonial() {
      this.saving = true;

      if (this.editTestimonialIndex > -1) {
        this.updateTestimonial({
          index: this.editTestimonialIndex,
          data: this.newtestimonial,
        })
            .then(() => {
              this.actionMessage = "Testimonial updated successfully!";
              this.actionColor = "success";
              this.snackbar = true;
              this.newtestimonial = {
                id: null,
                avatar: "",
                name: "",
                designation: "",
                message: "",
              };
              this.saving = false;
              this.testimonialsDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            })
            .catch((err) => {
              console.log(err);
              this.actionMessage = "An error occured when adding testimonial";
              this.actionColor = "red";
              this.snackbar = true;
              this.newtestimonial = {
                id: null,
                avatar: "",
                name: "",
                designation: "",
                message: "",
              };
              this.saving = false;
              this.testimonialsDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            });
      } else {
        this.addTestimonial(this.newtestimonial)
            .then(() => {
              this.actionMessage = "Testimonial Added successfully!";
              this.actionColor = "success";
              this.snackbar = true;
              this.newtestimonial = {
                id: null,
                avatar: "",
                name: "",
                designation: "",
                message: "",
              };
              this.saving = false;
              this.testimonialsDialog = false;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
              }, 4000);
            })
            .catch((err) => {
              console.log(err);
              this.actionMessage = "An error occured when adding testimonial";
              this.actionColor = "red";
              this.snackbar = true;
              this.newtestimonial = {
                id: null,
                avatar: "",
                name: "",
                designation: "",
                message: "",
              };
              this.saving = false;
              this.testimonialsDialog = false;

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
          this.$store.dispatch("landing/GET_CAROUSELS").then(() => {
            this.loading = false;
          });

          this.$store.dispatch("landing/GET_FAQS");

          this.$store.dispatch("landing/GET_PRODUCTS");

          this.$store.dispatch("landing/GET_WEBSITE");

          this.$store.dispatch("landing/GET_SERVICES");

          this.$store.dispatch("landing/GET_TESTIMONIALS");

          if (JSON.parse(localStorage.getItem("user"))) {
            this.authUser = JSON.parse(localStorage.getItem("user"));
          } else {
            this.$router.replace({
              name: "login",
            });
          }
        })
        .catch((err) => {
          this.actionMessage =
              err.message + "! Please refresh this page to retry.";
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
