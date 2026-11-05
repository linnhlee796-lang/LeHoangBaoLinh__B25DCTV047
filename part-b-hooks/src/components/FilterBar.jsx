function FilterBar({ categories, current, onChange }) {
  const all = ["Tất cả", ...categories];

  return (
    <div className="filter">
      {all.map((c) => (
        <button key={c} className={current === c ? "active" : ""} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
