module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './app/components',
          '@config': './app/config',
          '@screens': './app/screens',
          '@assets': './app/assets',
          '@navigation': './app/navigation',
          '@context': './app/context',
        },
      },
    ],
  ],
};