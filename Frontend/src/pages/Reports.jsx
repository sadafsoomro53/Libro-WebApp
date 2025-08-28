import React, { useState } from 'react';
import { FaChartBar, FaChartPie, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import Charts from '../components/Charts';

const Reports = () => {
  const [timePeriod, setTimePeriod] = useState('weekly');
  const [reportType, setReportType] = useState('sales');

  const timePeriods = [
    { value: 'weekly', label: 'Weekly', icon: <FaCalendarAlt /> },
    { value: 'monthly', label: 'Monthly', icon: <FaCalendarAlt /> },
    { value: 'yearly', label: 'Yearly', icon: <FaCalendarAlt /> }
  ];

  const reportTypes = [
    { value: 'sales', label: 'Sales Report', icon: <FaChartBar /> },
    { value: 'inventory', label: 'Inventory Report', icon: <FaChartPie /> },
    { value: 'users', label: 'User Activity', icon: <FaChartBar /> }
  ];

  const handleDownload = () => {
    // Placeholder for download functionality
    alert(`Downloading ${reportType} report for ${timePeriod} period`);
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-3xl fw-bold text-dark mb-2">Reports Dashboard</h1>
              <p className="text-primary">Analyze your bookstore performance with detailed reports</p>
            </div>
            <button 
              onClick={handleDownload}
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <FaDownload />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-3">
          <div className="bg-white rounded p-4 shadow">
            <h6 className="text-muted mb-3">Time Period</h6>
            <div className="d-flex flex-wrap gap-2">
              {timePeriods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => setTimePeriod(period.value)}
                  className={`btn d-flex align-items-center gap-2 ${
                    timePeriod === period.value ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                >
                  {period.icon}
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 mb-3">
          <div className="bg-white rounded p-4 shadow">
            <h6 className="text-muted mb-3">Report Type</h6>
            <div className="d-flex flex-wrap gap-2">
              {reportTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setReportType(type.value)}
                  className={`btn d-flex align-items-center gap-2 ${
                    reportType === type.value ? 'btn-success' : 'btn-outline-success'
                  }`}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="bg-white rounded p-4 shadow">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-2xl fw-semibold text-dark">
                {reportTypes.find(t => t.value === reportType)?.label} - {timePeriods.find(t => t.value === timePeriod)?.label}
              </h3>
              <span className="badge bg-primary fs-6">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            
            {reportType === 'sales' && <Charts timePeriod={timePeriod} />}
            
            {reportType === 'inventory' && (
              <div className="text-center py-5">
                <FaChartPie className="text-muted mb-3" size={48} />
                <h4 className="text-muted">Inventory Reports Coming Soon</h4>
                <p className="text-muted">We're working on detailed inventory analytics</p>
              </div>
            )}
            
            {reportType === 'users' && (
              <div className="text-center py-5">
                <FaChartBar className="text-muted mb-3" size={48} />
                <h4 className="text-muted">User Activity Reports Coming Soon</h4>
                <p className="text-muted">User analytics will be available soon</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Reports Summary */}
      <div className="row">
        <div className="col-12 col-md-4 mb-3">
          <div className="bg-white rounded p-4 shadow text-center">
            <FaChartBar className="text-primary mb-2" size={32} />
            <h5 className="fw-semibold">Quick Stats</h5>
            <p className="text-muted small">Top performing categories and trends</p>
          </div>
        </div>
        
        <div className="col-12 col-md-4 mb-3">
          <div className="bg-white rounded p-4 shadow text-center">
            <FaChartPie className="text-success mb-2" size={32} />
            <h5 className="fw-semibold">Performance Metrics</h5>
            <p className="text-muted small">Key performance indicators</p>
          </div>
        </div>
        
        <div className="col-12 col-md-4 mb-3">
          <div className="bg-white rounded p-4 shadow text-center">
            <FaCalendarAlt className="text-info mb-2" size={32} />
            <h5 className="fw-semibold">Historical Data</h5>
            <p className="text-muted small">Compare with previous periods</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
