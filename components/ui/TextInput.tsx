import { useState } from 'react';
import { StyleSheet, TextInput as RNTextInput, View, Text, ViewStyle, TextInputProps as RNTextInputProps } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Feather } from '@expo/vector-icons';

interface TextInputProps extends RNTextInputProps {
  leftIcon?: React.ReactNode | string;
  rightIcon?: React.ReactNode;
  error?: string;
  label?: string;
  style?: ViewStyle;
}

export const TextInput = ({
  leftIcon,
  rightIcon,
  error,
  label,
  style,
  ...rest
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    rest.onFocus && rest.onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    rest.onBlur && rest.onBlur(e);
  };

  const getIconComponent = (icon: string | React.ReactNode) => {
    if (typeof icon === 'string') {
      return <Feather name={icon as any} size={20} color={Colors.grey[500]} />;
    }
    return icon;
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        !!error && styles.inputContainerError,
      ]}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {getIconComponent(leftIcon)}
          </View>
        )}
        
        <RNTextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
          ]}
          placeholderTextColor={Colors.grey[400]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.grey[300],
    borderRadius: Layout.borderRadius.medium,
    backgroundColor: Colors.common.white,
  },
  inputContainerFocused: {
    borderColor: Colors.primary.main,
  },
  inputContainerError: {
    borderColor: Colors.error.main,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: Layout.spacing.m,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.primary,
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  leftIconContainer: {
    paddingLeft: Layout.spacing.m,
  },
  rightIconContainer: {
    paddingRight: Layout.spacing.m,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.error.main,
    marginTop: Layout.spacing.xs,
  },
});