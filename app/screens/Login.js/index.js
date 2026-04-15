import {Text, View} from 'react-native';
import {useThemeContext} from '@context/themeContext';

export default function Login() {
  const {color} = useThemeContext();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white,
      }}>
      <Text>Welcome dev!</Text>
    </View>
  );
}
