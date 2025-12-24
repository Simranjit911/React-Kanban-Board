// Action history hook for undo/redo
import { useState } from 'react';

export const useHistory = (initialState) => {
  const [history, setHistory] = useState([initialState]);
  const [historyStep, setHistoryStep] = useState(0);

  const setState = (newState) => {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
    }
  };

  const clear = () => {
    setHistory([initialState]);
    setHistoryStep(0);
  };

  const canUndo = historyStep > 0;
  const canRedo = historyStep < history.length - 1;

  return [history[historyStep], setState, undo, redo, clear, { canUndo, canRedo }];
};
