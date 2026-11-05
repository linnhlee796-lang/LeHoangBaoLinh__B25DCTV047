import React from "react";

class ExpenseList extends React.Component {
  render() {
    const { items, onDelete } = this.props;
    const total = items.reduce((sum, item) => sum + item.amount, 0);

    return (
      <div>
        {items.length === 0 && <p>Chưa có khoản chi nào</p>}
        {items.map((item) => (
          <div className="item" key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <div>{item.category} - {item.date}</div>
            </div>
            <div>
              <span>{item.amount.toLocaleString("vi-VN")}đ </span>
              <button onClick={() => onDelete(item.id)}>Xóa</button>
            </div>
          </div>
        ))}
        <div className="total">Tổng tiền: {total.toLocaleString("vi-VN")}đ</div>
      </div>
    );
  }
}

export default ExpenseList;
