import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styleHome } from '@/styles/Home';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from './profile';

interface NavBarProps {
  onTabChange: (tab: string) => void;
}

export function CustomNavigationBar({ onTabChange }: NavBarProps) {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', title: 'Início', icon: 'home' },
    { id: 'profile', title: 'Perfil', icon: 'person' },
  ];

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
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

export default function HomeWithCustomNavBar() {
  const [currentTab, setCurrentTab] = useState('home');

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <View style={styleHome.content}>
            <Text style={styleHome.contentTitle}>Início</Text>
            <Text style={styleHome.contentText}>Conteúdo da tela </Text>
          </View>
        );
      case 'profile':
        return (
          <View style={styleHome.content}>
            <Profile />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styleHome.mainContainer}>
      {renderContent()}
      <CustomNavigationBar onTabChange={setCurrentTab} />
    </View>
  );
}