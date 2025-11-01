import { StyleSheet } from "react-native";

export const styleProfile = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#121212',
  },
  text: {
    fontSize: 16,
    color: '#EEE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: '#FFA500',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#FFA500',
  },
});
