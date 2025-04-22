import { useState, useEffect } from "react";

export default function FetchAndTitle() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    if (user) {
      document.title = `Viewing: ${user.name}`;
    }
  }, [user]);

  return <h1>{user ? `Hello, ${user.name}` : "Loading..."}</h1>;
}
