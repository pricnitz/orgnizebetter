module.exports = function (api) {
  api.cache(true);
  return {
<<<<<<< HEAD
    presets: ['babel-preset-expo'],
=======
       presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
>>>>>>> 4cb02bd03b04d43d0c0e4ea15cbb1f6fe030136d
  };
};
