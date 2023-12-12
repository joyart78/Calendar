// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Calendar from './components/Calendar';

const App = () => {
  return (
      <View style={styles.container}>
        <Calendar />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
