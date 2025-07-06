document.addEventListener("DOMContentLoaded", () => {
  // --- Elements for Members & Signup ---
  const signupForm = document.getElementById("signupForm");
  const memberList = document.getElementById("memberList");
  const formMsg = document.getElementById("formMsg"); // For signup form messages

  // --- Elements for Creations ---
  const creationForm = document.getElementById("creationForm");
  const creationsGrid = document.getElementById("creationsGrid");
  const creationFormMsg = document.getElementById("creationFormMsg"); // For creation form messages
  const creationNameInput = document.getElementById("creationNameInput");
  const creationDescriptionInput = document.getElementById("creationDescriptionInput");
  // Removed: suggestNameBtn, generateDescriptionBtn as they are for AI features

  // --- Helper function to display messages ---
  function displayMessage(element, message, isSuccess) {
    if (element) {
      element.textContent = message;
      element.style.color = isSuccess ? "green" : "red";
      setTimeout(() => {
        element.textContent = "";
        element.style.color = "";
      }, 3000);
    }
  }

  // === Render + remove members ===
  function renderMembers() {
    // This function will only execute if memberList element exists on the page
    if (!memberList) {
      return;
    }

    const members = JSON.parse(localStorage.getItem("members") || "[]");
    memberList.innerHTML = "";

    if (members.length === 0) {
      memberList.innerHTML = '<li class="text-center text-gray-600">No members yet. Be the first to join!</li>';
      return;
    }

    members.forEach((member, index) => {
      const li = document.createElement("li");
      li.classList.add("member");

      const display = document.createElement("span");
      display.innerHTML = `<strong>${member.username}</strong> <span class="text-gray-500 text-sm">(${member.role || 'No Role'})</span>`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      removeBtn.dataset.index = index;

      removeBtn.addEventListener("click", () => {
        const confirmDelete = confirm(
          `Are you sure you wanna kick ${member.username} from the Coffee Gang?`
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

  // === Render + remove creations ===
  function renderCreations() {
    // This function will only execute if creationsGrid element exists on the page
    if (!creationsGrid) {
      return;
    }

    const creations = JSON.parse(localStorage.getItem("creations") || "[]");
    creationsGrid.innerHTML = "";

    if (creations.length === 0) {
      creationsGrid.innerHTML = '<p class="text-center text-gray-600 col-span-full">No creations added yet. Be the first!</p>';
      return;
    }

    creations.forEach((creation, index) => {
      const card = document.createElement("div");
      card.classList.add("creation-card");

      // Fallback image if imageUrl is empty or invalid
      const imageUrl = creation.imageUrl || `https://placehold.co/400x180/EAEAEA/888888?text=${encodeURIComponent(creation.name || 'No Name')}`;

      card.innerHTML = `
        <img src="${imageUrl}" alt="${creation.name || 'Creation Image'}" onerror="this.onerror=null;this.src='https://placehold.co/400x180/EAEAEA/888888?text=Image+Not+Found';" />
        <h3>${creation.name || 'Unnamed Creation'}</h3>
        <p>${creation.description || 'No description provided.'}</p>
        <button class="remove-btn mt-4" data-index="${index}">Remove</button>
      `;

      const removeBtn = card.querySelector(".remove-btn");
      removeBtn.addEventListener("click", () => {
        const confirmDelete = confirm(
          `Are you sure you wanna remove "${creation.name || 'this creation'}" from the creations?`
        );
        if (confirmDelete) {
          creations.splice(index, 1);
          localStorage.setItem("creations", JSON.stringify(creations));
          renderCreations();
        }
      });

      creationsGrid.appendChild(card);
    });
  }

  // === Handle sign-ups ===
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = signupForm.querySelector("[name='Username']").value.trim();
      const role = signupForm.querySelector("[name='role']").value;

      if (!username || !role) {
        displayMessage(formMsg, "Please enter a username and select a role.", false);
        return;
      }

      const newMember = { username, role };
      const members = JSON.parse(localStorage.getItem("members") || "[]");
      members.push(newMember);
      localStorage.setItem("members", JSON.stringify(members));

      displayMessage(formMsg, "You're in!", true);
      signupForm.reset();
    });
  }

  // === Handle adding creations ===
  if (creationForm) {
    creationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = creationNameInput.value.trim();
      const description = creationDescriptionInput.value.trim();
      const imageUrl = creationForm.querySelector("[name='creationImageUrl']").value.trim();

      if (!name || !description) {
        displayMessage(creationFormMsg, "Please enter a creation name and description.", false);
        return;
      }

      const newCreation = { name, description, imageUrl };
      const creations = JSON.parse(localStorage.getItem("creations") || "[]");
      creations.push(newCreation);
      localStorage.setItem("creations", JSON.stringify(creations));

      displayMessage(creationFormMsg, "Creation added successfully!", true);
      creationForm.reset();
      renderCreations(); // Re-render creations immediately
    });

    // Removed: Event listeners for suggestNameBtn and generateDescriptionBtn
  }

  // --- Initial Renders based on page ---
  if (memberList) {
    renderMembers();
  }
  if (creationsGrid) {
    renderCreations();
  }
});
