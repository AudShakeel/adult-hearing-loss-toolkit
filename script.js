const questions = [
  "In restaurants, family gatherings, or meetings, do voices blend together so that words are hard to follow?",
  "Do you often ask people to repeat because you heard sound but missed the words?",
  "Do people seem to be mumbling more than they used to?",
  "Does someone else ask you to lower the TV, radio, or phone volume?",
  "Are phone calls or video calls harder than talking face to face?",
  "Do you miss names, numbers, addresses, or medical instructions unless they are written down?",
  "Do you feel worn out after listening in groups, meetings, or noisy places?",
  "Do you avoid social events, restaurants, worship services, or work gatherings because hearing is stressful?",
  "Do you hear ringing, buzzing, roaring, or hissing that other people do not hear?",
  "Has a spouse, friend, family member, or coworker told you that you miss what people say?"
];
const container = document.getElementById('questions');
questions.forEach((q, i) => {
  const div = document.createElement('div');
  div.className = 'question';
  div.innerHTML = `<p><strong>${i+1}. ${q}</strong></p><div class="answers"><label><input required type="radio" name="q${i}" value="yes"> Yes</label><label><input type="radio" name="q${i}" value="no"> No</label></div>`;
  container.appendChild(div);
});
document.getElementById('quiz').addEventListener('submit', function(e){
  e.preventDefault();
  const urgent = document.getElementById('urgent').checked;
  const yesCount = questions.reduce((sum, _, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    return sum + (selected && selected.value === 'yes' ? 1 : 0);
  }, 0);
  const result = document.getElementById('result');
  if (urgent) {
    result.innerHTML = `<h2>Seek medical care promptly</h2><p>You checked an urgent sign. Please do not wait for a routine appointment or use this quiz as your next step. Contact a medical professional, urgent care, or an ear, nose, and throat doctor. Sudden hearing changes may need quick treatment.</p>`;
  } else if (yesCount <= 1) {
    result.innerHTML = `<h2>Few signs today</h2><p>You answered yes to ${yesCount} question(s). This does not prove normal hearing, but your answers do not show many common warning signs. If you are concerned, have noise exposure, tinnitus, family history, or are age 50 or older, a baseline evaluation with an audiologist is still reasonable.</p>`;
  } else if (yesCount <= 3) {
    result.innerHTML = `<h2>Some signs are present</h2><p>You answered yes to ${yesCount} questions. A comprehensive audiological evaluation with a licensed audiologist is recommended. Bring your top three hard listening situations to the appointment.</p>`;
  } else {
    result.innerHTML = `<h2>Several signs are present</h2><p>You answered yes to ${yesCount} questions. A comprehensive audiological evaluation with a licensed audiologist is strongly recommended. Do not start by buying devices from a hearing aid dispenser, retailer, or warehouse club before you know your hearing map.</p>`;
  }
  result.scrollIntoView({behavior:'smooth'});
});
document.getElementById('resetBtn').addEventListener('click', function(){
  document.getElementById('quiz').reset();
  document.getElementById('urgent').checked = false;
  document.getElementById('result').innerHTML = '';
});
