import { roleSystemContent } from './config.js';

let conversationHistory = [{ role: 'system', content: roleSystemContent }];

const addMessageToHistory = (role, content) => {
  conversationHistory.push({ role, content });
};

const getConversationHistory = () => {
  return conversationHistory;
};

export { addMessageToHistory, getConversationHistory };
