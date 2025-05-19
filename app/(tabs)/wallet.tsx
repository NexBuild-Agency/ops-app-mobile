import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userProfile } from '@/data/mockData';
import Colors from '@/constants/Colors';
import PaymentCard from '@/components/PaymentCard';
import { PlusCircle, CreditCard } from 'lucide-react-native';

export default function WalletScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Wallet</Text>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>$120.00</Text>
        <TouchableOpacity style={styles.addButton}>
          <PlusCircle size={20} color={Colors.white} style={{ marginRight: 8 }} />
          <Text style={styles.addButtonText}>Add Money</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <TouchableOpacity>
            <Text style={styles.addCardText}>+ Add Card</Text>
          </TouchableOpacity>
        </View>
        
        {userProfile.cards.length > 0 ? (
          <FlatList
            data={userProfile.cards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PaymentCard card={item} />}
            contentContainerStyle={styles.cardsList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <CreditCard size={64} color={Colors.gray} />
            <Text style={styles.emptyTitle}>No Cards Added</Text>
            <Text style={styles.emptyText}>
              Add a credit or debit card to make payments easier.
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        
        <View style={styles.transaction}>
          <View>
            <Text style={styles.transactionTitle}>Capital University Parking</Text>
            <Text style={styles.transactionDate}>Sep 24, 2020</Text>
          </View>
          <Text style={styles.transactionAmount}>-$4.00</Text>
        </View>
        
        <View style={styles.transaction}>
          <View>
            <Text style={styles.transactionTitle}>Wallet Recharge</Text>
            <Text style={styles.transactionDate}>Sep 20, 2020</Text>
          </View>
          <Text style={[styles.transactionAmount, styles.creditAmount]}>+$50.00</Text>
        </View>
      </View>
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
  balanceContainer: {
    backgroundColor: Colors.primary,
    padding: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    color: Colors.white,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.white,
  },
  cardsSection: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  addCardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  cardsList: {
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  emptyTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  transactionsSection: {
    padding: 24,
    borderTopWidth: 8,
    borderTopColor: Colors.grayLight,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  transactionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  transactionDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  transactionAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.error,
  },
  creditAmount: {
    color: Colors.success,
  },
});