function StudentCard({ student, onDelete, onEdit }) {
  return (
    <article className="student-card">
      <div className="student-card-header">
        <div>
          <h3>{student.name}</h3>
          <p className="student-meta">{student.course} · Age {student.age}</p>
        </div>
        <div className="card-actions">
          <button type="button" className="btn btn-edit" onClick={() => onEdit(student)}>
            Edit
          </button>
          <button type="button" className="btn btn-delete" onClick={() => onDelete(student.id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="student-details">
        <p>
          <strong>Email:</strong> {student.email}
        </p>
      </div>
    </article>
  )
}

export default StudentCard
