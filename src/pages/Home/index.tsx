import React, { useEffect, useState } from "react";
import "./styles.css";
import { Card, CardProps } from "../../components/Card";

type ProfileProps = {
  name: string;
  avatar_url: string;
};

type User = {
  name: string;
  avatar: string;
};

export function Home() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    // imutabilidade do estado - junção de arrays anterior e novo
    setStudents((prevState) => [...prevState, newStudent]);
  }

  //usando async await no useEffect
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/polyanetuag");
      const data = await response.json() as ProfileProps;

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      {students.map((student) => (
        <Card name={student.name} time={student.time} key={student.time} />
      ))}
    </div>
  );
}
