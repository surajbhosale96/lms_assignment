import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface Props {
  query: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<Props> = ({ query, onChange }) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search by title..."
        value={query}
        onChangeText={onChange}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  input: {
    fontSize: 16,
  },
});

export default SearchBar;
