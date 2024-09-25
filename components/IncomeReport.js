import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IncomeReport({ cashFlow }) {
  const calculateTotalIncomeByMethod = (method) => {
    return cashFlow
      .filter(item => item.type === 'income' && item.method === method)
      .reduce((total, item) => total + item.amount, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Vendas Açai Online</Text>
      <View style={styles.incomeContainer}>
        <Text style={styles.subtitle}>Dinheiro</Text>
        <Text style={styles.itemText}>R${calculateTotalIncomeByMethod('Dinheiro')}</Text>
      </View>
      <View style={styles.incomeContainer}>
        <Text style={styles.subtitle}>Cartão</Text>
        <Text style={styles.itemText}>R${calculateTotalIncomeByMethod('Cartão')}</Text>
      </View>
      <View style={styles.incomeContainer}>
        <Text style={styles.subtitle}>Online</Text>
        <Text style={styles.itemText}>R${calculateTotalIncomeByMethod('Online')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green', // Fundo verde
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Texto branco para contraste
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: 'white', // Texto branco para contraste
  },
  incomeContainer: {
    marginBottom: 20,
  },
  itemText: {
    color: 'purple', // Texto roxo
    fontSize: 30, // Aumentar o tamanho da fonte
    fontWeight: 'bold',
  },
});