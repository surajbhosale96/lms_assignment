import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface FilterControlsProps {
  selectedInstructor: string;
  onInstructorChange: (value: string) => void;
  instructors: (string | number)[];
  showLongTitles: boolean;
  onToggleLongTitles: (value: boolean) => void;
  sortAsc: boolean;
  onToggleSort: (asc: boolean) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  selectedInstructor,
  onInstructorChange,
  instructors,
  showLongTitles,
  onToggleLongTitles,
  sortAsc,
  onToggleSort,
}) => (
  <View style={styles.filterSection}>
    <View style={styles.pickerWrapper}>
      <Text style={styles.label}>Filter by Instructor:</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={selectedInstructor}
          onValueChange={onInstructorChange}
          style={styles.picker}
          dropdownIconColor="#00796b"
        >
          <Picker.Item label="All Instructors" value="All" />
          {instructors
            .filter(id => id !== 'All')
            .map((id, index) => (
              <Picker.Item label={`Instructor ${id}`} value={String(id)} key={index} />
            ))}
        </Picker>
      </View>
    </View>

    <View style={styles.toggleRow}>
      <Text style={styles.label}>Only Long Titles:</Text>
      <Switch value={showLongTitles} onValueChange={onToggleLongTitles} />
    </View>

    <View style={styles.sortRow}>
      <Text style={styles.label}>Sort by Word Count:</Text>
      <View style={styles.sortButtons}>
        <Pressable
          style={[styles.sortBtn, sortAsc && styles.sortActive]}
          onPress={() => onToggleSort(true)}
        >
          <Text style={sortAsc ? styles.sortTextActive : styles.sortText}>Asc</Text>
        </Pressable>
        <Pressable
          style={[styles.sortBtn, !sortAsc && styles.sortActive]}
          onPress={() => onToggleSort(false)}
        >
          <Text style={!sortAsc ? styles.sortTextActive : styles.sortText}>Desc</Text>
        </Pressable>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  filterSection: { marginBottom: 16 },
  pickerWrapper: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4, color: '#333' },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 12,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  sortBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  sortActive: {
    backgroundColor: '#00796b',
  },
  sortText: {
    fontSize: 14,
    color: '#333',
  },
  sortTextActive: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FilterControls;
