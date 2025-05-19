import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from '@/types';
import Colors from '@/constants/Colors';

type PaymentCardProps = {
  card: Card;
};

const PaymentCard = ({ card }: PaymentCardProps) => {
  // Display only last 4 digits of card
  const lastFourDigits = card.cardNumber.slice(-4);
  
  // Get card logo based on type
  const getCardLogo = () => {
    switch (card.cardType) {
      case 'visa':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png';
      case 'mastercard':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png';
      case 'amex':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png';
      default:
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Image 
          source={{ uri: getCardLogo() }}
          style={styles.cardLogo}
          resizeMode="contain"
        />
        <Text style={styles.cardType}>{card.cardType.toUpperCase()}</Text>
      </View>
      
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Card Number</Text>
          <Text style={styles.detailValue}>•••• •••• •••• {lastFourDigits}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Card Holder</Text>
          <Text style={styles.detailValue}>{card.cardHolder}</Text>
        </View>
        
        <View style={styles.cardFooter}>
          <View style={styles.detailCol}>
            <Text style={styles.detailLabel}>CVV</Text>
            <Text style={styles.detailValue}>{card.cvv}</Text>
          </View>
          
          <View style={styles.detailCol}>
            <Text style={styles.detailLabel}>EXP</Text>
            <Text style={styles.detailValue}>{card.expiryDate}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardLogo: {
    width: 60,
    height: 30,
  },
  cardType: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  cardDetails: {
    marginTop: 8,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailCol: {
    flex: 1,
  },
});

export default PaymentCard;