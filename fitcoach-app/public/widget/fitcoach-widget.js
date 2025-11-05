/**
 * FitCoach AI Assistant - Chat Widget
 * Embeddable chat widget for lead qualification
 */

(function () {
  'use strict';

  // Configuration
  const API_URL = window.FITCOACH_API_URL || 'http://localhost:3000';
  const config = window.fitcoachConfig || {};

  if (!config.coachId) {
    console.error('FitCoach Widget: coachId is required in fitcoachConfig');
    return;
  }

  // State
  let conversationId = null;
  let isOpen = false;
  let isLoading = false;
  let isQualified = false;
  let qualificationComplete = false;

  // Create widget container
  const createWidget = () => {
    const container = document.createElement('div');
    container.id = 'fitcoach-widget-container';
    container.innerHTML = `
      <style>
        #fitcoach-widget-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        #fitcoach-widget-button {
          width: 60px;
          height: 60px;
          border-radius: 30px;
          background: ${config.primaryColor || '#3B82F6'};
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        #fitcoach-widget-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        #fitcoach-widget-button svg {
          width: 28px;
          height: 28px;
          fill: white;
        }

        #fitcoach-chat-window {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 380px;
          height: 600px;
          max-height: calc(100vh - 120px);
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          display: none;
          flex-direction: column;
          overflow: hidden;
        }

        #fitcoach-chat-window.open {
          display: flex;
        }

        #fitcoach-chat-header {
          background: ${config.primaryColor || '#3B82F6'};
          color: white;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        #fitcoach-chat-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        #fitcoach-chat-close {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #fitcoach-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #F9FAFB;
        }

        .fitcoach-message {
          margin-bottom: 16px;
          display: flex;
          gap: 8px;
        }

        .fitcoach-message.user {
          justify-content: flex-end;
        }

        .fitcoach-message-content {
          max-width: 75%;
          padding: 12px 16px;
          border-radius: 12px;
          line-height: 1.5;
          font-size: 14px;
        }

        .fitcoach-message.assistant .fitcoach-message-content {
          background: white;
          color: #1F2937;
          border: 1px solid #E5E7EB;
        }

        .fitcoach-message.user .fitcoach-message-content {
          background: ${config.primaryColor || '#3B82F6'};
          color: white;
        }

        .fitcoach-typing {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: white;
          border-radius: 12px;
          width: fit-content;
          border: 1px solid #E5E7EB;
        }

        .fitcoach-typing span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #9CA3AF;
          animation: typing 1.4s infinite;
        }

        .fitcoach-typing span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .fitcoach-typing span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        #fitcoach-chat-input-container {
          padding: 16px;
          border-top: 1px solid #E5E7EB;
          background: white;
        }

        #fitcoach-chat-input-form {
          display: flex;
          gap: 8px;
        }

        #fitcoach-chat-input {
          flex: 1;
          padding: 12px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }

        #fitcoach-chat-input:focus {
          border-color: ${config.primaryColor || '#3B82F6'};
        }

        #fitcoach-chat-send {
          background: ${config.primaryColor || '#3B82F6'};
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        #fitcoach-chat-send:hover:not(:disabled) {
          opacity: 0.9;
        }

        #fitcoach-chat-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        #fitcoach-calendar-container {
          padding: 16px;
          text-align: center;
        }

        #fitcoach-calendar-container iframe {
          width: 100%;
          height: 450px;
          border: none;
          border-radius: 8px;
        }

        @media (max-width: 480px) {
          #fitcoach-chat-window {
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
            bottom: 0;
            right: 0;
            border-radius: 0;
          }
        }
      </style>

      <button id="fitcoach-widget-button" aria-label="Open chat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>

      <div id="fitcoach-chat-window">
        <div id="fitcoach-chat-header">
          <h3>Chat with us 💬</h3>
          <button id="fitcoach-chat-close" aria-label="Close chat">&times;</button>
        </div>
        <div id="fitcoach-chat-messages"></div>
        <div id="fitcoach-chat-input-container">
          <form id="fitcoach-chat-input-form">
            <input
              type="text"
              id="fitcoach-chat-input"
              placeholder="Type your message..."
              autocomplete="off"
            />
            <button type="submit" id="fitcoach-chat-send">Send</button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    // Event listeners
    document
      .getElementById('fitcoach-widget-button')
      .addEventListener('click', toggleChat);
    document
      .getElementById('fitcoach-chat-close')
      .addEventListener('click', toggleChat);
    document
      .getElementById('fitcoach-chat-input-form')
      .addEventListener('submit', handleSendMessage);
  };

  // Toggle chat window
  const toggleChat = async () => {
    isOpen = !isOpen;
    const chatWindow = document.getElementById('fitcoach-chat-window');

    if (isOpen) {
      chatWindow.classList.add('open');
      document.getElementById('fitcoach-chat-input').focus();

      // Start conversation if not already started
      if (!conversationId) {
        await startConversation();
      }
    } else {
      chatWindow.classList.remove('open');
    }
  };

  // Start new conversation
  const startConversation = async () => {
    try {
      const response = await fetch(`${API_URL}/api/chat/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coachId: config.coachId,
          source: window.location.href,
        }),
      });

      const data = await response.json();
      conversationId = data.conversationId;

      // Add welcome message
      addMessage('assistant', data.welcomeMessage);
    } catch (error) {
      console.error('Error starting conversation:', error);
      addMessage(
        'assistant',
        "Sorry, I'm having trouble connecting. Please try again."
      );
    }
  };

  // Handle send message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (isLoading || qualificationComplete) return;

    const input = document.getElementById('fitcoach-chat-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to UI
    addMessage('user', message);
    input.value = '';

    // Show typing indicator
    showTyping();
    isLoading = true;

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coachId: config.coachId,
          conversationId,
          message,
        }),
      });

      const data = await response.json();

      hideTyping();
      isLoading = false;

      // Add assistant response
      addMessage('assistant', data.response);

      // Check if qualification is complete
      if (data.qualificationComplete) {
        qualificationComplete = true;
        isQualified = data.qualified;

        // If qualified, show calendar
        if (isQualified && config.calendlyUrl) {
          setTimeout(() => {
            showCalendar();
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      hideTyping();
      isLoading = false;
      addMessage(
        'assistant',
        "Sorry, I'm having trouble right now. Please try again."
      );
    }
  };

  // Add message to chat
  const addMessage = (role, content) => {
    const messagesContainer = document.getElementById('fitcoach-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `fitcoach-message ${role}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'fitcoach-message-content';
    contentDiv.textContent = content;

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // Show typing indicator
  const showTyping = () => {
    const messagesContainer = document.getElementById('fitcoach-chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'fitcoach-typing-indicator';
    typingDiv.className = 'fitcoach-message assistant';
    typingDiv.innerHTML = `
      <div class="fitcoach-typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // Hide typing indicator
  const hideTyping = () => {
    const typingIndicator = document.getElementById('fitcoach-typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  };

  // Show calendar
  const showCalendar = () => {
    const inputContainer = document.getElementById(
      'fitcoach-chat-input-container'
    );
    inputContainer.style.display = 'none';

    const messagesContainer = document.getElementById('fitcoach-chat-messages');
    const calendarDiv = document.createElement('div');
    calendarDiv.id = 'fitcoach-calendar-container';
    calendarDiv.innerHTML = `
      <h3 style="margin-top: 0;">Book Your Call</h3>
      <iframe src="${config.calendlyUrl}?embed_domain=${window.location.hostname}&embed_type=Inline" loading="lazy"></iframe>
    `;

    messagesContainer.appendChild(calendarDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // Initialize widget
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }

  // Public API
  window.FitCoachWidget = {
    open: () => {
      if (!isOpen) toggleChat();
    },
    close: () => {
      if (isOpen) toggleChat();
    },
    isOpen: () => isOpen,
  };
})();
