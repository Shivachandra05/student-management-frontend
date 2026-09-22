import { useState } from "react";

function AddStudent(props) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if(name.trim()=="" || course.trim()==""){
        setError("Please enter both name and course");
        return;
    }

    const newStudent = {
      id: Date.now(),
      name: name,
      course: course,
    };

    props.onAddStudent(newStudent);

    setName("");
    setCourse("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Student Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
    {error && <p className="error-message">{error}</p>}

      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudent;
