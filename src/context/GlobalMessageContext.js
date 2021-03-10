import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const GlobalMessageContext = createContext();

export const GlobalMessageProvider = ({ children }) => {
  const [message, setMessage] = useState(undefined);
  const [timeoutId, setTimeoutId] = useState(undefined);

  const showMessage = (text) => {
    setMessage(text);
    clearTimeout(timeoutId);
    const newTimeuutId = setTimeout(() => setMessage(undefined), 2000);
    setTimeoutId(newTimeuutId);
  };

  const value = {
    message,
    showMessage,
  };

  return <GlobalMessageContext.Provider value={value}>{children}</GlobalMessageContext.Provider>;
};

GlobalMessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
