import React from 'react';
import { Slot, useSegments, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styleHome } from '@/styles/Home';
import { SafeAreaView } from 'react-native-safe-area-context';

export function CustomNavigationBar() {
  const router = useRouter();
  const segments = useSegments();
  const activeTab = segments[segments.length - 1];

  const tabs = [
    { id: 'home', title: 'Início', icon: 'home' },
    { id: 'profile', title: 'Perfil', icon: 'person' },
  ] as const;

  const handleTabPress = (tabId: "home" | "profile") => {
    router.push(`/tabs/${tabId}`);
  };

  return (
    <SafeAreaView  edges={['bottom']} style={styleHome.container}>
      <View style={styleHome.navbar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styleHome.tab,
              activeTab === tab.id && styleHome.activeTab,
            ]}
            onPress={() => handleTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <View style={styleHome.iconContainer}>
              <Ionicons
                name={activeTab === tab.id ? tab.icon as any : `${tab.icon}-outline` as any}
                size={22}
                color={activeTab === tab.id ? '#007AFF' : '#8E8E93'}
              />
              
            </View>
            <Text
              style={[
                styleHome.tabTitle,
                activeTab === tab.id && styleHome.activeTabTitle,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <CustomNavigationBar />
    </View>
  );
}