import { useState } from "react";

function StudentCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(props.student.name);
  const [editedCourse, setEditedCourse] = useState(props.student.course);

  function handleSave() {
    props.onEdit(props.student.id, editedName, editedCourse);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedName(props.student.name);
    setEditedCourse(props.student.course);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="student-card">
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />

        <input
          type="text"
          value={editedCourse}
          onChange={(e) => setEditedCourse(e.target.value)}
        />

        <button 
        className="save-button"
        onClick={handleSave}
        >
          Save
        </button>

        <button 
        className="cancel-button"
        onClick={handleCancel}
        >
          Cancel
        </button>
        
      </div>
    );
  }

  return (
    <div className="student-card">
      <h2>{props.student.name}</h2>
      <p>Course: {props.student.course}</p>

      <button
       className="edit-button"
        onClick={() => setIsEditing(true)}>
        Edit
      </button>

      <button 
      className="delete-button"
       onClick={() => props.onDelete(props.student.id)}>
        Delete
      </button>
    </div>
  );
}

export default StudentCard;