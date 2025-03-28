"use client"

import { useState } from 'react'
import { Plus, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Task = {
  id: number
  title: string
  completed: boolean
  priority: 'alta' | 'media' | 'baja'
}

export function QuickTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Revisar informe mensual", completed: false, priority: 'alta' },
    { id: 2, title: "Actualizar documentación", completed: false, priority: 'media' },
    { id: 3, title: "Preparar presentación", completed: true, priority: 'baja' }
  ])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          completed: false,
          priority: 'media'
        }
      ])
      setNewTask("")
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tareas Rápidas</CardTitle>
        <CardDescription>
          Gestiona tus tareas pendientes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Agregar nueva tarea..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-2 rounded-lg border ${
                task.completed ? 'bg-muted' : 'bg-background'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTask(task.id)}
                >
                  <Check className={`h-4 w-4 ${
                    task.completed ? 'text-green-500' : 'text-muted-foreground'
                  }`} />
                </Button>
                <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                  {task.title}
                </span>
                <Badge variant={
                  task.priority === 'alta' ? 'destructive' :
                  task.priority === 'media' ? 'default' :
                  'secondary'
                }>
                  {task.priority}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTask(task.id)}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 