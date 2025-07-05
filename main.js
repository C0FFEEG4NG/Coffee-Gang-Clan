(() => {
  const form = document.getElementById("signupForm");
  const list = document.getElementById("memberList");
  const msg = document.getElementById("formMsg");

  // Get members from localStorage
  const getMembers = () => JSON.parse(localStorage.getItem("coffeeGangMembers")) || [];
  const saveMembers = (arr) => localStorage.setItem("coffeeGangMembers", JSON.stringify(arr));

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const newMember = {
        name: data.get("displayName"),
        creation: data.get("creationName"),
        rank: data.get("rank"),
        joined: new Date().toISOString(),
      };
      const members = getMembers();
      members.push(newMember);
      saveMembers(members);
      msg.textContent = "🎉 Welcome to the Coffee Gang! Redirecting...";
      msg.style.color = "var(--accent)";
      setTimeout(() => {
        window.location.href = "members.html";
      }, 1200);
    });
  }

  if (list) {
    const members = getMembers();
    if (members.length === 0) {
      list.innerHTML = "<p>No gang members yet — be the first! ☕✨</p>";
    } else {
      members.reverse().forEach((m) => {
        const li = document.createElement("li");
        li.className = "member";
        li.innerHTML = `
          <span><strong>${m.name}</strong> <span class="rank">(${m.rank})</span></span>
          <span class="creation">${m.creation ? m.creation : "No fav creation yet"}</span>
          <span class="joined">${new Date(m.joined).toLocaleDateString()}</span>
        `;
        list.appendChild(li);
      });
    }
  }
})();
