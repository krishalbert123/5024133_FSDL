import { useEffect, useState } from 'react'
import StudentForm from './components/StudentForm.jsx'
import StudentList from './components/StudentList.jsx'
import './App.css'

function App() {
  const [students, setStudents] = useState(() => {
    try {
      const stored = localStorage.getItem('student_registration_students')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      return []
    }
  })

  const [editingStudent, setEditingStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    localStorage.setItem('student_registration_students', JSON.stringify(students))
  }, [students])

  const handleAddOrUpdateStudent = (studentData) => {
    if (editingStudent) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudent.id ? { ...student, ...studentData } : student
        )
      )
      setEditingStudent(null)
      return
    }

    const newStudent = {
      id: Date.now(),
      ...studentData
    }
    setStudents((prevStudents) => [newStudent, ...prevStudents])
  }

  const handleDeleteStudent = (studentId) => {
    const confirmed = window.confirm('Delete this student from the list?')
    if (!confirmed) return

    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId))

    if (editingStudent?.id === studentId) {
      setEditingStudent(null)
    }
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
  }

  const handleCancelEdit = () => {
    setEditingStudent(null)
  }

  const filteredStudents = students.filter((student) => {
    const lowerValue = searchTerm.toLowerCase()
    return (
      student.name.toLowerCase().includes(lowerValue) ||
      student.email.toLowerCase().includes(lowerValue) ||
      student.course.toLowerCase().includes(lowerValue)
    )
  })

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-inner">
          <h1>🎓 Student Registration Form System</h1>
          <p>Demonstrates React components, props, state, forms, and event handling.</p>
        </div>
      </header>

      <main className="app-main">
        <section className="form-section">
          <StudentForm
            onSubmit={handleAddOrUpdateStudent}
            editingStudent={editingStudent}
            onCancel={handleCancelEdit}
          />
        </section>

        <section className="list-section">
          <StudentList
            students={filteredStudents}
            onDelete={handleDeleteStudent}
            onEdit={handleEditStudent}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React, using functional components and hooks.</p>
      </footer>
    </div>
  )
}

export default App
