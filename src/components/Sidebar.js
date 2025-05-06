import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  Search,
  BookOpen,
  Bookmark,
  Settings,
  Sun,
  Moon,
  Home,
  Layers,
  BookMarked,
  Grid3X3,
  Layout,
  ScrollText,
  Award,
  FileText,
} from 'lucide-react';
import './App.css';

const Sidebar = ({
  setView,
  setSearchQuery,
  bookmarks,
  setSelectedSurah,
  isDarkMode,
  toggleDarkMode,
  children,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const expand = 'lg';

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setView('search');
  };

  const handleBookmarkClick = (bookmark) => {
    setSelectedSurah({ number: bookmark.surah });
    setView('ayah');
  };

  const navItems = [
    { title: 'Home', icon: <Home size={20} />, view: 'home' },
    { title: 'Surahs', icon: <BookOpen size={20} />, view: 'surah' },
    { title: 'Juz', icon: <Layers size={20} />, view: 'juz' },
    { title: 'Manzil', icon: <Layout size={20} />, view: 'manzil' },
    { title: 'Ruku', icon: <Grid3X3 size={20} />, view: 'ruku' },
    { title: 'Page', icon: <FileText size={20} />, view: 'page' },
    { title: 'Hizb', icon: <ScrollText size={20} />, view: 'hizb' },
    { title: 'Sajda', icon: <Award size={20} />, view: 'sajda' },
    { title: 'Progress', icon: <BookMarked size={20} />, view: 'progress' },
  ];

  return (
    <>
      <Navbar expand={expand} className={`navbar ${isDarkMode ? 'dark' : ''}`}>
        <Container fluid>
          <Navbar.Brand className="app-title">Wuran</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Wuran
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                {navItems.map((item, index) => (
                  <Nav.Link
                    key={index}
                    onClick={() => setView(item.view)}
                    className="nav-item"
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {item.title}
                  </Nav.Link>
                ))}
                <NavDropdown
                  title={
                    <span>
                      <span className="nav-icon">
                        <Bookmark size={20} />
                      </span>
                      Bookmarks
                    </span>
                  }
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  {bookmarks.length > 0 ? (
                    bookmarks.map((bookmark, index) => (
                      <NavDropdown.Item
                        key={index}
                        onClick={() => handleBookmarkClick(bookmark)}
                      >
                        Surah {bookmark.surah}:{bookmark.ayah}
                      </NavDropdown.Item>
                    ))
                  ) : (
                    <NavDropdown.Item disabled>No Bookmarks</NavDropdown.Item>
                  )}
                </NavDropdown>
                <Nav.Link
                  onClick={() => setView('settings')}
                  className="nav-item"
                >
                  <span className="nav-icon">
                    <Settings size={20} />
                  </span>
                  Settings
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <div className="navbar-actions">
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button variant="outline-success" type="submit">
                <Search sizeLoader size={20} />
              </Button>
            </Form>
            <Button
              variant="outline-secondary"
              onClick={toggleDarkMode}
              className="ms-2"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </Container>
      </Navbar>
      <div className="content-area">
        <div className="content-wrapper">{children}</div>
      </div>
    </>
  );
};

export default Sidebar;