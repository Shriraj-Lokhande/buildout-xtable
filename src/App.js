import React, { useState, useMemo } from 'react';
import './App.css';

const App = () => {
  const initialData = [
    { date: "2022-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-02", views: 150, article: "Article 2" },
    { date: "2023-09-02", views: 120, article: "Article 3" },
    { date: "2020-09-03", views: 200, article: "Article 4" }
  ];

  const [data] = useState(initialData); // Removed setData
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'date') {
          if (a.date < b.date) return 1;
          if (a.date > b.date) return -1;
          if (a.views < b.views) return 1;
          if (a.views > b.views) return -1;
        } else if (sortConfig.key === 'views') {
          if (a.views < b.views) return 1;
          if (a.views > b.views) return -1;
          if (a.date < b.date) return 1;
          if (a.date > b.date) return -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'descending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="App">
      <h1>Date and Views Table</h1>
      <button onClick={() => requestSort('date')}>Sort by Date</button>
      <button onClick={() => requestSort('views')}>Sort by Views</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Views</th>
            <th>Article</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.views}</td>
              <td>{item.article}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
