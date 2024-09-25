import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ExpenseReport({ cashFlow }) {
  const filterExpenses = () => {
    return cashFlow.filter(item => item.type === 'expense');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Despesas</Text>
      <FlatList
        data={filterExpenses()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.description}: R${item.amount}</Text>
          </View>
        )}
      />
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
  itemContainer: {
    marginBottom: 20,
  },
  itemText: {
    color: 'purple', // Texto roxo
    fontSize: 30, // Aumentar o tamanho da fonte
  },
  });