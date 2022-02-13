export const getURL = {
  computed: {
    baseURL() {
      return process.env.VUE_APP_IMAGE;
    },
  },
};

export const uploadURL = {
  computed: {
    getUrl() {
      return process.env.VUE_APP_UPLOADIMAGE;
    },
  },
};
