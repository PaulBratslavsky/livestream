module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },

      actionOptions: {
        uploadStream: {
          folder: env("CLOUDINARY_FOLDER"),
        },

        delete: {},
      },
    },
  },
  // update this to reflect the correct url using env variables

  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::post.post',
          draft: {
            url: env("FRONT_END_URL") + "blog/preview",
            query: {
              type: 'post',
              slug: '{slug}',
            },
          },
          published: {
            url: env("FRONT_END_URL") + "blog/{slug}",
          },
        },
      ],
    },
  },
});