// Function to load translations from the JSON file
function loadTranslations(lang) {
  return fetch(`/assets/translations/${lang}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching ${lang}.json:`, error);
    });
}

// Function to switch the language
function switchLanguage(lang) {
  console.log(`Switching language to: ${lang}`); // Debugging

  // Save the selected language in localStorage
  localStorage.setItem("preferredLanguage", lang);

  // Load translations
  loadTranslations(lang)
    .then((data) => {
      if (data) {
        console.log("Loaded translations:", data); // Debugging
        document.querySelectorAll("[data-translate]").forEach((element) => {
          const key = element.getAttribute("data-translate");
          if (data[key]) {
            console.log(`Updating "${key}" to "${data[key]}"`); // Debugging
            element.textContent = data[key];
          } else {
            console.warn(`Missing translation for key: "${key}"`); // Debugging
          }
        });
      } else {
        console.error(`No translation data available for language: "${lang}"`);
      }
    })
    .catch((error) =>
      console.error(`Error applying translations for ${lang}:`, error)
    );
}

// Event listener for DOM content load
document.addEventListener("DOMContentLoaded", () => {
  // Get the saved language from localStorage; default to 'en' if not set
  let savedLanguage = localStorage.getItem("preferredLanguage");

  if (!savedLanguage) {
    console.log("No language saved in localStorage. Defaulting to English.");
    savedLanguage = "en"; // Default to English on the first visit
  }

  // Apply the saved or default language
  switchLanguage(savedLanguage);

  // Add event listeners to the language switcher flags
  const languageSwitcher = document.querySelectorAll("#language-switcher img");
  languageSwitcher.forEach((flag) => {
    flag.addEventListener("click", () => {
      const lang = flag.getAttribute("data-lang"); // Get the language from the flag's data attribute
      switchLanguage(lang); // Apply the selected language
    });
  });
});
