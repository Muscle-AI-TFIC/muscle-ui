import { StyleSheet } from "react-native";

export const styleHome = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navbar: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#1E1E1E',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 165, 0, 0.15)',
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
    color: '#AAA',
    textAlign: 'center',
  },
  activeTabTitle: {
    color: '#FFA500',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFA500',
  },
  contentText: {
    fontSize: 16,
    color: '#DDD',
    textAlign: 'center',
  },
});
