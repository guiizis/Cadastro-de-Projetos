import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, StatusBar, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { api } from './services/api'

export function App() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get("/projects").then(response => setProjects(response.data))
  }, [])

  async function handleNewProject() {
    const newProject = await api.post("/projects", {
      title: `the new Project was added at: ${Date.now()}`,
      owner: "anonnimus user"
    })
    const dataOfNewProject = newProject.data

    setProjects([...projects, dataOfNewProject])
  }

  return (
    <>
      <StatusBar backgroundColor="#7159c1" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={item => item.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        >
        </FlatList>
        <TouchableOpacity activeOpacity={0.7} style={styles.btnSend} onPress={handleNewProject}>
          <Text style={styles.btnText}> Adicionar um Novo Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </>)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1"
  },

  project: {
    fontSize: 20,
    color: '#fff',
  },
  btnSend: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
  }
})