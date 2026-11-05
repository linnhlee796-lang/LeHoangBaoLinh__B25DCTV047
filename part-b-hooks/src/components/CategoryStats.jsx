function CategoryStats({ items, categories }) {
  return (
    <div className="stats">
      <h3>Thống kê theo loại</h3>
      {categories.map((c) => {
        const sum = items
          .filter((item) => item.category === c)
          .reduce((total, item) => total + item.amount, 0);
        return (
          <div key={c}>
            {c}: {sum.toLocaleString("vi-VN")}đ
          </div>
        );
      })}
    </div>
  );
}

export default CategoryStats;
