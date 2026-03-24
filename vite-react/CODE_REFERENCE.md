# React Concepts - Code Reference Guide

A detailed code reference showing how each React concept is implemented in the Student Registration Portal.

---

## 1️⃣ COMPONENTS

### What are Components?
Components are reusable, independent pieces of the UI. They are JavaScript functions that return JSX (React elements).

### Component Types Used

#### Function Component - InputField
```jsx
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
```

**Component Characteristics:**
- ✅ Returns JSX (React elements)
- ✅ Receives and uses props
- ✅ Can be reused multiple times
- ✅ Pure function (no side effects)

#### Function Component - SelectField
```jsx
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
```

**Component Features:**
- ✅ Maps array to elements
- ✅ Uses dynamic props
- ✅ Flexible and reusable

#### Stateful Component - RegistrationForm
```jsx
function RegistrationForm({ onSubmit }) {
  // State management
  const [formData, setFormData] = useState({...})
  const [errors, setErrors] = useState({})
  
  // Event handlers
  const handleInputChange = (e) => { ... }
  const handleSubmit = (e) => { ... }
  const handleReset = () => { ... }
  
  return (
    <form onSubmit={handleSubmit} className="registration-form">
      {/* Form content */}
    </form>
  )
}
```

**Features:**
- ✅ Manages its own state
- ✅ Has event handlers
- ✅ Complex component logic

#### Presentational Component - StudentCard
```jsx
function StudentCard({ student, onDelete }) {
  return (
    <div className="student-card">
      <div className="student-header">
        <h3>{student.firstName} {student.lastName}</h3>
        <button 
          onClick={() => onDelete(student.id)}
          className="btn-delete"
        >
          ✕
        </button>
      </div>
      <div className="student-details">
        {/* Student information */}
      </div>
    </div>
  )
}
```

**Features:**
- ✅ Receives data via props
- ✅ Calls parent callback
- ✅ Simple, presentational

#### Container Component - StudentList
```jsx
function StudentList({ students, onDelete, totalCount }) {
  return (
    <div className="student-list-section">
      <div className="list-header">
        <h2>Registered Students</h2>
        <span className="student-count">Total: {totalCount}</span>
      </div>
      
      {students.length === 0 ? (
        <div className="no-students">
          <p>No students registered yet</p>
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
```

**Features:**
- ✅ Conditional rendering
- ✅ Maps data to components
- ✅ Manages child components

#### Root Component - App
```jsx
function App() {
  // Root state
  const [students, setStudents] = useState([])
  
  // Root event handlers
  const handleStudentRegistration = (formData) => { ... }
  const handleDeleteStudent = (studentId) => { ... }
  
  return (
    <div className="app-container">
      <header className="app-header">...</header>
      <main className="app-main">
        <RegistrationForm onSubmit={handleStudentRegistration} />
        <StudentList 
          students={students}
          onDelete={handleDeleteStudent}
          totalCount={students.length}
        />
      </main>
      <footer className="app-footer">...</footer>
    </div>
  )
}
```

**Features:**
- ✅ Root of component tree
- ✅ Manages global state
- ✅ Composes multiple components
- ✅ Defines main structure

---

## 2️⃣ PROPS

### What are Props?
Props are immutable data passed from parent components to child components. They flow downward only.

### Props Examples

#### Passing Props to InputField
```jsx
<InputField
  label="First Name"
  name="firstName"
  type="text"
  value={formData.firstName}
  onChange={handleInputChange}
  required={true}
/>
```

**Props breakdown:**
- `label` → String prop
- `name` → String prop
- `type` → String prop
- `value` → String from state
- `onChange` → Function prop (event handler)
- `required` → Boolean prop

#### Receiving Props in InputField
```jsx
function InputField({ label, name, type, value, onChange, required }) {
  // Destructuring props
  // Can now use: label, name, type, value, onChange, required
  
  return (
    <input
      {...{ type, id: name, name, value }}
      onChange={onChange}
      required={required}
    />
  )
}
```

#### Props with Multiple Values
```jsx
<SelectField
  label="Gender"
  name="gender"
  value={formData.gender}
  onChange={handleInputChange}
  options={['Male', 'Female', 'Other']}
  required={true}
/>
```

**Props Usage in Component:**
```jsx
function SelectField({ label, name, value, onChange, options, required }) {
  return (
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
```

#### Props Passing to StudentCard
```jsx
{students.map((student) => (
  <StudentCard 
    key={student.id}          // Not a prop, React-specific
    student={student}         // Object prop
    onDelete={onDelete}       // Function prop
  />
))}
```

#### Receiving and Using Props in StudentCard
```jsx
function StudentCard({ student, onDelete }) {
  // Props object destructuring
  return (
    <div className="student-card">
      <h3>{student.firstName} {student.lastName}</h3>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <button onClick={() => onDelete(student.id)}>Delete</button>
    </div>
  )
}
```

#### Props for Callbacks
```jsx
// Parent (App component)
const handleStudentRegistration = (formData) => {
  const newStudent = { id: Date.now(), ...formData }
  setStudents(prev => [...prev, newStudent])
}

// Passing callback as prop
<RegistrationForm onSubmit={handleStudentRegistration} />

// Child (RegistrationForm) using callback
const handleSubmit = (e) => {
  e.preventDefault()
  if (Object.keys(errors).length === 0) {
    onSubmit(formData)  // Calling the prop function
  }
}
```

#### Props with Default Values
While not explicitly shown, good practice:
```jsx
function StudentList({ students = [], onDelete, totalCount = 0 }) {
  // students defaults to empty array
  // totalCount defaults to 0
}
```

---

## 3️⃣ STATE

### What is State?
State is mutable data managed within a component. When state changes, the component re-renders.

### Using useState Hook

#### Basic State Declaration
```jsx
const [students, setStudents] = useState([])
```

**Breakdown:**
- `students` → Current state value
- `setStudents` → Function to update state
- `[]` → Initial state value (empty array)

#### Multiple State Variables
```jsx
// In RegistrationForm component
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

const [errors, setErrors] = useState({})
```

**Multiple states for:**
- `formData` → Current form input values
- `errors` → Current validation errors

#### State with Complex Object
```jsx
const [formData, setFormData] = useState({
  firstName: '',           // Text field
  email: '',              // Email field
  dob: '',                // Date field
  gender: '',             // Dropdown
  agreeTerms: false       // Checkbox
})
```

#### Updating State (Functional Update)
```jsx
// Updating single property
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }))
}

// Usage with different input types:
// Text input: setFormData(prev => ({ ...prev, firstName: value }))
// Checkbox: setFormData(prev => ({ ...prev, agreeTerms: checked }))
```

#### Updating Array State
```jsx
const [students, setStudents] = useState([])

// Adding student
const handleStudentRegistration = (formData) => {
  const newStudent = {
    id: Date.now(),
    ...formData
  }
  setStudents(prev => [...prev, newStudent])
}

// Removing student
const handleDeleteStudent = (studentId) => {
  setStudents(prev => prev.filter(student => student.id !== studentId))
}
```

#### Using State in Rendering
```jsx
<div className="student-count">
  Total: {students.length}  {/* Using state value */}
</div>

{students.length === 0 ? (
  <p>No students registered</p>  {/* Conditional based on state */}
) : (
  <div>
    {students.map(student => (    {/* Rendering from state */}
      <StudentCard key={student.id} student={student} />
    ))}
  </div>
)}
```

#### State with Error Management
```jsx
const [errors, setErrors] = useState({})

// Setting errors
setErrors({
  firstName: 'First name is required',
  email: 'Invalid email format'
})

// Clearing specific error
setErrors(prev => ({
  ...prev,
  firstName: ''
}))

// Clearing all errors
setErrors({})

// Displaying errors
{errors.firstName && <span className="error">{errors.firstName}</span>}
```

#### State Lifting (Shared State)
```jsx
// Parent (App) component
function App() {
  const [students, setStudents] = useState([])  // Shared state
  
  // Passing state and setters to children
  return (
    <>
      <RegistrationForm onSubmit={handleStudentRegistration} />
      <StudentList 
        students={students}              {/* Passing state down */}
        onDelete={handleDeleteStudent}   {/* Passing handler down */}
      />
    </>
  )
}

// Child receives through props
function StudentList({ students, onDelete }) {
  return (
    {students.map(student => (
      <StudentCard 
        key={student.id}
        student={student}
        onDelete={onDelete}
      />
    ))}
  )
}
```

---

## 4️⃣ FORMS

### What are Forms?
Forms are UI elements used to collect user input. React provides controlled components for form handling.

### Form Structure

#### Complete Form Example
```jsx
function RegistrationForm({ onSubmit }) {
  // 1. State for form data
  const [formData, setFormData] = useState({...})
  const [errors, setErrors] = useState({})
  
  // 2. Event handlers
  const handleInputChange = (e) => { ... }
  const validateForm = () => { ... }
  const handleSubmit = (e) => { ... }
  const handleReset = () => { ... }
  
  // 3. JSX with form elements
  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs */}
      <button type="submit">Register</button>
    </form>
  )
}
```

#### Controlled Components
```jsx
// Text Input - Controlled
<input
  type="text"
  name="firstName"
  value={formData.firstName}    {/* Controlled by state */}
  onChange={handleInputChange}  {/* Updates on change */}
/>

// Email Input - Controlled
<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleInputChange}
/>

// Date Input - Controlled
<input
  type="date"
  name="dob"
  value={formData.dob}
  onChange={handleInputChange}
/>

// Select Dropdown - Controlled
<select
  name="gender"
  value={formData.gender}
  onChange={handleInputChange}
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

// Checkbox - Controlled
<input
  type="checkbox"
  name="agreeTerms"
  checked={formData.agreeTerms}    {/* Controlled by state */}
  onChange={handleInputChange}
/>
```

#### Form Validation
```jsx
const validateForm = () => {
  const newErrors = {}
  
  // Validation rules
  if (!formData.firstName.trim()) 
    newErrors.firstName = 'First name is required'
  
  if (!formData.email.trim()) 
    newErrors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    newErrors.email = 'Invalid email format'
  
  if (!formData.phone.trim())
    newErrors.phone = 'Phone is required'
  
  if (!formData.agreeTerms)
    newErrors.agreeTerms = 'You must agree to terms'
  
  return newErrors
}
```

#### Form Submission
```jsx
const handleSubmit = (e) => {
  e.preventDefault()  // Prevent page refresh
  
  // Validate form
  const newErrors = validateForm()
  
  if (Object.keys(newErrors).length === 0) {
    // No errors - submit
    onSubmit(formData)
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      // ... all fields reset
    })
    setErrors({})
  } else {
    // Has errors - display them
    setErrors(newErrors)
  }
}
```

#### Form Reset
```jsx
const handleReset = () => {
  // Clear all form data
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
  
  // Clear all errors
  setErrors({})
}

// Button to trigger reset
<button type="reset" onClick={handleReset}>Reset</button>
```

#### Dynamic Form Field Rendering
```jsx
{/* Row of form fields */}
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

{/* Another row */}
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
```

---

## 5️⃣ EVENTS

### What are Events?
Events are triggered by user interactions (clicks, input, submission, etc.). React provides synthetic event system.

### Event Handling

#### Input Change Event
```jsx
const handleInputChange = (e) => {
  // e.target contains the event target (input element)
  const { name, value, type, checked } = e.target
  
  // Update state based on event
  setFormData(prev => ({
    ...prev,
    // For checkboxes, use 'checked'; for others, use 'value'
    [name]: type === 'checkbox' ? checked : value
  }))
  
  // Clear error when user edits
  if (errors[name]) {
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }
}

// Usage in JSX
<input
  name="firstName"
  value={formData.firstName}
  onChange={handleInputChange}  {/* Event handler */}
/>
```

#### Form Submit Event
```jsx
const handleSubmit = (e) => {
  e.preventDefault()  // Prevent default form submission
  
  // Validation
  const newErrors = validateForm()
  
  if (Object.keys(newErrors).length === 0) {
    // Submit form by calling parent callback
    onSubmit(formData)
  } else {
    // Show validation errors
    setErrors(newErrors)
  }
}

// Usage in JSX
<form onSubmit={handleSubmit}>
  {/* Form content */}
  <button type="submit">Register</button>
</form>
```

#### Click Event
```jsx
const handleDeleteStudent = (studentId) => {
  // Confirm before deleting
  if (window.confirm('Are you sure?')) {
    setStudents(prev => 
      prev.filter(student => student.id !== studentId)
    )
  }
}

// Usage in JSX
<button 
  onClick={() => onDelete(student.id)}  {/* Click handler */}
  className="btn-delete"
>
  ✕
</button>
```

#### Event Handler with Arguments
```jsx
// Using arrow function to pass arguments
<button 
  onClick={() => onDelete(student.id)}  {/* Passing argument */}
  className="btn-delete"
>
  Delete
</button>

// The onDelete handler receives the argument
const onDelete = (studentId) => {
  // Handle deletion
}
```

#### Event Handler in Child Component
```jsx
// Parent passes callback as prop
<StudentCard 
  student={student}
  onDelete={onDelete}  {/* Callback prop */}
/>

// Child component uses the callback
function StudentCard({ student, onDelete }) {
  return (
    <button 
      onClick={() => onDelete(student.id)}  {/* Call parent callback */}
      className="btn-delete"
    >
      ✕
    </button>
  )
}
```

#### Multiple Event Types
```jsx
<input
  type="text"
  onChange={handleInputChange}   {/* onChange event */}
  onFocus={(e) => console.log('Focused')}  {/* onFocus event */}
  onBlur={(e) => console.log('Blurred')}   {/* onBlur event */}
/>

<form
  onSubmit={handleSubmit}        {/* onSubmit event */}
>
  <button type="reset" onClick={handleReset}>  {/* onClick event */}
    Reset
  </button>
</form>
```

#### Event Object
```jsx
const handleInputChange = (e) => {
  // e.target - the element that triggered the event
  // e.target.name - the name attribute of the input
  // e.target.value - the current value of the input
  // e.target.type - the input type (text, checkbox, etc.)
  // e.target.checked - for checkboxes, whether checked or not
  // e.preventDefault() - prevent default behavior
  
  const { name, value, type, checked } = e.target
}
```

#### Synthetic Events in React
```jsx
// React wraps native browser events as SyntheticEvent
const handleClick = (event) => {
  // event is a SyntheticEvent
  // Has same interface as browser events
  // Pooled for performance (you can't store it)
  
  if (event.type === 'click') {
    // Handle click
  }
}
```

---

## 📊 Concept Integration Flow

```
User Interaction (Event)
        ↓
Event Handler Function
        ↓
Update State
        ↓
Component Re-render
        ↓
Pass Props to Children
        ↓
Display Updated UI
```

### Example Flow
```
User types in first name input
        ↓
onChange event triggered
        ↓
handleInputChange(e) called
        ↓
setFormData({ ...formData, firstName: value })
        ↓
Component re-renders
        ↓
Input value prop updated
        ↓
UI shows new first name
```

---

## 🎯 Quick Reference

### Component
- Return JSX
- Can receive props
- Can have state
- Can have event handlers

### Props
- Read-only data
- Pass from parent to child
- Can be any type (string, number, object, function)
- Updated from parent cause re-render

### State
- Mutable data
- Managed with useState
- Updates trigger re-render
- Can be passed to children via props

### Forms
- Controlled components
- State manages input values
- onChange updates state
- onSubmit validates and submits
- Can show validation errors

### Events
- onClick, onChange, onSubmit, etc.
- Handlers receive SyntheticEvent
- Can call setState or trigger callbacks
- e.preventDefault() stops default behavior

---

This guide covers all React concepts used in the Student Registration Portal application!
