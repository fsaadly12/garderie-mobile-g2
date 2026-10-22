
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // La navigation vers la page principale sera ajoutée
      // dans l'étape home-page.
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900',
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>Ma Garderie</Text>

      <Text style={styles.subtitle}>
        Bienvenue dans notre garderie
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16866b',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 240,
    height: 240,
    borderRadius: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
});
