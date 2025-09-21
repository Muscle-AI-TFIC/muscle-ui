import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const styleHome = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
  },
  navbar: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  tabTitle: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  activeTabTitle: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  contentText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  topBox:{
    borderWidth: 4,
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 30,
    width: screenWidth * 0.8,
    backgroundColor: "hsla(252, 59%, 10%, 1.00)",
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: "white",
    fontFamily: "cursive",
    fontSize: 20,
  },
  mainBox: {
    margin: 'auto',
    marginTop: 30,
  }
});