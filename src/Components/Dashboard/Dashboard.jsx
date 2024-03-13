import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="left">
        <div className="container large"></div>
      </div>
      <div className="right">
        <div className="row-1">
           <div className="container small">Experience</div>
           <div className="container small">Projects</div>
           <div className="container small">Repositories</div>
           <div className="container small">Reviews</div> 
        </div>
 
        <div className="row-2">
          <div className="container medium">A brief Pie chart</div>
          <div className="container medium">A brief Bar chart</div>
        </div>
        <div className="row-3">
          <div className="container long">A paragraph of random text</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;