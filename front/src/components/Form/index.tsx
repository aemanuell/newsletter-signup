import React, { useState } from 'react';
import { Container, FormContainer, Input, InvalidMessage, SuccessContainer, ValidationInput, Img, InputButton, FormLabel, DismissButton } from './styles';

interface FormProps {
  onSuccess: (email: string) => void;
}

export function Form({ onSuccess }: FormProps) {
  const [email, setEmail] = useState<string>('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        const response = await fetch('http://localhost:5000/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          onSuccess(email);
          setShowSuccess(true);
          setIsValid(true);
          setErrorMessage('');
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.error || 'Failed to subscribe');
          setIsValid(false);
        }
      } catch (error) {
        console.error('Failed to submit form:', error);
        setErrorMessage('Failed to subscribe');
        setIsValid(false);
      }
    } else {
      setErrorMessage('Valid email required');
      setIsValid(false);
    }
  };

  const handleDismiss = () => {
    setShowSuccess(false);
    setEmail(''); // Limpar o campo de email ao descartar a mensagem de sucesso
  };

  return (
    <>
      {!showSuccess ? (
        <Container>
          <Img>
            <img 
              src="./assets/images/illustration-sign-up-desktop.svg" 
              alt="desktop" 
            />
          </Img>

          <FormContainer onSubmit={handleSubmit}>
            <h2>Stay updated!</h2>
            <p>Join 60,000+ product managers receiving monthly updates on:</p>
            <ul>
              <li>
                <span><img src="./assets/images/icon-list.svg" alt="icon" /></span>
                Product discovery and building what matters
              </li>
              <li>
                <span><img src="./assets/images/icon-list.svg" alt="icon" /></span>
                Measuring to ensure updates are a success
              </li>
              <li>
                <span><img src="./assets/images/icon-list.svg" alt="icon" /></span>
                And much more!
              </li>
            </ul>
            <FormLabel>
              <label htmlFor="email">
                <ValidationInput>
                  <span className="address">Email address</span>
                  <InvalidMessage isValid={isValid}>{errorMessage}</InvalidMessage>
                </ValidationInput>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@company.com"
                  isValid={isValid}
                />
              </label>
              <InputButton type="submit">Subscribe to monthly newsletter</InputButton>
            </FormLabel>
          </FormContainer>
        </Container>
      ) : (
        <SuccessContainer>
          <img src="./assets/images/icon-success.svg" alt="Success" />
          <h2>Thanks for subscribing!</h2>
          <p>A confirmation email has been sent to <span>{email}</span>. Please open it and click the button inside to confirm your subscription.</p>
          <DismissButton onClick={handleDismiss}>Dismiss message</DismissButton>
        </SuccessContainer>
      )}
    </>
  );
}
