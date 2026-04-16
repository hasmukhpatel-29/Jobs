/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, TouchableOpacity, View, Animated} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import RenderItem from './RenderItem';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import GetStyles from './styles';
import {useThemeContext} from '@contexts/themeContext';
import {ProfileViewModal} from '@components/CModal/ProfileViewModal';

const {width: screenWidth} = Dimensions.get('window');

const CCarousel = ({planningData = [], isEditShopGallery = false}) => {
  const styles = GetStyles();
  const singleImage = planningData.length === 1;

  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const {color} = useThemeContext();
  const navigation = useNavigation();

  const cardGap = 12;
  const cardWidth = screenWidth;
  const itemInterval = cardWidth + cardGap;

  const flatListRef = useRef(null);
  const autoplayIndex = useRef(1);
  const isPausedRef = useRef(false);

  // Animated dots
  const animatedDots = useRef([]);

  useEffect(() => {
    animatedDots.current = planningData.map(() => new Animated.Value(0));
  }, [planningData]);

  const animateDots = active => {
    animatedDots.current.forEach((anim, idx) => {
      Animated.timing(anim, {
        toValue: idx === active ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const loopData = singleImage
    ? planningData
    : [planningData[planningData.length - 1], ...planningData, planningData[0]];

  const mapRealIndex = index =>
    singleImage
      ? index
      : (index - 1 + planningData.length) % planningData.length;

  const onScrollEnd = e => {
    if (singleImage) return;

    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / itemInterval);
    autoplayIndex.current = index;

    const realIndex = mapRealIndex(index);
    setActiveIndex(realIndex);
    animateDots(realIndex);

    // Infinite loop correction
    if (index === 0) {
      autoplayIndex.current = planningData.length;
      flatListRef.current?.scrollToOffset({
        offset: planningData.length * itemInterval,
        animated: false,
      });
    } else if (index === planningData.length + 1) {
      autoplayIndex.current = 1;
      flatListRef.current?.scrollToOffset({
        offset: itemInterval,
        animated: false,
      });
    }
  };

  useEffect(() => {
    animateDots(activeIndex);
  }, [activeIndex]);

  // Stable autoplay (no reset)
  useEffect(() => {
    if (imageModalOpen || singleImage) return;

    const id = setInterval(() => {
      if (isPausedRef.current) return;

      autoplayIndex.current += 1;

      flatListRef.current?.scrollToOffset({
        offset: autoplayIndex.current * itemInterval,
        animated: true,
      });

      const realIdx = mapRealIndex(autoplayIndex.current);
      setActiveIndex(realIdx);
      animateDots(realIdx);
    }, 2500);

    return () => clearInterval(id);
  }, [imageModalOpen, singleImage]);

  if (!planningData.length) return null;

  return (
    <View style={styles.container}>
      {isEditShopGallery && (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditGallery')}
          activeOpacity={0.8}
          style={styles.editContainer}>
          <CustomIcon
            name="edit"
            size={size.moderateScale(20)}
            color={color.commonWhite}
          />
        </TouchableOpacity>
      )}

      <FlatList
        ref={flatListRef}
        horizontal
        data={loopData}
        initialScrollIndex={singleImage ? 0 : 1}
        onMomentumScrollEnd={e => {
          onScrollEnd(e);

          // Resume after slight delay (smooth UX)
          setTimeout(() => {
            isPausedRef.current = false;
          }, 800);
        }}
        onScrollBeginDrag={() => {
          if (!singleImage) isPausedRef.current = true;
        }}
        renderItem={({item, index}) => {
          const realIdx = mapRealIndex(index);

          return (
            <View style={styles.flatListMainView(cardWidth)}>
              <RenderItem
                item={item}
                index={realIdx}
                onPressIn={() => {
                  if (!singleImage) isPausedRef.current = true;
                }}
                onPressOut={() => {
                  if (!singleImage) isPausedRef.current = false;
                }}
                onPress={() => {
                   setSelectedImage(planningData);
                  setSelectedImageIndex(realIdx);
                  setImageModalOpen(true);
                }}
              />
            </View>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        snapToInterval={singleImage ? undefined : itemInterval}
        decelerationRate={singleImage ? 'normal' : 'fast'}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: cardGap}}
        scrollEnabled={!singleImage}
        getItemLayout={(_, index) => ({
          length: itemInterval,
          offset: itemInterval * index,
          index,
        })}
      />

      {/* Pagination Dots */}
      {!singleImage && (
        <View style={styles.dotContainer}>
          {planningData.map((_, idx) => {
            const width = animatedDots.current[idx]?.interpolate({
              inputRange: [0, 1],
              outputRange: [8, 20],
            });

            const borderRadius = animatedDots.current[idx]?.interpolate({
              inputRange: [0, 1],
              outputRange: [4, 8],
            });

            const backgroundColor = animatedDots.current[idx]?.interpolate({
              inputRange: [0, 1],
              outputRange: [color.gray, color.primary],
            });

            return (
              <Animated.View
                key={idx}
                style={styles.dotStyle({
                  width,
                  borderRadius,
                  backgroundColor,
                })}
              />
            );
          })}
        </View>
      )}
      <ProfileViewModal
        isModalOpen={imageModalOpen}
        images={selectedImage}
        index={selectedImageIndex}
        onReject={() => {
          setSelectedImage(null);
          setSelectedImageIndex(null);
          setImageModalOpen(false);
        }}
      />
    </View>
  );
};

export default CCarousel;
