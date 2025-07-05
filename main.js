document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const memberList = document.getElementById("memberList");

  // === Handle sign-ups ===
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const Username = signupForm.querySelector("[name='Username']").value.trim();
  const creationName = signupForm.querySelector("[name='creationName']").value.trim();
  const rank = signupForm.querySelector("[name='rank']").value;

  const newMember = { Username, creationName, rank };

  const members = JSON.parse(localStorage.getItem("members") || "[]");
  members.push(newMember);
  localStorage.setItem("members", JSON.stringify(members));

  document.getElementById("formMsg").textContent = "You're in";
  signupForm.reset();
});

  // === Render + remove members ===
  function renderMembers() {
    const members = JSON.parse(localStorage.getItem("members") || "[]");
    memberList.innerHTML = "";

    members.forEach((member, index) => {
      const li = document.createElement("li");
      li.classList.add("member");

      const display = document.createElement("span");
      display.innerHTML = `<strong>${member.Username}</strong> (${member.rank})${
        member.creationName ? ` - Fav: ${member.creationName}` : ""
      }`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      removeBtn.dataset.index = index;

      removeBtn.addEventListener("click", () => {
        const confirmDelete = confirm(
          `Are you sure you wanna kick ${member.Username} from the Coffee Gang?`
        );
        if (confirmDelete) {
          members.splice(index, 1);
          localStorage.setItem("members", JSON.stringify(members));
          renderMembers();
        }
      });

      li.appendChild(display);
      li.appendChild(removeBtn);
      memberList.appendChild(li);
    });
  }

  if (memberList) {
    renderMembers();
  }
});
