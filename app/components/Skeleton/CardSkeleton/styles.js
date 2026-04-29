import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    container: {
      padding: 12,
    },
    card: {
      borderRadius: 12,
      padding: 14,
      marginBottom: 12,
      elevation: 3,
      borderWidth: 1,
      borderColor: color.borderColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    headerText: {
      flex: 1,
    },
    infoRow: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 10,
    },
    tags: {
      flexDirection: 'row',
      marginTop: 12,
      gap: 8,
    },
    mt6: {
      marginTop: 6,
    },
    mt12: {
      marginTop: 12,
    },
  });
};

export default GetStyles;