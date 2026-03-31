const sectionSelect = document.getElementById("section");
const gender = document.getElementById("gender");

async function loadSections() {
    const res = await fetch("/sections");
    const data = await res.json();

    sectionSelect.innerHTML = '<option value="">Select Section</option>';

    data.forEach(sec => {
        const opt = document.createElement("option");
        opt.value = sec;
        opt.textContent = sec;
        sectionSelect.appendChild(opt);
    });
}

loadSections();

sectionSelect.addEventListener("change", () => {
    document.getElementById("measurements").classList.remove("hidden");
});

gender.addEventListener("change", () => {
    if (gender.value === "Male") {
        document.getElementById("maleFields").classList.remove("hidden");
        document.getElementById("femaleFields").classList.add("hidden");
    } else if (gender.value === "Female") {
        document.getElementById("femaleFields").classList.remove("hidden");
        document.getElementById("maleFields").classList.add("hidden");
    }
});

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        gender: gender.value,
        address: address.value,
        contact: contact.value,
        parent: parent.value,
        section: sectionSelect.value,
        measurements: {
            chest: chest.value,
            waist: waist.value,
            height: height.value,
            pants: pants?.value || null,
            skirt: skirt?.value || null
        }
    };

    const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
    loadSections();
});
