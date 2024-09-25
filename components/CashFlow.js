import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CashFlow({ cashFlow, setCashFlow, userRole }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(''); // Estado para o método de pagamento
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [totalProfit, setTotalProfit] = useState(0);

  const addTransaction = () => {
    const newCashFlow = [...cashFlow, { type: 'income', amount: parseFloat(amount), method, date: new Date() }];
    setCashFlow(newCashFlow);
    setAmount('');
    setMethod('');
    calculateTotalProfit(newCashFlow);
  };

  const addExpense = () => {
    const newCashFlow = [...cashFlow, { type: 'expense', amount: parseFloat(expenseAmount), description: expenseDescription, date: new Date() }];
    setCashFlow(newCashFlow);
    setExpenseAmount('');
    setExpenseDescription('');
    calculateTotalProfit(newCashFlow);
  };

  const calculateTotalProfit = (cashFlow) => {
    let totalIncome = 0;
    let totalExpense = 0;

    cashFlow.forEach(item => {
      if (item.type === 'income') {
        totalIncome += item.amount;
      } else if (item.type === 'expense') {
        totalExpense += item.amount;
      }
    });

    setTotalProfit(totalIncome - totalExpense);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fluxo de Caixa</Text>
      
      <Text style={styles.subtitle}>Adicionar Vendas</Text>
      <TextInput
        style={styles.input}
        placeholder="Custo R$"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={method}
        onValueChange={(itemValue) => setMethod(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o Método de Pagamento" value="" />
        <Picker.Item label="Dinheiro" value="Dinheiro" />
        <Picker.Item label="Cartão" value="Cartão" />
        <Picker.Item label="Online" value="Online" />
        <Picker.Item label="Pix" value="Pix" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={addTransaction}>
        <Text style={styles.buttonText}>Adicionar Item</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Adicionar Despesas</Text>
      <TextInput
        style={styles.input}
        placeholder="Custo R$"
        value={expenseAmount}
        onChangeText={setExpenseAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={expenseDescription}
        onChangeText={setExpenseDescription}
      />
      <TouchableOpacity style={styles.button} onPress={addExpense}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        data={cashFlow}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {item.type === 'income' ? (
              <Text>Venda - {item.method}: R${item.amount} - {formatDate(item.date)}</Text>
            ) : (
              <Text>Despesa - {item.description}: R${item.amount} - {formatDate(item.date)}</Text>
            )}
          </View>
        )}
      />

      {userRole === 'admin' && (
        <Text style={styles.profit}>Total Lucro Diário: R${totalProfit}</Text>
      )}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Fundo branco para os inputs
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white', // Fundo branco para o picker
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'purple', // Fundo roxo para os botões
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white', // Texto branco para contraste
    fontWeight: 'bold',
  },
  profit: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'white', // Texto branco para contraste
  },
});