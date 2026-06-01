
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("[data-hearing-check]");
  if (!form) return;
  const result = document.querySelector("[data-hearing-result]");
  const checkboxes = form.querySelectorAll("input[type='checkbox']");
  const resetButton = form.querySelector("[data-check-reset]");

  function showResult(event) {
    if (event) event.preventDefault();
    const score = Array.from(checkboxes).filter(cb => cb.checked).length;
    let title, message, nextSteps, levelClass;
    if (score <= 2) {
      title = "Low concern";
      levelClass = "low";
      message = "Your answers suggest a lower level of concern today. Continue monitoring your hearing and communication needs.";
      nextSteps = "Consider scheduling a baseline hearing test with an audiologist, especially if you have never had an adult hearing evaluation. A baseline test helps track future changes.";
    } else if (score <= 5) {
      title = "Moderate concern";
      levelClass = "moderate";
      message = "Your answers suggest that hearing difficulty may be affecting daily communication.";
      nextSteps = "Schedule a comprehensive hearing evaluation with an audiologist. The evaluation can include hearing thresholds, speech understanding, middle ear measures, counseling, and recommendations.";
    } else {
      title = "Higher concern";
      levelClass = "high";
      message = "Your answers suggest that hearing difficulty may be affecting communication, participation, or safety.";
      nextSteps = "Schedule a comprehensive hearing evaluation with an audiologist. Bring examples of difficult situations such as restaurants, phone calls, TV, meetings, family conversations, or appointments.";
    }
    const urgent = "Urgent concern: seek prompt medical care for sudden hearing loss, ear pain, drainage, dizziness, sudden tinnitus, or sudden changes in hearing.";
    result.className = "result-box " + levelClass;
    result.innerHTML = "<strong>" + title + "</strong><p>You selected " + score + " concern" + (score === 1 ? "" : "s") + ".</p><p>" + message + "</p><p><strong>Suggested next step:</strong> " + nextSteps + "</p><p><strong>" + urgent + "</strong></p><p><em>This tool is educational only and does not diagnose hearing loss.</em></p>";
    result.removeAttribute("hidden");
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  form.addEventListener("submit", showResult);
  if (resetButton) resetButton.addEventListener("click", function () {
    checkboxes.forEach(cb => cb.checked = false);
    result.setAttribute("hidden", "hidden");
    result.className = "result-box is-hidden";
    result.innerHTML = "";
  });
});
