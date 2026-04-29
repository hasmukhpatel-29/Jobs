import React from 'react';
import {View} from 'react-native';
import Skeleton from '..';
import GetStyles from './styles';

const CardSkeleton = ({count = 4}) => {
  const styles = GetStyles();

  return (
    <View style={styles.container}>
      {Array.from({length: count}).map((_, index) => (
        <View key={index} style={styles.card}>
          
          <View style={styles.header}>
            <Skeleton height={40} width={40} borderRadius={8} />

            <View style={styles.headerText}>
              <Skeleton height={14} width="60%" />
              <Skeleton height={12} width="40%" style={styles.mt6} />
            </View>
          </View>

          <Skeleton height={18} width="70%" style={styles.mt12} />

          <View style={styles.infoRow}>
            <Skeleton height={12} width={80} />
            <Skeleton height={12} width={60} />
            <Skeleton height={12} width={70} />
          </View>

          <View style={styles.mt12}>
            <Skeleton height={12} width="100%" />
            <Skeleton height={12} width="90%" style={styles.mt6} />
          </View>

          <View style={styles.tags}>
            <Skeleton height={26} width={70} borderRadius={20} />
            <Skeleton height={26} width={90} borderRadius={20} />
            <Skeleton height={26} width={60} borderRadius={20} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default CardSkeleton;