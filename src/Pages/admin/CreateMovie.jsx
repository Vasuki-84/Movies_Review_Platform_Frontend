import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api"; 

export default function CreateMovie() {
  const [form, setForm] = useState({
    name: "",
    year: "",
    detail: "",
    cast: ""
  });

  const submit = async () => {
    try {
      await axios.post(`${baseUrl}/movie/create`, {
        ...form,
        cast: form.cast.split(",").map(c => c.trim()),
      });

      alert("Movie created successfully");

      setForm({ name: "", year: "", detail: "", cast: "" });
    } catch (error) {
      console.error("Create movie error:", error);
    }
  };

  return (
    <div className="mt-20">
      <h2 >Create Movie</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Year"
        value={form.year}
        onChange={e => setForm({ ...form, year: e.target.value })}
      />

      <textarea
        placeholder="Detail"
        value={form.detail}
        onChange={e => setForm({ ...form, detail: e.target.value })}
      />

      <input
        placeholder="Cast (comma separated)"
        value={form.cast}
        onChange={e => setForm({ ...form, cast: e.target.value })}
      />

      <button onClick={submit}>Create Movie</button>
    </div>
  );
}
