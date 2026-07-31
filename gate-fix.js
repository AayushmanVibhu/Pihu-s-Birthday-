(() => {
  'use strict';

  const removeGateButton = () => {
    const actionButton = document.getElementById('action');
    if (actionButton) {
      const actionPad = actionButton.closest('.pad');
      if (actionPad) actionPad.remove();
      else actionButton.remove();
    }
  };

  removeGateButton();

  const observer = new MutationObserver(removeGateButton);
  observer.observe(document.body, { childList: true, subtree: true });
})();
