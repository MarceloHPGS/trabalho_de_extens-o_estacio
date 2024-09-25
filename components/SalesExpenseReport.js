import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SalesExpenseReport({ cashFlow }) {
  const getCurrentWeek = () => {
    const currentDate = new Date();
    const startOfWeek = currentDate.getDate() - currentDate.getDay();
    const endOfWeek = startOfWeek + 6;
    return [new Date(currentDate.setDate(startOfWeek)), new Date(currentDate.setDate(endOfWeek))];
  };

  const getCurrentMonth = () => {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return [startOfMonth, endOfMonth];
  };

  const filterByDateRange = (startDate, endDate) => {
    return cashFlow.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const calculateTotals = (items) => {
    let totalSales = 0;
    let totalExpenses = 0;

    items.forEach(item => {
      if (item.type === 'income') {
        totalSales += item.amount;
      } else if (item.type === 'expense') {
        totalExpenses += item.amount;
      }
    });

    return { totalSales, totalExpenses };
  };

  const [startOfWeek, endOfWeek] = getCurrentWeek();
  const [startOfMonth, endOfMonth] = getCurrentMonth();

  const weeklyItems = filterByDateRange(startOfWeek, endOfWeek);
  const monthlyItems = filterByDateRange(startOfMonth, endOfMonth);

  const weeklyTotals = calculateTotals(weeklyItems);
  const monthlyTotals = calculateTotals(monthlyItems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório Semanal</Text>
      <Text style={styles.reportText}>Vendas: R${weeklyTotals.totalSales}</Text>
      <Text style={styles.reportText}>Despesas: R${weeklyTotals.totalExpenses}</Text>

      <Text style={styles.title}>Relatório Mensal</Text>
      <Text style={styles.reportText}>Vendas: R${monthlyTotals.totalSales}</Text>
      <Text style={styles.reportText}>Despesas: R${monthlyTotals.totalExpenses}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple', // Fundo verde
    padding: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    color: 'white', // Texto branco para contraste
    fontWeight: 'bold',
    backgroundColor: 'green', // Fundo roxo para os botões
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  reportText: {
    fontSize: 22,
    marginBottom: 10,
    color: 'white', // Texto branco para contraste
  },
});