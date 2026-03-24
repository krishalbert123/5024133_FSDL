import { useState } from 'react'
import './App.css'

// ============================================
// STUDENT REGISTRATION WEBSITE
// Demonstrates: Components, Props, State, Forms, Events
// ============================================

// Component 1: Input Field Component (receives props)
function InputField({ label, name, type, value, onChange, required }) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label} {required && <span className="required">*</span>}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field"
      />
    </div>
  )
}

// Component 2: Select Field Component (receives props)
function SelectField({ label, name, value, onChange, options, required }) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label} {required && <span className="required">*</span>}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="select-field"
      >
        <option value="">-- Select {label} --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

// Component 3: Registration Form Component (manages form state)
function RegistrationForm({ onSubmit }) {
  // State management for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    course: '',
    address: '',
    country: '',
    agreeTerms: false
  })

  // State for form validation errors
  const [errors, setErrors] = useState({})

  // Event handler for input changes (for all input fields)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field when user starts editing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.dob) newErrors.dob = 'Date of birth is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.course) newErrors.course = 'Course is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms'
    return newErrors
  }

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData)
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        course: '',
        address: '',
        country: '',
        agreeTerms: false
      })
      setErrors({})
    } else {
      setErrors(newErrors)
    }
  }

  // Event handler for reset button
  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      course: '',
      address: '',
      country: '',
      agreeTerms: false
    })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Student Registration Form</h2>
      
      <div className="form-row">
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          required={true}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}

        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          required={true}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required={true}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <div className="form-row">
        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required={true}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <InputField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleInputChange}
          required={true}
        />
        {errors.dob && <span className="error">{errors.dob}</span>}
      </div>

      <div className="form-row">
        <SelectField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          options={['Male', 'Female', 'Other']}
          required={true}
        />
        {errors.gender && <span className="error">{errors.gender}</span>}

        <SelectField
          label="Course"
          name="course"
          value={formData.course}
          onChange={handleInputChange}
          options={['BCA', 'B.Tech', 'BSc', 'B.Com', 'BA']}
          required={true}
        />
        {errors.course && <span className="error">{errors.course}</span>}
      </div>

      <InputField
        label="Address"
        name="address"
        type="text"
        value={formData.address}
        onChange={handleInputChange}
        required={false}
      />

      <SelectField
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        options={['India', 'USA', 'UK', 'Canada', 'Australia']}
        required={true}
      />
      {errors.country && <span className="error">{errors.country}</span>}

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="agreeTerms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleInputChange}
          className="checkbox-input"
        />
        <label htmlFor="agreeTerms">I agree to the terms and conditions</label>
        {errors.agreeTerms && <span className="error">{errors.agreeTerms}</span>}
      </div>

      <div className="button-group">
        <button type="submit" className="btn btn-primary">Register</button>
        <button type="reset" onClick={handleReset} className="btn btn-secondary">Reset</button>
      </div>
    </form>
  )
}

// Component 4: Student Card Component (displays individual student - receives props)
function StudentCard({ student, onDelete }) {
  return (
    <div className="student-card">
      <div className="student-header">
        <h3>{student.firstName} {student.lastName}</h3>
        <button 
          onClick={() => onDelete(student.id)}
          className="btn-delete"
          title="Delete this student"
        >
          ✕
        </button>
      </div>
      <div className="student-details">
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>DOB:</strong> {student.dob}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Address:</strong> {student.address || 'N/A'}</p>
        <p><strong>Country:</strong> {student.country}</p>
      </div>
    </div>
  )
}

// Component 5: Student List Component (displays all students - receives props)
function StudentList({ students, onDelete, totalCount }) {
  return (
    <div className="student-list-section">
      <div className="list-header">
        <h2>Registered Students</h2>
        <span className="student-count">Total: {totalCount}</span>
      </div>
      
      {students.length === 0 ? (
        <div className="no-students">
          <p>No students registered yet. Fill the form to register!</p>
        </div>
      ) : (
        <div className="students-grid">
          {students.map((student) => (
            <StudentCard 
              key={student.id} 
              student={student}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Main Component: App (manages overall state)
function App() {
  // State management for students list
  const [students, setStudents] = useState([])

  // Event handler for new student registration
  const handleStudentRegistration = (formData) => {
    const newStudent = {
      id: Date.now(), // Simple ID generation
      ...formData
    }
    setStudents(prev => [...prev, newStudent])
    alert(`${formData.firstName} ${formData.lastName} registered successfully!`)
  }

  // Event handler for deleting a student
  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(student => student.id !== studentId))
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎓 Student Registration Portal</h1>
        <p>React App demonstrating Components, Props, State, Forms, and Events</p>
      </header>

      <main className="app-main">
        <div className="form-section">
          <RegistrationForm onSubmit={handleStudentRegistration} />
        </div>

        <div className="list-section">
          <StudentList 
            students={students}
            onDelete={handleDeleteStudent}
            totalCount={students.length}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Student Registration Portal | Built with React</p>
      </footer>
    </div>
  )
}

export default App