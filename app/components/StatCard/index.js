import React from 'react';
import {View, Text} from 'react-native';
import Icon, {Icons} from '@config/Icons';
import GetStyles from './styles';

export const StatCard = ({
  value,
  label,
  iconName,
  baseColor,
  iconType = Icons.Feather,
}) => {
  const styles = GetStyles();
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.iconWrapper, {backgroundColor: `${baseColor}20`}]}>
          <Icon type={iconType} name={iconName} size={20} color={baseColor} />
        </View>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};
