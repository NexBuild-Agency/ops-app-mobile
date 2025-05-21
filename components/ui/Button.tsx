import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import React, { ReactNode } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined' | 'text';
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  title,
  onPress,
  variant = 'filled',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}: ButtonProps) => {
  const getButtonStyle = () => {
    if (disabled) {
      return [
        styles.button,
        variant === 'filled' && styles.filledDisabled,
        variant === 'outlined' && styles.outlinedDisabled,
        style,
      ];
    }
    
    return [
      styles.button,
      variant === 'filled' && styles.filled,
      variant === 'outlined' && styles.outlined,
      variant === 'text' && styles.text,
      style,
    ];
  };
  
  const getTextStyle = () => {
    if (disabled) {
      return [
        styles.buttonText,
        variant === 'filled' && styles.filledTextDisabled,
        variant === 'outlined' && styles.outlinedTextDisabled,
        variant === 'text' && styles.textTextDisabled,
        textStyle,
      ];
    }
    
    return [
      styles.buttonText,
      variant === 'filled' && styles.filledText,
      variant === 'outlined' && styles.outlinedText,
      variant === 'text' && styles.textText,
      textStyle,
    ];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'filled' ? Colors.common.white : Colors.primary.main}
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && <>{icon}</>}
          <Text style={[getTextStyle(), icon && { marginLeft: iconPosition === 'left' ? 8 : 0, marginRight: iconPosition === 'right' ? 8 : 0 }]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && <>{icon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
    minHeight: 48,
  },
  filled: {
    backgroundColor: Colors.primary.main,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary.main,
  },
  text: {
    backgroundColor: 'transparent',
    paddingHorizontal: Layout.spacing.m,
  },
  filledDisabled: {
    backgroundColor: Colors.grey[300],
  },
  outlinedDisabled: {
    borderColor: Colors.grey[300],
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  filledText: {
    color: Colors.common.white,
  },
  outlinedText: {
    color: Colors.primary.main,
  },
  textText: {
    color: Colors.primary.main,
  },
  filledTextDisabled: {
    color: Colors.grey[500],
  },
  outlinedTextDisabled: {
    color: Colors.grey[500],
  },
  textTextDisabled: {
    color: Colors.grey[500],
  },
});