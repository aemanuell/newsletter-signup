import { useState } from 'react';
import { Form } from './components/Form';

export function App() {
  const [email, setEmail] = useState<string>('');

  function handleSuccess(email: string) {
    setEmail(email);
  }

  return (
    <div>
      <Form onSuccess={handleSuccess} />
    </div>
  );
}
