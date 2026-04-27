import {StyleSheet, Dimensions} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';

const {width} = Dimensions.get('window');

const GetStyles = (GAP, NUM_COLUMNS) => {
  const {color} = useThemeContext();

  const ITEM_SIZE = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.backgroundColor,
    },
    listContainer: {
      padding: GAP,
      paddingBottom: GAP * 5,
    },
    columnWrapper: {
      gap: GAP,
    },
    card: {
      width: ITEM_SIZE,
      height: ITEM_SIZE,
      marginBottom: GAP,
      borderRadius: 10,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: color.customBlack(0.1),
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    deleteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: color.customBlack(0.5),
      padding: 8,
      borderRadius: 20,
    },
  });
};

export default GetStyles;
