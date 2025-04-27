import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // New state

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/feedback/get');
        setFeedbacks(res.data.data);
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
      }
    };

    fetchFeedbacks();
  }, []);

  // Filter feedbacks based on selected category
  const filteredFeedbacks = feedbacks.map((fb) => ({
    ...fb,
    feedbacks: fb.feedbacks.filter(
      (item) => selectedCategory === 'All' || item.category === selectedCategory
    ),
  }));

  return (
    <div className="container mt-5">
      <h2>User Feedback Dashboard</h2>

      {/* Category Filter Buttons */}
      <div className="mb-4">
        <button className="btn btn-primary me-2" onClick={() => setSelectedCategory('All')}>
          All
        </button>
        <button className="btn btn-primary me-2" onClick={() => setSelectedCategory('suggestion')}>
          Suggestion
        </button>
        <button className="btn btn-secondary me-2" onClick={() => setSelectedCategory('bug')}>
          Bug
        </button>
        <button className="btn btn-success me-2" onClick={() => setSelectedCategory('feature')}>
          Feature
        </button>
        {/* Add more categories if you have more */}
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Feedback Text</th>
            <th>Category</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((fb) =>
            fb.feedbacks.map((item) => (
              <tr key={item._id}>
                <td>{fb.name}</td>
                <td>{fb.email}</td>
                <td>{item.feedbackText}</td>
                <td>{item.category}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
