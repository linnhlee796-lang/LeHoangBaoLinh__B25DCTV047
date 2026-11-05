import { useState, useRef } from "react";

function ExpenseForm({ categories, onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Vui lòng nhập nội dung");
      return;
    }
    if (amount === "" || Number(amount) <= 0) {
      setError("Số tiền phải lớn hơn 0");
      return;
    }
    if (date === "") {
      setError("Vui lòng chọn ngày");
      return;
    }

    const ok = await onAdd({
      title: title.trim(),
      amount: Number(amount),
      category: category,
      date: date,
    });

    if (ok) {
      setTitle("");
      setAmount("");
      setError("");
      titleRef.current.focus();
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input ref={titleRef} placeholder="Nội dung" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Số tiền" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Thêm</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ExpenseForm;
