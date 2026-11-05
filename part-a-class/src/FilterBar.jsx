import React from "react";

class FilterBar extends React.Component {
  render() {
    const { categories, current, onChange } = this.props;
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
}

export default FilterBar;
