document.addEventListener('DOMContentLoaded', () => {
  let currentTheme = "default";
  // ---------------- Dark Mode Toggle ----------------
  const modeToggle = document.getElementById('modeToggle');
  if(modeToggle){
    modeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      modeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
      localStorage.setItem('mgf_dark', document.body.classList.contains('dark-mode') ? '1' : '0');
    });
  }
  if(localStorage.getItem('mgf_dark') === '1') document.body.classList.add('dark-mode');

  // ---------------- Theme Selector ----------------
  document.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentTheme = btn.dataset.theme;
      if (!document.body.classList.contains("dark-mode")) {
        applyTheme(currentTheme);
       }
    });
  });

  function applyTheme(theme) {
    document.body.classList.remove("theme-blue", "theme-green", "theme-purple", "theme-default");
    document.body.classList.add(`theme-${theme}`);
  }

  // ---------------- Font Size Control ----------------
  let fontSize = 16; 
  document.getElementById("fontUp").addEventListener("click", () => {
   fontSize += 2;
  document.body.style.fontSize = fontSize + "px";
  });
  document.getElementById("fontDown").addEventListener("click", () => {
   fontSize -= 2;
   if (fontSize < 10) fontSize = 10; 
   document.body.style.fontSize = fontSize + "px";
  });

  // ---------------- Feedback Popup ----------------
  const feedbackBtn = document.getElementById("feedbackBtn");
  const feedbackPopup = document.getElementById("feedbackPopup");
  const feedbackForm = document.getElementById("feedbackForm");
  if(feedbackBtn && feedbackPopup){
    feedbackBtn.addEventListener("click", () => {
      feedbackPopup.style.display = feedbackPopup.style.display === "none" ? "block" : "none";
    });
  }
  if(feedbackForm){
    feedbackForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thank you for your feedback!");
      feedbackPopup.style.display = "none";
    });
  }
  
  // ---------------- Strategy Wheel / Profile ----------------
  const panelTitle = document.querySelector('.strategy-panel .panel-title');
  const panelDesc  = document.querySelector('.strategy-panel .panel-desc');
  const nodes = Array.from(document.querySelectorAll('.strategy-diagram .node'));
  const core = document.querySelector('.strategy-diagram .core');
  const diagram = document.querySelector('.strategy-diagram');

  if(nodes.length && panelTitle && core && diagram){

    function clearActive() {
      nodes.forEach(n => n.classList.remove(
        'active', 'top', 'bottom', 'left', 'right',
        'top-left', 'top-right', 'bottom-left', 'bottom-right'
      ));
    }

    function showPanel(node) {
      const title = node.getAttribute('data-title') || node.textContent.trim();
      const desc  = node.getAttribute('data-desc') || '';
      panelTitle.textContent = title;
      panelDesc.textContent = desc;
      clearActive();

      const diagramRect = diagram.getBoundingClientRect();
      const centerX = diagramRect.left + diagramRect.width / 2;
      const centerY = diagramRect.top + diagramRect.height / 2;

      const nodeRect = node.getBoundingClientRect();
      const nodeCenterX = nodeRect.left + nodeRect.width / 2;
      const nodeCenterY = nodeRect.top + nodeRect.height / 2;

      const dx = nodeCenterX - centerX;
      const dy = nodeCenterY - centerY;

      let dir = "";
      if(Math.abs(dx)<20) dir = dy<0 ? "top" : "bottom";
      else if(Math.abs(dy)<20) dir = dx<0 ? "left" : "right";
      else dir = (dy<0 ? "top" : "bottom") + "-" + (dx<0 ? "left" : "right");

      node.classList.add('active', dir);
      node.focus();
    }

    nodes.forEach(node => {
      node.addEventListener('click', () => showPanel(node));
      node.addEventListener('keydown', (e)=>{
        if(e.key==='Enter'||e.key===' '){ e.preventDefault(); showPanel(node); }
      });
    });

    core.addEventListener('click', () => {
      clearActive();
      panelTitle.textContent = 'click on one of the points';
      panelDesc.textContent  = 'Select the strategy wheel on the left to see details.';
      core.focus();
    });
  }

  // ---------------- Message Us Form ----------------
  const msgForm = document.getElementById('messageFormPage') || document.getElementById('messageForm');
  if(msgForm){
    const outName = document.getElementById('outNamePage') || document.getElementById('outName');
    const outDob = document.getElementById('outDobPage') || document.getElementById('outDob');
    const outGender = document.getElementById('outGenderPage') || document.getElementById('outGender');
    const outMsg = document.getElementById('outMessagePage') || document.getElementById('outMessage');
    const currentTimeEl = document.getElementById('currentTimePage') || document.getElementById('currentTime');

    if(currentTimeEl){
      function updateTime(){ currentTimeEl.textContent = new Date().toLocaleTimeString(); }
      setInterval(updateTime,1000);
    }

    msgForm.addEventListener('submit', e=>{
      e.preventDefault();
      if(outName) outName.textContent = msgForm.querySelector('input[name="name"]').value;
      if(outDob) outDob.textContent = msgForm.querySelector('input[name="dob"]').value;
      if(outGender) outGender.textContent = msgForm.querySelector('input[name="gender"]:checked')?.value || '';
      if(outMsg) outMsg.textContent = msgForm.querySelector('textarea[name="messageText"]').value;
    });
  }

  // Validasi JS
    if(!nameInput.value.trim()){
      alert("Please fill in the name!");
      nameInput.focus();
      return;
    }
    if(!dobInput.value.trim()){
      alert("Please fill in your date of birth!");
      dobInput.focus();
      return;
    }
    if(!genderInput){
      alert("Please select gender!");
      return;
    }
    if(!messageInput.value.trim()){
      alert("Please fill in the message!");
      messageInput.focus();
      return;
    }

    // Update output
    if(outName) outName.textContent = nameInput.value;
    if(outDob) outDob.textContent = dobInput.value;
    if(outGender) outGender.textContent = genderInput.value;
    if(outMsg) outMsg.textContent = messageInput.value;

});

