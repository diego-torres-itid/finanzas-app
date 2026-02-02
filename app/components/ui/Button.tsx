import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  testID?: string;
  variant?: 'primary' | 'secondary';
};

export default function Button({ title = 'Button', onPress, testID, variant = 'primary' }: ButtonProps) {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      className="self-stretch h-14 rounded-full items-center justify-center mx-4 my-2"
      style={{ 
        backgroundColor: isPrimary ? '#1A1A1A' : '#ffffff',
        borderWidth: isPrimary ? 0 : 1,
        borderColor: isPrimary ? 'transparent' : '#1A1A1A'
      }}
    >
      <Text 
        className="text-base font-bold leading-6"
        style={{ color: isPrimary ? '#FFFFFF' : '#1A1A1A' }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
