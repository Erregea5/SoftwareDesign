import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../images/home/logo.svg";

import "../../css/home/home.css";

export default function Home() {
  // TODO: organize this + 0.5 index fix bug

  const maxCountries = 50;
  const maxPartners = 1200;
  const maxRevenue = 790;
  const maxSatisfaction = 98;

  const steps = 100;
  const maxNumbers = [maxCountries, maxPartners, maxRevenue, maxSatisfaction];

  const [numbers, setNumbers] = useState([0, 0, 0, 0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumbers((prevNumbers) => {
        const updatedNumbers = [...prevNumbers];
        if (updatedNumbers[currentIndex] < maxNumbers[currentIndex]) {
          updatedNumbers[currentIndex] += Math.ceil(
            maxNumbers[currentIndex] / steps
          );
        } else if (currentIndex < 3) {
          setCurrentIndex((prevIndex) => prevIndex + 0.5);
        } else {
          clearInterval(interval);
        }
        return updatedNumbers;
      });
    }, 5);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      <div id="home-container">
        <nav>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <div id="links">
            <Link to="/history">History</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/quote">Quote</Link>
          </div>
          <div>
            <Link to="/login">
              <button id="login-btn" className="nav-btn">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button id="register-btn" className="nav-btn">
                Sign Up
              </button>
            </Link>
          </div>
        </nav>
        <main>
          <section id="hero">
            <h1>
              <span id="gradient-text">PetroVexa</span> Industries
            </h1>
            <p>
              We pride ourselves on being the unrivaled frontrunner in the
              industry,
              <br />
              consistently delivering our clients the most competitive rates
              available.
            </p>
            <div id="buttons">
              <Link to="/quote">
                <button id="cta-1">Get Fuel Quote</button>
              </Link>
              <Link to="/login">
                <button id="cta-2">Sign In</button>
              </Link>
            </div>
          </section>
          <section id="stats">
            <div>
              <h2>{numbers[0]}+</h2>
              <p>Countries</p>
            </div>
            <div>
              <h2>{numbers[1]}+</h2>
              <p>Partner Corporations</p>
            </div>
            <div>
              <h2>${numbers[2]}M+</h2>
              <p>Total Revenue Driven</p>
            </div>
            <div>
              <h2>{numbers[3]}%</h2>
              <p>Customer Satisfaction</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
