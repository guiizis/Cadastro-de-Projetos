import React, { useEffect, useState } from 'react'

import './style.css'
// import BackGround from '../src/assets/background.jfif'
import { api } from './services/api'

import { Header } from './component/header'
export function App() {
  const [projects, SetProjects] = useState([])

  useEffect(() => {
    api.get("projects")
      .then(response => SetProjects(response.data))
  }, [])

  function handleNewProject() {
    // SetProjects([...projects, `teste de projeto: ${Date.now()}`])

    api.post("projects", {
      title: `teste de projeto: ${Date.now()}`,
      owner: "anonimo"
    }).then(response => SetProjects([...projects, response.data]))


  }

  return (
    <>
      <Header title="Teste" />
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleNewProject}>Adicionar um Projeto</button>

    </>
  )
}