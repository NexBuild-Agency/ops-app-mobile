import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

type ParkingRulesProps = {
  rules: string;
};

const ParkingRules = ({ rules }: ParkingRulesProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>RULES</Text>
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {expanded ? (
            <ChevronUp size={20} color={Colors.textSecondary} />
          ) : (
            <ChevronDown size={20} color={Colors.textSecondary} />
          )}
        </TouchableOpacity>
      </View>
      
      <Text 
        style={styles.rulesText}
        numberOfLines={expanded ? undefined : 2}
      >
        {rules}
      </Text>
      
      {!expanded && rules.length > 100 && (
        <TouchableOpacity onPress={() => setExpanded(true)}>
          <Text style={styles.moreText}>more...</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  rulesText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  moreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
    marginTop: 4,
  },
});

export default ParkingRules;