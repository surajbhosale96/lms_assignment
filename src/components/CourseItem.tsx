import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Course = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface Props {
  item: Course;
  isFavorite: boolean;
  onPress: () => void;
}

const CourseItem: React.FC<Props> = ({ item, isFavorite, onPress }) => {
  return (
    <TouchableOpacity style={styles.courseItem} onPress={onPress}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>Instructor ID: {item.userId}</Text>
      <Text style={styles.text}>Course ID: {item.id}</Text>
      <Text style={styles.text}>Description: {item.body}</Text>
      {isFavorite && <Text style={styles.favorite}>★ Favorite</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  courseItem: {
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#00796b',
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  favorite: {
    color: 'gold',
    marginTop: 6,
    fontWeight: 'bold',
  },
});

export default CourseItem;
