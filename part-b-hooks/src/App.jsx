import { useState, useEffect, useContext } from "react";
import Clock from "./components/Clock.jsx";
import ThemeButton from "./components/ThemeButton.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import CategoryStats from "./components/CategoryStats.jsx";
import useFetch from "./hooks/useFetch.js";
import useDebounce from "./hooks/useDebounce.js";
import { ThemeContext } from "./context/ThemeContext.jsx";

const API_URL = "https://6aebe7beee39618d7bf89c01.mockapi.io/expenses";
const categories = ["Ăn uống", "Đi lại", "Học tập", "Giải trí"];

function App() {
  const { theme } = useContext(ThemeContext);
  const { data, loading, error, addItem, removeItem } = useFetch(API_URL);
  const [filter, setFilter] = useState("Tất cả");
  const [showClock, setShowClock] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const total = data.reduce((sum, item) => sum + Number(item.amount), 0);

  useEffect(() => {
    document.title = "Tổng chi: " + total.toLocaleString("vi-VN") + "đ";
  }, [total]);

  const visible = data
    .filter((item) => filter === "Tất cả" || item.category === filter)
    .filter((item) => item.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .map((item) => ({ ...item, amount: Number(item.amount) }));

  return (
    <div className={"app " + theme}>
      <div className="container">
        <div className="header">
          <h1>Sổ chi tiêu cá nhân</h1>
          <div>
            {showClock && <Clock />}
            <button onClick={() => setShowClock(!showClock)}>{showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}</button>
            <ThemeButton />
          </div>
        </div>

        <ExpenseForm categories={categories} onAdd={addItem} />

        <input
          className="search"
          placeholder="Tìm kiếm theo nội dung..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FilterBar categories={categories} current={filter} onChange={setFilter} />

        {loading && <p>Đang tải...</p>}
        {error && <p className="error">Lỗi: {error}</p>}
        {!loading && <ExpenseList items={visible} onDelete={removeItem} />}

        <CategoryStats items={visible} categories={categories} />
      </div>
    </div>
  );
}

export default App;
