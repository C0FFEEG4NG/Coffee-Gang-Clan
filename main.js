// === Sign-up Form Logic ===
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const displayName = signupForm.displayName.value.trim();
    const creationName = signupForm.creationName.value.trim();
    const rank = signupForm.rank.value;

    const newMember = { displayName, creationName, rank };

    const members = JSON.parse(localStorage.getItem("members") || "[]");
    members.push(newMember);
    localStorage.setItem("members", JSON.stringify(members));

    document.getElementById("formMsg").textContent = "You're in";
    signupForm.reset();
  });
}

// === Members Page Logic ===
const memberList = document.getElementById("memberList");

function renderMembers() {
  const members = JSON.parse(localStorage.getItem("members") || "[]");
  memberList.innerHTML = "";

  members.forEach((member, index) => {
    const li = document.createElement("li");
    li.className = "member";

      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    memberList.appendChild(li);
  });
}

memberList?.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const index = e.target.getAttribute("data-index");

    const members = JSON.parse(localStorage.getItem("members") || "[]");
    const member = members[index];

    const confirmDelete = confirm(
      `Are you sure you wanna kick ${member.Username} from the Coffee Gang?`
    );

    if (confirmDelete) {
      members.splice(index, 1);
      localStorage.setItem("members", JSON.stringify(members));
      renderMembers();
    }
  }
});

if (memberList) renderMembers();
