const isAuthorized = window.location.search.includes("dev=true");

if (!isAuthorized) {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("keydown", (e) => {
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) // Ctrl+Shift+I or Ctrl+Shift+J
    ) {
      e.preventDefault();
    }
  });
}
