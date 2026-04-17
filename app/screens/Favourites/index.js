import React from 'react';
import {View, Text} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';

export default function Favourites() {
  const {color} = useThemeContext();
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{textAlign: 'center', color: color.black}}>Favourites</Text>
    </View>
  );
}
