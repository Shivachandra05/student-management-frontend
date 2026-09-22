import { useState, useEffect } from "react";
import "./App.css";
import StudentCard from "./StudentCard";
import AddStudent from "./AddStudent";
import LoginForm from "./assets/LoginForm";
import RegistrationForm from "./assets/RegistrationForm";

function App() {

  const [students, setStudents] = useState([]);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  // =========================
  // GET STUDENTS
  // =========================
  useEffect(() => {

    if (!token) {
      return;
    }

    fetch("http://localhost:8080/students", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {

        if (!response.ok) {
          const errorData= response.json();

          throw new Error(
            Object.values(errorData).join(", ")
          );
        }

        return response.json();
      })
      .then(data => {

        console.log("STUDENTS RESPONSE:", data);

        // Backend returns PagedResponse,
        // so the actual student array is data.list
        setStudents(data.list);

      })
      .catch(error => {
        setMessage(error.message);
      });

  }, [token]);


  // =========================
  // ADD STUDENT
  // =========================
  function addStudent(newStudent) {

    fetch("http://localhost:8080/students/all", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },

      body: JSON.stringify({
        name: newStudent.name,
        course: newStudent.course
      })
    })
      .then(response => {

        if (!response.ok) {
          throw new Error(`request failed: ${response.status}`);
        }

        return response.json();
      })
      .then(data => {

        setStudents([
          ...students,
          data
        ]);
      setMessage("Student added successfully");

      })
      .catch(error => {
        setMessage(error.message);
      });
  }


  // =========================
  // EDIT STUDENT
  // =========================
  function editStudent(id, newName, newCourse) {

    if (
      newName.trim() === "" ||
      newCourse.trim() === ""
    ) {
      return;
    }

    fetch(`http://localhost:8080/students/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },

      body: JSON.stringify({
        name: newName,
        course: newCourse
      })
    })
      .then(response => {

        if (!response.ok) {
          throw new Error(`request failed: ${response.status}`);
        }

        return response.json();
      })
      .then(data => {

        const updatedStudents = students.map(student =>
          student.id === id
            ? data
            : student
        );

        setStudents(updatedStudents);

      })
      .catch(error => {
        console.error(error);
      });
  }


  // =========================
  // DELETE STUDENT
  // =========================
  function deleteStudent(id) {

    fetch(`http://localhost:8080/students/${id}`, {
      method: "DELETE",

      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {

        if (!response.ok) {
          throw new Error(`request failed: ${response.status}`);
        }

        console.log("Student deleted successfully");

        const updatedStudents = students.filter(
          student => student.id !== id
        );

        setStudents(updatedStudents);

      })
      .catch(error => {
        console.error(error);
      });
  }


  // =========================
  // LOGOUT
  // =========================
  function logout() {

    setToken("");
    setStudents([]);

  }


  // =========================
  // UI
  // =========================
  return (

    <div className="App">

      <h1>Student Management System</h1>


      {/* NOT LOGGED IN */}
      {!token ? (

        <div className="auth-forms">

          <h2>Welcome</h2>

          <p>
            Please login to manage student records.
          </p>

          <LoginForm
            onLogin={setToken}
          />

          <p>
            New user? Create an account
          </p>

          <RegistrationForm />

        </div>

      ) : (

        /* LOGGED IN */

        <div className="dashboard">

          <div className="dashboard-header">

            <h2>Students</h2>

            <button onClick={logout}>
              Logout
            </button>

          </div>


          <AddStudent
            onAddStudent={addStudent}
          />


          <div className="student-list">

            {students.map(student => (

              <StudentCard
                key={student.id}
                student={student}
                onDelete={deleteStudent}
                onEdit={editStudent}
              />

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default App;