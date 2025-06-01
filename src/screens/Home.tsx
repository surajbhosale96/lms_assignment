import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import CourseItem from '../components/CourseItem';
import FilterControls from '../components/FilterControls';

interface Course {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function Home({ navigation }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedInstructor, setSelectedInstructor] = useState('All');
  const [showLongTitles, setShowLongTitles] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCourses = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCourses(data);
      await AsyncStorage.setItem('cachedCourses', JSON.stringify(data));
    } catch {
      const cached = await AsyncStorage.getItem('cachedCourses');
      if (cached) setCourses(JSON.parse(cached));
      else setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    if (favs) setFavorites(JSON.parse(favs));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const instructors = useMemo(() => {
    const ids = [...new Set(courses.map(c => c.userId))];
    return ['All', ...ids];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    let data = [...courses];

    if (selectedInstructor !== 'All') {
      data = data.filter(c => String(c.userId) === selectedInstructor);
    }

    if (showLongTitles) {
      data = data.filter(c => c.title.trim().split(/\s+/).length >= 5);
    }

    if (searchTerm.trim()) {
      data = data.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    data.sort((a, b) => {
      const aLen = a.title.trim().split(/\s+/).length;
      const bLen = b.title.trim().split(/\s+/).length;
      return sortAsc ? aLen - bLen : bLen - aLen;
    });

    return data;
  }, [courses, selectedInstructor, showLongTitles, sortAsc, searchTerm]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error fetching courses.</Text>
        <Button title="Retry" onPress={fetchCourses} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by title..."
        style={styles.searchBar}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FilterControls
        selectedInstructor={selectedInstructor}
        onInstructorChange={setSelectedInstructor}
        instructors={instructors}
        showLongTitles={showLongTitles}
        onToggleLongTitles={setShowLongTitles}
        sortAsc={sortAsc}
        onToggleSort={setSortAsc}
      />

      {filteredCourses.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: '#888' }}>
            No courses match your search or filters.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CourseItem
              item={item}
              isFavorite={favorites.includes(item.id)}
              onPress={() => navigation.navigate('Detail', { course: item })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16, marginBottom: 10 },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
});
