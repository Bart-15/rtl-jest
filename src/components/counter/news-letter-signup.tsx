import React, { useState } from 'react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function clearForm() {
    if (submitted) return;
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  }

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    clearForm();
  };

  return (
    <div>
      <h2>Subscribe to our Newsletter</h2>
      {submitted ? (
        <p data-testid="success-message">Thanks for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            data-testid="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button data-testid="submit-btn" type="submit">
            Subscribe
          </button>
          {error && (
            <p data-testid="error-msg" style={{ color: 'red' }}>
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;
