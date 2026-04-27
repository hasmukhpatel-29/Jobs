import {StyleSheet} from 'react-native';

const GetStyles = () => {
  return StyleSheet.create({
    listContainer: {
      flexGrow: 1,
    },
    item: {
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyle: {
      width: '100%',
      height: 200,
      resizeMode: 'contain',
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });
};

export default GetStyles;
