import { Stack, Table } from "@mui/joy";
import classes from "./sessions.module.css";
import { Pagination, Button } from "@mui/material";
import { SessionRow } from "./sessionComponents/SessionRow";
import { SessionsDone } from "./sessionComponents/SessionsDone";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";

import React, { useState, useEffect } from "react";

export const Sessions: React.FC = () => {
  // Stato per memorizzare i dati
  const [data, setData] = useState([]);
  // Stato per gestire gli errori
  const [error, setError] = useState(null);
  // Stato per il caricamento
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Funzione asincrona per recuperare i dati
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/subscriptions/673b2ad683c4021eb87301c7", {
          method: "GET", // Specifica il metodo HTTP (GET, POST, PUT, DELETE, etc.)
          headers: {
            "Content-Type": "application/json", // Specifica il tipo di contenuto
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Parsing della risposta JSON
        setData(result); // Aggiornamento dello stato con i dati ricevuti
      } catch (err) {
        setError(err); // Gestione degli errori
      } finally {
        setLoading(false); // Fine caricamento
      }
    };

    fetchData(); // Chiamata alla funzione
  }, []);

  console.log(data);

  const navigate = useNavigate();

  return (
    <>
      <div className={classes.headerLayout}>
        <h1 style={{ padding: 0, margin: 0 }}>Sessioni di esame: </h1>
        <Button
          variant="outlined"
          onClick={() => navigate("exam/:id/sessions/add")}
        >
          Nuova Sessione
        </Button>
      </div>
      <Table aria-label="basic table">
        <h2>Sessioni da svolgere</h2>
        <tbody>
          <SessionRow teacherClass="Pixel" date="13 ottobre 2025"></SessionRow>
          <SessionRow teacherClass="Pixel" date="14 ottobre 2025"></SessionRow>
          <SessionRow teacherClass="Pixel" date="15 ottobre 2025"></SessionRow>
          <SessionRow teacherClass="Pixel" date="16 ottobre 2025"></SessionRow>
          <SessionRow teacherClass="Pixel" date="17 ottobre 2025"></SessionRow>
        </tbody>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </Box>

      <Table aria-label="basic table">
        <h2>Sessioni svolte</h2>
        <tbody>
          <SessionsDone
            teacherClass="Pixel"
            date="12 ottobre 2025"
          ></SessionsDone>
        </tbody>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </Box>
    </>
  );
};
