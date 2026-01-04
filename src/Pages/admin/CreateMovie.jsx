import { useState } from "react";
import axios from "axios";

export default function CreateMovie() {
  const [form, setForm] = useState({
    name: "",
    year: "",
    detail: "",
    cast: ""
  });

  const submit = async () => {
    await axios.post("/movie/create", {
      ...form,
      cast: form.cast.split(",")
    });
    alert("Movie created");
  };

  return (
    <div>
      <h2>Create Movie</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})}/>
      <input placeholder="Year" onChange={e => setForm({...form, year:e.target.value})}/>
      <textarea placeholder="Detail" onChange={e => setForm({...form, detail:e.target.value})}/>
      <input placeholder="Cast (comma separated)" onChange={e => setForm({...form, cast:e.target.value})}/>
      <button onClick={submit}>Create Movie</button>
    </div>
  );
}
