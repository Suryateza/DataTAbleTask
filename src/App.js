import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import Plot from 'react-plotly.js';
import './App.css';

const initialData = [...Array(100).keys()].map((index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  value: Math.floor(Math.random() * 100),
}));

const App = () => {
  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState(new Set(Array.from({ length: 5 }, (_, i) => i)));
  const [chartData, setChartData] = useState({
    x: [],
    y: [],
    type: 'bar',
    text: [],
  });

  useEffect(() => {
    updateChartData();
  }, [selectedRows]);

  const updateChartData = () => {
    const selectedData = data.filter((item, index) => selectedRows.has(index));
    const xValues = selectedData.map((item) => item.name);
    const yValues = selectedData.map((item) => item.value);
    const textValues = selectedData.map((item) => item.value);

    setChartData({
      x: xValues,
      y: yValues,
      type: 'bar',
      text: textValues,
    });
  };

  const handleCheckboxChange = (index) => {
    const updatedSelectedRows = new Set(selectedRows);
    if (updatedSelectedRows.has(index)) {
      updatedSelectedRows.delete(index);
    } else {
      updatedSelectedRows.add(index);
    }
    setSelectedRows(updatedSelectedRows);
  };

  const Row = ({ index, style }) => (
    <div className="row" style={style}>
      <input
        className="checkbox"
        type="checkbox"
        checked={selectedRows.has(index)}
        onChange={() => handleCheckboxChange(index)}
      />
      <div className="column">{data[index].id}</div>
      <div className="column">{data[index].name}</div>
      <div className="column">{data[index].value}</div>
    </div>
  );

  return (
    <div className="app">
      <div className="data-table">
        <div className="row header">
          <div className="column">ID</div>
          <div className="column">Name</div>
          <div className="column">Value</div>
        </div>
        <List
          height={400}
          itemCount={data.length}
          itemSize={60}
        >
          {Row}
        </List>
      </div>
      <div className="chart">
        <h2 className="chart-title">Selected Items Chart</h2>
        <Plot data={[chartData]} layout={{ width: 400, height: 300, xaxis: { title: 'Items' }, yaxis: { title: 'Values' } }} />
      </div>
    </div>
  );
};

export default App;