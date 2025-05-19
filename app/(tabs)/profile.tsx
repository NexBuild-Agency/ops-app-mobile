import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userProfile, vehicles } from '@/data/mockData';
import Colors from '@/constants/Colors';
import { ChevronRight, Car, Bell, Shield, CreditCard, HelpCircle, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const menuItems = [
    { icon: <Car size={24} color={Colors.primary} />, title: 'My Vehicles', badge: `${vehicles.length}` },
    { icon: <Bell size={24} color={Colors.primary} />, title: 'Notifications', badge: '2' },
    { icon: <Shield size={24} color={Colors.primary} />, title: 'Privacy & Security' },
    { icon: <CreditCard size={24} color={Colors.primary} />, title: 'Payment Methods' },
    { icon: <HelpCircle size={24} color={Colors.primary} />, title: 'Help & Support' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userProfile.name.charAt(0)}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileEmail}>{userProfile.email}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                {item.icon}
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <View style={styles.menuRight}>
                  {item.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                  <ChevronRight size={20} color={Colors.gray} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={Colors.error} style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 8,
    borderBottomColor: Colors.grayLight,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: Colors.grayLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.textPrimary,
  },
  menuSection: {
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingBottom: 16,
  },
  menuTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.white,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 24,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.error,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
});