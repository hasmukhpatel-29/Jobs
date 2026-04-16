import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  shimmer: {
    ...StyleSheet.absoluteFill,
  },
  gradient: {
    flex: 1,
    width: 200,
  },
});
export default styles;