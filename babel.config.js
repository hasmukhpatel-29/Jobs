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
          '@contexts': './app/contexts',
          '@utils': './app/utils',
          '@zustand': './app/zustand',
          '@zod': './app/zod',
          '@apis': './app/Apis',
          '@apiRoutes': './app/Apis/ApiRoutes',
          '@endPoints': './app/Apis/EndPoints',
          '@hooks': './app/hooks',
        },
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
    'module:react-native-dotenv',
    'react-native-reanimated/plugin',
  ],
};