import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  Container,
  Body,
  List,
  ContainerList,
  Text,
  Icon,
  Form,
  Input,
  Button
} from './styles';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const keyAsyncStorage = '@tasks'

  async function addTask() {
    const search = tasks.filter(task => task === newTask);

    if (search.length !== 0) {
      Alert.alert("Atenção", "Nome da tarefa repetido!");
      return;
    }

    setTasks([...tasks, newTask]);
    setNewTask("");

    Keyboard.dismiss();
  }

  async function removeTask(item) {
    Alert.alert(
      "Deletar Task",
      "Tem certeza que deseja remover esta anotação?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => setTasks(tasks.filter(tasks => tasks !== item))
        }
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(tasks));
    }
    salvaDados();
  }, [tasks]);

  useEffect(() => {
    async function carregaDados() {
      const task = await AsyncStorage.getItem(keyAsyncStorage);

      if (task) {
        setTasks(JSON.parse(task));
      }
    }
    carregaDados();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
        <Container>
          <Body>
            <List
              data={tasks}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ContainerList>
                  <Text>{item}</Text>
                  <Icon onPress={() => removeTask(item)}>
                    <MaterialIcons
                      name="delete-forever"
                      size={25}
                      color="#f64c75"
                    />
                  </Icon>
                </ContainerList>
              )}
            />
          </Body>

          <Form>
            <Input
              placeholderTextColor="#999"
              autoCorrect={true}
              value={newTask}
              placeholder="Adicione uma tarefa"
              maxLength={25}
              onChangeText={text => setNewTask(text)}
            />
            <Button onPress={() => addTask()}>
              <Ionicons name="ios-add" size={20} color="white" />
            </Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
}