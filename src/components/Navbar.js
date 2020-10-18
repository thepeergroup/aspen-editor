import React from 'react';

const Navbar = (props) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="http://try.aspen-lang.org/">
          <h1>Aspen Editor</h1>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="https://aspen-lang.org" className="navbar-item">
            Main Site
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
            </a>

            <div className="navbar-dropdown">
              <a href="https://github.com/beechnut/aspen" className="navbar-item">
                GitHub
              </a>
              <a href="https://github.com/sponsors/beechnut" className="navbar-item">
                Sponsor Aspen
              </a>
              <a href="https://mattcloyd.com" className="navbar-item">
                About the author
              </a>

              <hr className="navbar-divider" />
              <a href="https://github.com/beechnut/aspen-editor/issues" className="navbar-item">
                Report an Issue
              </a>
            </div>
          </div>
        </div>

       {/* <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>*/}
      </div>
    </nav>
  );
}

export default Navbar;