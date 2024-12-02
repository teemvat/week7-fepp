import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      {localStorage.length === 0 ?
        <div className="links">
          <a href="/">Home</a>
          <a href="/add-job">Add Job</a>
          <a href="/signup">Sign Up</a>
          <a href="/login">Login</a>
        </div> :
        <div className="links">
          <a href="/">Home</a>
          <a href="/add-job">Add Job</a>
          <a onClick={handleLogout}>Logout</a>
        </div>}
    </nav >
  );
}

export default Navbar;