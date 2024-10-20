import React, { useState } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';

const initialNotifications = [
  { id: 1, message: 'New report submitted', time: '10 minutes ago', read: false, details: 'A new patient report has been submitted for review.' },
  { id: 2, message: 'System update available', time: '1 hour ago', read: false, details: 'A new system update is available. Please update at your earliest convenience.' },
  { id: 3, message: 'New message from admin', time: '2 hours ago', read: false, details: 'You have a new message from the admin regarding recent policy changes.' },
];

const initialReportedCases = [
  { id: 1, patientLName: 'Doe', patientFName: 'John', patientMI: 'A', patientSuffix: '', patientBgy: 'Central', patientMun: 'Springfield', patientProv: 'State', patientBdate: '1994-05-15', susDateReported: '2024-10-15', susDateAdmitted: '2024-10-14', susSymptomResults: 'Fever, Cough' },
  { id: 2, patientLName: 'Smith', patientFName: 'Jane', patientMI: 'B', patientSuffix: '', patientBgy: 'North', patientMun: 'Shelbyville', patientProv: 'State', patientBdate: '1999-08-20', susDateReported: '2024-10-12', susDateAdmitted: '2024-10-11', susSymptomResults: 'Headache, Fatigue' },
];

const UserScreen = ({ userType, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [patientLName, setPatientLName] = useState('');
  const [patientFName, setPatientFName] = useState('');
  const [patientMI, setPatientMI] = useState('');
  const [patientSuffix, setPatientSuffix] = useState('');
  const [patientBgy, setPatientBgy] = useState('');
  const [patientMun, setPatientMun] = useState('');
  const [patientProv, setPatientProv] = useState('');
  const [patientBdate, setPatientBdate] = useState('');
  const [susDateReported, setSusDateReported] = useState('');
  const [susDateAdmitted, setSusDateAdmitted] = useState('');
  const [susSymptomResults, setSusSymptomResults] = useState('');
  const [reportedCases, setReportedCases] = useState(initialReportedCases);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseNotificationDetails = () => {
    setSelectedNotification(null);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    const newCase = {
      id: reportedCases.length + 1,
      patientLName,
      patientFName,
      patientMI,
      patientSuffix,
      patientBgy,
      patientMun,
      patientProv,
      patientBdate,
      susDateReported,
      susDateAdmitted,
      susSymptomResults,
    };
    setReportedCases([...reportedCases, newCase]);
    // Reset form fields
    setPatientLName('');
    setPatientFName('');
    setPatientMI('');
    setPatientSuffix('');
    setPatientBgy('');
    setPatientMun('');
    setPatientProv('');
    setPatientBdate('');
    setSusDateReported('');
    setSusDateAdmitted('');
    setSusSymptomResults('');
  };

  return (
    <div className="user-screen">
      <header className="header">
        <h1>DSIS - {userType}</h1>
        <div className="header-btns">
          <div className="notification-wrapper">
            <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
              <FaBell />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-count">{notifications.filter(n => !n.read).length}</span>
              )}
            </div>
            {showNotifications && (
              <div className="notifications-dropdown">
                <h3>Notifications</h3>
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification.id} className={notification.read ? 'read' : 'unread'}>
                      <a onClick={() => handleNotificationClick(notification)}>
                        {notification.message} <span className="notification-time">{notification.time}</span>
                      </a>
                      {!notification.read && (
                        <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>
      {selectedNotification && (
        <div className="notification-modal">
          <div className="notification-content">
            <h3>{selectedNotification.message}</h3>
            <p>{selectedNotification.details}</p>
            <p><small>{selectedNotification.time}</small></p>
            <button onClick={handleCloseNotificationDetails}>Close</button>
          </div>
        </div>
      )}
     <main className="main-content">
        <div className="report-section">
          <h2>Report Suspected Case</h2>
          <form onSubmit={handleSubmitReport} className="report-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientLName">Last Name:</label>
                <input
                  type="text"
                  id="patientLName"
                  value={patientLName}
                  onChange={(e) => setPatientLName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="patientFName">First Name:</label>
                <input
                  type="text"
                  id="patientFName"
                  value={patientFName}
                  onChange={(e) => setPatientFName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="patientMI">Middle Initial:</label>
                <input
                  type="text"
                  id="patientMI"
                  value={patientMI}
                  onChange={(e) => setPatientMI(e.target.value)}
                  maxLength="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="patientSuffix">Suffix:</label>
                <input
                  type="text"
                  id="patientSuffix"
                  value={patientSuffix}
                  onChange={(e) => setPatientSuffix(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientBgy">Barangay:</label>
                <input
                  type="text"
                  id="patientBgy"
                  value={patientBgy}
                  onChange={(e) => setPatientBgy(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="patientMun">Municipality:</label>
                <input
                  type="text"
                  id="patientMun"
                  value={patientMun}
                  onChange={(e) => setPatientMun(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="patientProv">Province:</label>
                <input
                  type="text"
                  id="patientProv"
                  value={patientProv}
                  onChange={(e) => setPatientProv(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientBdate">Birthdate:</label>
                <input
                  type="date"
                  id="patientBdate"
                  value={patientBdate}
                  onChange={(e) => setPatientBdate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="susDateReported">Date Reported:</label>
                <input
                  type="date"
                  id="susDateReported"
                  value={susDateReported}
                  onChange={(e) => setSusDateReported(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="susDateAdmitted">Date Admitted:</label>
                <input
                  type="date"
                  id="susDateAdmitted"
                  value={susDateAdmitted}
                  onChange={(e) => setSusDateAdmitted(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="susSymptomResults">Symptoms:</label>
              <textarea
                id="susSymptomResults"
                value={susSymptomResults}
                onChange={(e) => setSusSymptomResults(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">Submit Report</button>
          </form>
        </div>
        <div className="divider"></div>
        <div className="table-section">
          <h2>Reported Cases</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>MI</th>
                <th>Barangay</th>
                <th>Municipality</th>
                <th>Birthdate</th>
                <th>Date Reported</th>
                <th>Symptoms</th>
              </tr>
            </thead>
            <tbody>
              {reportedCases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td>{caseItem.id}</td>
                  <td>{caseItem.patientLName}</td>
                  <td>{caseItem.patientFName}</td>
                  <td>{caseItem.patientMI}</td>
                  <td>{caseItem.patientBgy}</td>
                  <td>{caseItem.patientMun}</td>
                  <td>{caseItem.patientBdate}</td>
                  <td>{caseItem.susDateReported}</td>
                  <td>{caseItem.susSymptomResults}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 DSIS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserScreen;