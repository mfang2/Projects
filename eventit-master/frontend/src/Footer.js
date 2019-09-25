import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <MDBFooter className="clsFooter font-small pt-4 mt-4 clsBGFooter">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="2">
            <h5 className="title">EVENT.it</h5>
            <p>
              do together, achieve together
            </p>
          </MDBCol>
          <MDBCol md="5">
            <h5 className="title">Links</h5>
            <ul>
              <Link to='/aboutus'>
                <li className="list-unstyled">
                  About Us
              </li>
              </Link>
              <li className="list-unstyled">
                <a href="#!">Careers</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Terms of use</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">The page blanc</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="5">
            <h5 className="title">Follow Us</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Instagram</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Facebook</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Twitter</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">LinkedIn</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.google.com"> eventit.com </a>
        </MDBContainer>
      </div>
    </MDBFooter >
  );
}

export default Footer;
