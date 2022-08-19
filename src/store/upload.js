import axios from "axios";

export default {
  namespaced: true,
  state: {
    uploads: [],
  },

  getters: {
    UPLOADS: (state) => {
      return state.uploads;
    },
  },

  mutations: {
    SET_UPLOADS: (state, payload) => {
      state.uploads = payload;
    },
  },

  actions: {
    GET_FILES: async (context) => {
      let { data } = await axios.get("files");
      const imageExtensions =
        "|apng|avif|gif|jpg|jpeg|jfif|pjpeg|pjp|png|svg|web|";

      data.forEach(function(file) {
        file.isImage = imageExtensions.includes(
          `|${file.name.split(".").pop()}|`
        );
        file.url = file.url.replaceAll(' ', '%20').replaceAll('(','%28').replaceAll(')','%29');
      });

      const reduced = [];

      for (var i = 0; i < data.length; i++) {
        if (data[i].isImage) {
          reduced.push(data[i]);
        }
      }

      context.commit("SET_UPLOADS", reduced);
    },
  },

  modules: {},
};
