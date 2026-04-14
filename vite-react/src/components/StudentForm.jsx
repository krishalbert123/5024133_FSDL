import { useEffect, useState } from 'react'

const initialFormState = {
  name: '',
  email: '',
  age: '',
  course: ''
}

function StudentForm({ onSubmit, editingStudent, onCancel }) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        email: editingStudent.email,
        age: String(editingStudent.age),
        course: editingStudent.course
      })
      setMessage('You are editing an existing student.')
      setErrors({})
    } else {
      setFormData(initialFormState)
      setMessage('')
      setErrors({})
    }
  }, [editingStudent])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const validationErrors = {}

    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required.'
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'Enter a valid email address.'
    }

    if (!formData.age.trim()) {
      validationErrors.age = 'Age is required.'
    } else if (Number(formData.age) <= 0) {
      validationErrors.age = 'Enter a valid age.'
    }

    if (!formData.course.trim()) {
      validationErrors.course = 'Course is required.'
    }

    return validationErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setMessage('Please fix the errors before submitting.')
      return
    }

    const studentPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
      course: formData.course.trim()
    }

    onSubmit(studentPayload)

    if (!editingStudent) {
      setFormData(initialFormState)
      setErrors({})
      setMessage('Student registered successfully!')
    } else {
      setMessage('Student updated successfully!')
    }
  }

  const handleReset = () => {
    setFormData(initialFormState)
    setErrors({})
    setMessage('')

    if (editingStudent && onCancel) {
      onCancel()
    }
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h2>{editingStudent ? 'Edit Student Details' : 'Student Registration Form'}</h2>
        <p>Use controlled inputs, validate the form, and submit student data.</p>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label htmlFor="name">Name <span className="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter full name"
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="email">Email <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter email address"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label htmlFor="age">Age <span className="required">*</span></label>
          <input
            type="number"
            id="age"
            name="age"
            min="1"
            value={formData.age}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter age"
          />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="course">Course <span className="required">*</span></label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="select-field"
          >
            <option value="">Select course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Fine Arts">Fine Arts</option>
            <option value="Design">Design</option>
            <option value="Mathematics">Mathematics</option>
          </select>
          {errors.course && <p className="error-text">{errors.course}</p>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingStudent ? 'Update Student' : 'Register Student'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          {editingStudent ? 'Cancel' : 'Clear'}
        </button>
      </div>

      {message && <p className="status-message">{message}</p>}
    </form>
  )
}

export default StudentForm
