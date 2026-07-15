import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/").then((res) => {
      setMessage(res.data.message);
    });
  }, []);

  return (
    <div>
      <h1>Career Portal</h1>
      <p>{message}</p>
    </div>
  );
}
