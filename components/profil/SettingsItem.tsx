import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Feather } from '@expo/vector-icons';

interface SettingsItemProps {
  icon: string;
  title: string;
  right?: ReactNode;
  onPress?: () => void;
}

export const SettingsItem = ({
  icon,
  title,
  right,
  onPress,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.iconContainer}>
        <Feather name={icon as any} size={20} color={Colors.primary.main} />
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {right ? (
          right
        ) : onPress ? (
          <Feather name="chevron-right" size={20} color={Colors.grey[400]} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[100],
  },
  iconContainer: {
    marginRight: Layout.spacing.m,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    flex: 1,
  },
  rightContainer: {
    marginLeft: Layout.spacing.m,
  },
});