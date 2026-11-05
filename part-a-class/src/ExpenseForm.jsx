import React from "react";

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      amount: "",
      category: props.categories[0],
      date: new Date().toISOString().slice(0, 10),
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, amount, category, date } = this.state;

    if (title.trim() === "") {
      this.setState({ error: "Vui lòng nhập nội dung" });
      return;
    }
    if (amount === "" || Number(amount) <= 0) {
      this.setState({ error: "Số tiền phải lớn hơn 0" });
      return;
    }
    if (date === "") {
      this.setState({ error: "Vui lòng chọn ngày" });
      return;
    }

    this.props.onAdd({
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category: category,
      date: date,
    });

    this.setState({ title: "", amount: "", error: "" });
  }

  render() {
    const { title, amount, category, date, error } = this.state;

    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <input name="title" placeholder="Nội dung" value={title} onChange={this.handleChange} />
          <input name="amount" type="number" placeholder="Số tiền" value={amount} onChange={this.handleChange} />
          <select name="category" value={category} onChange={this.handleChange}>
            {this.props.categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input name="date" type="date" value={date} onChange={this.handleChange} />
          <button type="submit">Thêm</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }
}

export default ExpenseForm;
