import React from "react";
import Clock from "./Clock.jsx";
import ExpenseForm from "./ExpenseForm.jsx";
import FilterBar from "./FilterBar.jsx";
import ExpenseList from "./ExpenseList.jsx";
import { categories, sampleExpenses } from "./data.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: sampleExpenses,
      filter: "Tất cả",
      showClock: true,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.toggleClock = this.toggleClock.bind(this);
  }

  componentDidMount() {
    this.updateTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      this.updateTitle();
    }
  }

  updateTitle() {
    const total = this.state.expenses.reduce((sum, item) => sum + item.amount, 0);
    document.title = "Tổng chi: " + total.toLocaleString("vi-VN") + "đ";
  }

  handleAdd(expense) {
    this.setState({ expenses: [...this.state.expenses, expense] });
  }

  handleDelete(id) {
    if (window.confirm("Bạn có chắc muốn xóa khoản chi này?")) {
      this.setState({ expenses: this.state.expenses.filter((e) => e.id !== id) });
    }
  }

  handleFilter(category) {
    this.setState({ filter: category });
  }

  toggleClock() {
    this.setState({ showClock: !this.state.showClock });
  }

  render() {
    const { expenses, filter, showClock } = this.state;
    const visible = filter === "Tất cả" ? expenses : expenses.filter((e) => e.category === filter);

    return (
      <div className="app light">
        <div className="container">
          <div className="header">
            <h1>Sổ chi tiêu cá nhân</h1>
            <div>
              {showClock && <Clock />}
              <button onClick={this.toggleClock}>{showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}</button>
            </div>
          </div>
          <ExpenseForm categories={categories} onAdd={this.handleAdd} />
          <FilterBar categories={categories} current={filter} onChange={this.handleFilter} />
          <ExpenseList items={visible} onDelete={this.handleDelete} />
        </div>
      </div>
    );
  }
}

export default App;
