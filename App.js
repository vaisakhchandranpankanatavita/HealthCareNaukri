import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createTodo} from './src/graphql/mutations';
import {listTodos} from './src/graphql/queries';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

// retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user]

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
r      </Text>
    </Pressable>
  );
};

const initialFormState = {name: 'kochan', dateOfBirth: '1970-01-01Z',country:'India',state:'kerala'};

const App = () => {
  const [formState, setFormState] = useState(initialFormState);
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState(new Date()); 
  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({...formState, [key]: value});
  }
  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    setDate(selectedDate || date);
  };

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  async function addTodo() {
    console.log('step 1')
    try {
      if (!formState.name || !formState.state) return;
      const todo = {...formState};
      setTodos([...todos, todo]);
      setFormState(initialFormState);
      await API.graphql(graphqlOperation(createTodo, {input: todo}));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }
  useEffect(() => {
    console.log(formState)
  },[formState])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SignOutButton />
        <TextInput
          onChangeText={value => setInput('name', value)}
          style={styles.input}
          value={formState.name}
          placeholder="Name"
        />
        <TextInput
          onChangeText={value => setInput('description', value)}
          style={styles.input}
          value={formState.dateOfBirth}
          placeholder="Description"
        />
          <TextInput
          onChangeText={value => setInput('dateOfBirth', value)}
          style={styles.input}
          value={formState.dateOfBirth}
          placeholder="DOB"
        />
         <TextInput
          onChangeText={value => setInput('country', value)}
          style={styles.input}
          value={formState.country}
          place holder="Country"
        />
        <Pressable onPress={addTodo} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Create todo</Text>
        </Pressable>
      
        {todos.map((todo, index) => (
          <View key={todo.id ? todo.id : index} style={styles.todo}>
            <Text style={styles.todoName}>{todo.name}</Text>
            <Text style={styles.todoDescription}>{todo.description}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {width: 400, flex: 1, padding: 20, alignSelf: 'center'},
  todo: {marginBottom: 15},
  input: {backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
  todoName: {fontSize: 20, fontWeight: 'bold'},
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});