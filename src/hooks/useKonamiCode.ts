import { useCallback, useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA'
];

const DEACTIVATION_CODE = ['ArrowDown', 'ArrowDown', 'ArrowDown'];

export const useKonamiCode = () => {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [deactivationSequence, setDeactivationSequence] = useState<string[]>([]);

  const addToSequence = useCallback((input: string) => {
    // Handle deactivation sequence
    if (konamiActivated) {
      const newDeactivation = [...deactivationSequence, input];
      if (newDeactivation.length > DEACTIVATION_CODE.length) {
        newDeactivation.shift();
      }
      setDeactivationSequence(newDeactivation);

      if (newDeactivation.length === DEACTIVATION_CODE.length &&
          newDeactivation.every((key, index) => key === DEACTIVATION_CODE[index])) {
        setKonamiActivated(false);
        setDeactivationSequence([]);
        return;
      }
    }

    // Handle activation sequence
    const newSequence = [...inputSequence, input];
    if (newSequence.length > KONAMI_CODE.length) {
      newSequence.shift();
    }
    setInputSequence(newSequence);

    if (newSequence.length === KONAMI_CODE.length &&
        newSequence.every((key, index) => key === KONAMI_CODE[index])) {
      setKonamiActivated(true);
      setInputSequence([]);
    }
  }, [deactivationSequence, inputSequence, konamiActivated]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      addToSequence(event.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, deactivationSequence, konamiActivated, addToSequence]);

  return { konamiActivated, addToSequence };
};

export interface KonamiCodeHook {
  konamiActivated: boolean;
  addToSequence: (input: string) => void;
}

export default useKonamiCode;