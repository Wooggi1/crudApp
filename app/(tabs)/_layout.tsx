import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="cadastro"
        options={{
          title: 'Cadastro',
          headerTitle: 'Cadastro de Musicas',
        }}
      />
      <Tabs.Screen
        name="listagem"
        options={{
          title: 'Listagem',
          headerTitle: 'Músicas Cadastradas',
        }}
      />
      <Tabs.Screen
        name="edit"
        options={{
          title: 'Edit',
          headerTitle: 'Editar Música',
        }}
      />
    </Tabs>
  );
}
