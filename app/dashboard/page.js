'"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));

    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!text) return;

    await addDoc(collection(db, "messages"), {
      text,
      user: auth.currentUser?.displayName || "Anonyme",
      createdAt: new Date()
    });

    setText("");
  };

  return (
    <div className="chat">
      <h2>Chat Snappler 🔥</h2>

      <div className="messages">
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.user}:</b> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
      }
