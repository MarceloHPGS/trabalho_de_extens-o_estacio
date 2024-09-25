import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ setIsAuthenticated, setUserRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implementar lógica de autenticação aqui
    if (username === 'Admin' || 'admin' && password === '0308') {
      setUserRole('admin');
      setIsAuthenticated(true);
    } else if (username === 'User' || 'user' && password === '1234') {
      setUserRole('user');
      setIsAuthenticated(true);
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '80%',
  },
  button: {
    backgroundColor: 'purple', // Fundo roxo para os botões
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white', // Texto branco para contraste
    fontWeight: 'bold',
  },
});