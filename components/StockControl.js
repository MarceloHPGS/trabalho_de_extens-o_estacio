import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function StockControl() {
  const [stock, setStock] = useState([]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [initialStock, setInitialStock] = useState({});

  const addItem = () => {
    const newStock = [...stock, { item, quantity: parseInt(quantity) }];
    setStock(newStock);
    setInitialStock({ ...initialStock, [item]: parseInt(quantity) });
    setItem('');
    setQuantity('');
  };

  const removeItem = (index) => {
    const newStock = [...stock];
    const itemName = newStock[index].item;
    if (newStock[index].quantity > 1) {
      newStock[index].quantity -= 1;
    } else {
      newStock.splice(index, 1);
    }
    setStock(newStock);
    checkStockLevel(itemName, newStock[index]?.quantity);
  };

  const checkStockLevel = (itemName, currentQuantity) => {
    const initialQuantity = initialStock[itemName];
    if (currentQuantity <= initialQuantity * 0.3) {
      Alert.alert(
        'ATENÇÃO',
        `O estoque do item "${itemName}" está abaixo de 30%.`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Estoque</Text>
      <TextInput
        style={styles.input}
        placeholder="Item"
        value={item}
        onChangeText={setItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>Adicionar Item</Text>
      </TouchableOpacity>
      <FlatList
        data={stock}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text>{item.item}: {item.quantity}</Text>
            <TouchableOpacity style={styles.button} onPress={() => removeItem(index)}>
              <Text style={styles.buttonText}>Remover Item</Text>
            </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Fundo branco para os inputs
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
  },
  buttonText: {
    color: 'white', // Texto branco para contraste
    fontWeight: 'bold',
  },
});