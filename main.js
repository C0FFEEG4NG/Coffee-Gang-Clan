document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const memberList = document.getElementById("memberList");
  const formMsg = document.getElementById("formMsg"); // Get the form message element once

  // Function to render and remove members
  function renderMembers() {
    // IMPORTANT: Check if memberList element actually exists before proceeding
    if (!memberList) {
      console.error("Error: Element with ID 'memberList' not found in the HTML.");
      return; // Stop function execution if the element is missing
    }

    const members = JSON.parse(localStorage.getItem("members") || "[]");
    memberList.innerHTML = ""; // Clear existing list

    members.forEach((member, index) => {
      const li = document.createElement("li");
      li.classList.add("member");

      const display = document.createElement("span");
      // Display username and now the role
      display.innerHTML = `<strong>${member.username}</strong> <span class="text-gray-500 text-sm">(${member.role || 'No Role'})</span>`; // Display role, with fallback

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      removeBtn.dataset.index = index; // Store index for removal

      removeBtn.addEventListener("click", () => {
        const confirmDelete = confirm(
          `Are you sure you wanna kick ${member.username} from the Coffee Gang?`
        );
        if (confirmDelete) {
          // Remove member from the array
          members.splice(index, 1);
          // Update localStorage
          localStorage.setItem("members", JSON.stringify(members));
          // Re-render the list to reflect changes
          renderMembers();
        }
      });

      li.appendChild(display);
      li.appendChild(removeBtn);
      memberList.appendChild(li);
    });
  }

  // === Handle sign-ups ===
  if (signupForm) { // Check if signupForm exists before adding event listener
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission

      // Get username and the new role field
      const username = signupForm.querySelector("[name='Username']").value.trim();
      const role = signupForm.querySelector("[name='role']").value; // Get the selected role

      // Basic validation: Check if both username and role are empty
      if (!username || !role) { // Updated validation to include role
        if (formMsg) {
          formMsg.textContent = "Please enter a username and select a role.";
          formMsg.style.color = "red"; // Make error message red
          setTimeout(() => {
            formMsg.textContent = "";
            formMsg.style.color = ""; // Reset color
          }, 3000);
        }
        return; // Stop execution if validation fails
      }

      // Create new member object with username AND role
      const newMember = { username, role };

      // Retrieve existing members, or initialize an empty array if none
      const members = JSON.parse(localStorage.getItem("members") || "[]");
      members.push(newMember); // Add new member
      localStorage.setItem("members", JSON.stringify(members)); // Save updated list

      // Display success message and clear after a delay
      if (formMsg) {
        formMsg.textContent = "You're in!";
        formMsg.style.color = "green"; // Make success message green
        setTimeout(() => {
          formMsg.textContent = "";
          formMsg.style.color = ""; // Reset color
        }, 3000); // Clear after 3 seconds
      }

      signupForm.reset(); // Clear the form fields
      renderMembers(); // Re-render the list to show the new member
    });
  } else {
    console.error("Error: Element with ID 'signupForm' not found in the HTML.");
  }

  // Initial render of members when the page loads
  if (memberList) { // This check is still good for the initial call
    renderMembers();
  }
});
