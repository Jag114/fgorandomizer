const FilterList = ({ visible, setVisible }) => {
  return visible === true ? (
    <div>
      Hello
      <button onClick={() => setVisible((prevVisible) => !prevVisible)}>
        Close
      </button>
    </div>
  ) : null;
};

export default FilterList;
