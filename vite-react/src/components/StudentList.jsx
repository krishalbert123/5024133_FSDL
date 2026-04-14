import StudentCard from './StudentCard.jsx'

function StudentList({ students, onDelete, onEdit, searchTerm, onSearchChange }) {
  return (
    <section className="student-list">
      <div className="list-header">
        <div>
          <h2>Registered Students</h2>
          <p>{students.length} students found</p>
        </div>

        <div className="search-container">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name, email, or course"
            className="input-field"
          />
        </div>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <p>No students match the search or have been registered yet.</p>
        </div>
      ) : (
        <div className="students-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default StudentList
