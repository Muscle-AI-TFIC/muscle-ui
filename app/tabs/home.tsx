import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styleHome } from '@/styles/Home';
import { router } from 'expo-router';
import * as Router from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NavBarProps {
  onTabChange: (tab: string) => void;
}

const { width } = Dimensions.get('window');

export function CustomNavigationBar({ onTabChange }: NavBarProps) {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', title: 'Início', icon: 'home' },
    { id: 'search', title: 'Buscar', icon: 'search' },
    { id: 'notifications', title: 'Notificações', icon: 'notifications', badge: 3 },
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
              {tab.badge && (
                <View style={styleHome.badge}>
                  <Text style={styleHome.badgeText}>{tab.badge}</Text>
                </View>
              )}
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
      case 'search':
        return (
          <View style={styleHome.content}>
            <Text style={styleHome.contentTitle}>Treinos</Text>
            <Text style={styleHome.contentText}>Treinos</Text>
          </View>
        );
      case 'notifications':
        return (
          <View style={styleHome.content}>
            <Text style={styleHome.contentTitle}>Notificações</Text>
            <Text style={styleHome.contentText}>Suas notificações</Text>
          </View>
        );
      case 'profile':
        return (
          <View style={styleHome.content}>
            <Text style={styleHome.contentTitle}>Perfil</Text>
            <Text style={styleHome.contentText}>Seu perfil</Text>
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