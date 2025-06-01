import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Details({ route }) {
  const { course } = route.params;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    checkFav();
  }, []);

  const checkFav = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    const parsed = favs ? JSON.parse(favs) : [];
    setIsFav(parsed.includes(course.id));
  };

  const toggleFavorite = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    let parsed = favs ? JSON.parse(favs) : [];
    if (parsed.includes(course.id)) {
      parsed = parsed.filter(id => id !== course.id);
    } else {
      parsed.push(course.id);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(parsed));
    setIsFav(!isFav);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.label}>Instructor ID: <Text style={styles.value}>{course.userId}</Text></Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.body}>{course.body}</Text>
        <Text style={styles.label}>Word Count: <Text style={styles.value}>{course.title.trim().split(/\s+/).length}</Text></Text>

        <TouchableOpacity
          style={[styles.favButton, isFav && styles.favActive]}
          onPress={toggleFavorite}
        >
          <Text style={styles.favText}>
            {isFav ? '★ Unmark Favorite' : '☆ Mark as Favorite'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: '#444',
  },
  value: {
    fontWeight: 'normal',
    color: '#666',
  },
  body: {
    fontSize: 15,
    color: '#555',
    marginTop: 5,
    lineHeight: 22,
  },
  favButton: {
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#00796b',
    alignItems: 'center',
  },
  favActive: {
    backgroundColor: '#c62828',
  },
  favText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
