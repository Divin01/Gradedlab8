import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    const trimmedText = taskText.trim();
    if (trimmedText === '') {
      Alert.alert('Error', 'Please enter a task.');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: trimmedText,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        style={styles.taskMain} 
        onPress={() => toggleTask(item.id)}
      >
        <Text style={styles.checkbox}>
          {item.done ? '☑' : '□'}
        </Text>
        <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>To Do List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'aliceblue',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'dodgerblue',
    letterSpacing: 1,
    paddingTop: 40,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'dodgerblue',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },
  taskMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    fontSize: 18,
    marginLeft: 10,
  },
});