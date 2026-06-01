
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("[data-hearing-check]");
  if (!form) return;
  const result = document.querySelector("[data-hearing-result]");
  const checkboxes = form.querySelectorAll("input[type='checkbox']");
  function updateResult() {
    const score = Array.from(checkboxes).filter(cb => cb.checked).length;
    let title, message;
    if (score === 0) {title="No concerns selected";message="Your answers do not strongly suggest a hearing concern today. Continue to monitor your hearing, especially if communication becomes harder.";}
    else if (score <= 2) {title="Monitor and consider screening";message="A small number of concerns were selected. If these situations happen often, a hearing screening or audiology evaluation may be helpful.";}
    else if (score <= 5) {title="Consider an audiology evaluation";message="Your answers suggest that a comprehensive hearing evaluation with an audiologist may be helpful. An audiologist can test hearing, speech understanding, middle ear function, and daily communication needs.";}
    else {title="Audiology evaluation recommended";message="Your answers strongly suggest that a comprehensive hearing evaluation with an audiologist is recommended. This tool is educational and does not diagnose hearing loss.";}
    result.innerHTML = "<strong>" + title + "</strong><p>You selected " + score + " concern" + (score === 1 ? "" : "s") + ". " + message + "</p>";
  }
  checkboxes.forEach(cb => cb.addEventListener("change", updateResult));
  updateResult();
});
