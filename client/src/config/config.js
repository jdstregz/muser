const dev = {
  api: {
    url: 'http://localhost:8888',
  },
};

const config = process.env.NODE_ENV === 'production' ? null : dev;

export default {
  ...config,
};
