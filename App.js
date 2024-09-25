import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StockControl from './components/StockControl';
import CashFlow from './components/CashFlow';
import IncomeReport from './components/IncomeReport';
import ExpenseReport from './components/ExpenseReport';
import SalesExpenseReport from './components/SalesExpenseReport';
import LoginScreen from './components/LoginScreen'; 


const Tab = createBottomTabNavigator();

export default function App() {
  const [cashFlow, setCashFlow] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação
  const [userRole, setUserRole] = useState(''); // Estado para o papel do usuário

  if (!isAuthenticated) {
    return <LoginScreen setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Controle de Estoque" component={StockControl} />
        <Tab.Screen name="Fluxo de Caixa">
          {() => <CashFlow cashFlow={cashFlow} setCashFlow={setCashFlow} />}
        </Tab.Screen>
        {userRole === 'admin' && (
          <>
            <Tab.Screen name="Relatório de Vendas">
              {() => <IncomeReport cashFlow={cashFlow} />}
            </Tab.Screen>
            <Tab.Screen name="Relatório de Despesas">
              {() => <ExpenseReport cashFlow={cashFlow} />}
            </Tab.Screen>
            <Tab.Screen name="Relatório Semanal e Mensal">
              {() => <SalesExpenseReport cashFlow={cashFlow} />}
            </Tab.Screen>
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}