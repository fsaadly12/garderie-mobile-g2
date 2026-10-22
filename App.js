
import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, StatusBar,
  TouchableOpacity, FlatList, Alert, Modal,
} from 'react-native';

const menus = [
  { id: 1, titre: 'Petit déjeuner', description: 'Lait, céréales et fruits', icone: '🥣' },
  { id: 2, titre: 'Déjeuner', description: 'Poulet, riz et légumes', icone: '🍲' },
  { id: 3, titre: 'Goûter', description: 'Biscuit et compote de pomme', icone: '🍪' },
  { id: 4, titre: 'Jus de fruits', description: "Jus d'orange naturel", icone: '🍊' },
  { id: 5, titre: 'Fruits frais', description: 'Une sélection de fruits de saison', icone: '🍎' },
];

export default function App() {
  const [splash, setSplash] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [page, setPage] = useState('Accueil');

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (splash) {
    return (
      <View style={styles.splash}>
        <StatusBar hidden />
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900' }}
          style={styles.splashImage}
        />
        <Text style={styles.splashTitle}>Ma Garderie</Text>
        <Text style={styles.splashText}>Bienvenue dans notre garderie</Text>
      </View>
    );
  }

  const message = (text) => Alert.alert(text);

  const renderMenu = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => message(item.titre)}>
      <Text style={styles.menuIcon}>{item.icone}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>{item.titre}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#16866b" barStyle="light-content" />

      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => setDrawer(true)} style={styles.iconButton}>
          <Text style={styles.appBarIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Ma Garderie</Text>
        <TouchableOpacity onPress={() => message('Rechercher un menu')} style={styles.iconButton}>
          <Text style={styles.appBarIcon}>⌕</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => message('Aucune notification')} style={styles.iconButton}>
          <Text style={styles.appBarIcon}>♧</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {page === 'Accueil' ? 'Menus du jour' : page}
        </Text>

        {page === 'À propos' ? (
          <Text>Bienvenue dans notre garderie</Text>
        ) : (
          <FlatList
            data={menus}
            renderItem={renderMenu}
            keyExtractor={(item) => String(item.id)}
          />
        )}
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => message('Ajouter un menu')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={drawer} transparent animationType="fade"
        onRequestClose={() => setDrawer(false)}>
        <View style={styles.drawerOverlay}>
          <TouchableOpacity style={styles.backdrop} onPress={() => setDrawer(false)} />
          <View style={styles.drawer}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Ma Garderie</Text>
            </View>
            {['Accueil', 'Menus', 'À propos'].map((item) => (
              <TouchableOpacity key={item} style={styles.drawerItem}
                onPress={() => { setPage(item); setDrawer(false); }}>
                <Text style={styles.drawerText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f7f6' },
  splash: { flex: 1, backgroundColor: '#16866b', alignItems: 'center', justifyContent: 'center', padding: 24 },
  splashImage: { width: 240, height: 240, borderRadius: 120, marginBottom: 30 },
  splashTitle: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  splashText: { fontSize: 18, color: '#fff', textAlign: 'center' },
  appBar: { height: 60, backgroundColor: '#16866b', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
  appBarTitle: { flex: 1, color: '#fff', fontSize: 20, fontWeight: 'bold' },
  iconButton: { padding: 10 },
  appBarIcon: { fontSize: 24, color: '#fff' },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#174b3e', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  menuIcon: { fontSize: 34, marginRight: 16 },
  menuTitle: { fontSize: 17, fontWeight: 'bold', color: '#243b35' },
  menuDescription: { fontSize: 14, color: '#64748b', marginTop: 5 },
  fab: { position: 'absolute', right: 22, bottom: 24, width: 58, height: 58, borderRadius: 29, backgroundColor: '#16866b', alignItems: 'center', justifyContent: 'center', elevation: 5 },
  fabText: { fontSize: 34, color: '#fff', marginTop: -3 },
  drawerOverlay: { flex: 1, flexDirection: 'row', backgroundColor: '#0007' },
  backdrop: { flex: 1 },
  drawer: { width: 280, backgroundColor: '#fff' },
  drawerHeader: { backgroundColor: '#16866b', padding: 28, paddingTop: 55 },
  drawerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  drawerItem: { paddingVertical: 19, paddingHorizontal: 22 },
  drawerText: { fontSize: 17, color: '#243b35' },
});
