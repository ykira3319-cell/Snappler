"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const user = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user.user, { displayName: name });

    router.push("/dashboard");
  };

  return (
    <div className="auth">
      <h1>Snappler 🔵</h1>

      <input placeholder="Nom" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Créer compte</button>
    </div>
  );
    }
