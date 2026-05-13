import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import GetStyles from './styles';

const CSlider = ({title, initialValue = 0, onValueChange}) => {
  const styles = GetStyles();
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [trackWidth, setTrackWidth] = useState(0);

  const trackWidthRef = useRef(0);
  const thumbWidth = 20;

  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trackWidth > 0) {
      const maxScroll = trackWidth - thumbWidth;
      const initialX = (initialValue / 100) * maxScroll;
      position.setValue(initialX);
    }
  }, [trackWidth, initialValue]);

  useEffect(() => {
    const listener = position.addListener(({value}) => {
      if (trackWidthRef.current > 0) {
        let currentX = value;
        const maxX = trackWidthRef.current - thumbWidth;

        if (currentX < 0) currentX = 0;
        if (currentX > maxX) currentX = maxX;

        const percentage = Math.round((currentX / maxX) * 100);
        setCurrentValue(percentage);
      }
    });
    return () => {
      position.removeListener(listener);
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Stop any active "jump" animations if the user grabs the dot while it's moving
        position.stopAnimation();
        position.setOffset(position._value);
        position.setValue(0);
      },
      onPanResponderMove: Animated.event([null, {dx: position}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        position.flattenOffset();

        let currentX = position._value;
        const maxX = trackWidthRef.current - thumbWidth;

        if (currentX < 0) currentX = 0;
        if (currentX > maxX) currentX = maxX;

        position.setValue(currentX);

        const percentage = Math.round((currentX / maxX) * 100);
        console.info('🚀 ~ CSlider ~ dragged percentage:', percentage);
        setCurrentValue(percentage);

        if (onValueChange) {
          onValueChange(percentage);
        }
      },
    }),
  ).current;

  // 2. Added this function to handle taps anywhere on the track
  const handleTrackPress = e => {
    if (trackWidthRef.current === 0) return;

    // Get the exact X coordinate where the user tapped
    const tapX = e.nativeEvent.locationX;
    const maxX = trackWidthRef.current - thumbWidth;

    // Center the thumb on the tap coordinate
    let targetX = tapX - thumbWidth / 2;

    // Keep it inside the bounds
    if (targetX < 0) targetX = 0;
    if (targetX > maxX) targetX = maxX;

    const percentage = Math.round((targetX / maxX) * 100);
    console.info('🚀 ~ CSlider ~ tapped percentage:', percentage);

    // Use a spring animation to smoothly glide the thumb to the new spot
    Animated.spring(position, {
      toValue: targetX,
      useNativeDriver: false,
      bounciness: 8, // Gives it a subtle, satisfying snap effect
      speed: 14,
    }).start();

    setCurrentValue(percentage);
    if (onValueChange) {
      onValueChange(percentage);
    }
  };

  const clampedPosition = position.interpolate({
    inputRange: [0, Math.max(trackWidth - thumbWidth, 1)],
    outputRange: [0, Math.max(trackWidth - thumbWidth, 1)],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {title}: {currentValue}%
      </Text>

      {/* 3. Wrapped the track in TouchableWithoutFeedback */}
      <TouchableWithoutFeedback onPress={handleTrackPress}>
        <View
          style={styles.trackContainer}
          onLayout={e => {
            const newWidth = e.nativeEvent.layout.width;
            setTrackWidth(newWidth);
            trackWidthRef.current = newWidth;
          }}>
          {/* 4. Added pointerEvents="none" so taps pass cleanly to the track container */}
          <View style={styles.trackBackground} pointerEvents="none" />

          <Animated.View
            {...panResponder.panHandlers}
            style={[styles.thumb, {left: clampedPosition}]}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.labelsContainer}>
        <Text style={[styles.labelText, styles.alignLeft]}>0%</Text>
        <Text style={[styles.labelText, styles.alignCenter]}>50%</Text>
        <Text style={[styles.labelText, styles.alignRight]}>100%</Text>
      </View>
    </View>
  );
};

export default CSlider;
