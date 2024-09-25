import React, { useState } from 'react'; // Importar useState desde react
import Detalles from '../components/Detalles';
import MetodoPago from '../components/MetodoPago';
import Finalizar from '../components/Finalizar';
import Confirmado from '../components/Confirmado';
import Comentarios from '../components/Comentarios';

const Checkout = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const goToComentarios = () => {
    setStep(5);
  };

  return (
    <div>
      {step === 1 && <Detalles onNext={nextStep} />}
      {step === 2 && <MetodoPago onNext={nextStep} onBack={() => setStep(1)} />}
      {step === 3 && <Finalizar onNext={nextStep} onBack={() => setStep(2) } />}
      {step === 4 && <Confirmado onComentar={goToComentarios} onBack={() => setStep(3)} />}
      {step === 5 && <Comentarios />}
    </div>
  );
};

export default Checkout;