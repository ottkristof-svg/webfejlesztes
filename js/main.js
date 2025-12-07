const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

const costForm = document.getElementById("costCalculator");
const calcResult = document.getElementById("calcResult");

if (costForm && calcResult) {
  costForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const days = Number(costForm.days.value);
    const divesPerDay = Number(costForm.divesPerDay.value);
    const pricePerDive = Number(costForm.pricePerDive.value);
    const equipmentPrice = Number(costForm.equipmentPrice.value);
    const otherCosts = Number(costForm.otherCosts.value || 0);

    if (
      days <= 0 ||
      divesPerDay <= 0 ||
      pricePerDive < 0 ||
      equipmentPrice < 0 ||
      otherCosts < 0
    ) {
      calcResult.textContent = "Kérlek, érvényes (pozitív) értékeket adj meg!";
      return;
    }

    const totalDives = days * divesPerDay;
    const diveCost = totalDives * pricePerDive;
    const equipCost = days * equipmentPrice;
    const otherCostTotal = days * otherCosts;
    const total = diveCost + equipCost + otherCostTotal;

    calcResult.textContent =
      "Összesen " +
      totalDives +
      " merülésre kb. " +
      total.toFixed(0) +
      " EUR költséggel számolhatsz (fiktív példa).";
  });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const clearError = (name) => {
    const field = contactForm.elements[name];
    const errorEl = contactForm.querySelector(
      '.error-message[data-for="' + name + '"]'
    );
  
    if (field && field.classList && name !== 'interest') { 
      field.classList.remove("error");
    }
    
    if (errorEl) {
      errorEl.textContent = "";
    }
  };


  const showError = (name, message) => {
    const field = contactForm.elements[name];
    const errorEl = contactForm.querySelector(
      '.error-message[data-for="' + name + '"]'
    );
    if (field && name !== 'interest') {
      field.classList.add("error");
    }
    if (errorEl) {
      errorEl.textContent = message;
    }
  };


  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  const validatePhone = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7;
  };

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formSuccess = document.getElementById("formSuccess");
    if (formSuccess) {
      formSuccess.textContent = "";
    }

    const nameValue = contactForm.name.value.trim();
    const emailValue = contactForm.email.value.trim();
    const phoneValue = contactForm.phone.value.trim();
    const experienceValue = contactForm.experience.value;
    const interestValue = contactForm.querySelector(
      "input[name='interest']:checked"
    );
    const messageValue = contactForm.message.value.trim();
    const acceptPolicyChecked = contactForm.acceptPolicy.checked;

    let isValid = true;

    clearError("name");
    if (!nameValue) {
      showError("name", "A név megadása kötelező.");
      isValid = false;
    } else if (nameValue.split(" ").length < 2) {
      showError("name", "Kérlek, add meg a vezeték- és keresztneved is.");
      isValid = false;
    }

    clearError("email");
    if (!emailValue) {
      showError("email", "Az e-mail cím megadása kötelező.");
      isValid = false;
    } else if (!validateEmail(emailValue)) {
      showError("email", "Kérlek, érvényes e-mail címet adj meg.");
      isValid = false;
    }

    clearError("phone");
    if (!phoneValue) {
      showError("phone", "A telefonszám megadása kötelező.");
      isValid = false;
    } else if (!validatePhone(phoneValue)) {
      showError("phone", "A telefonszám túl rövid vagy hibás.");
      isValid = false;
    }

    clearError("experience");
    if (!experienceValue) {
      showError("experience", "Kérlek, válaszd ki a tapasztalatod szintjét.");
      isValid = false;
    }

    clearError("interest");
    if (!interestValue) {
      showError("interest", "Kérlek, válaszd ki, milyen témában érdeklődsz.");
      isValid = false;
    }

    clearError("message");
    if (!messageValue) {
      showError("message", "Kérlek, írd le röviden, miben tudunk segíteni.");
      isValid = false;
    }

    clearError("acceptPolicy");
    if (!acceptPolicyChecked) {
      showError(
        "acceptPolicy",
        "A folytatáshoz el kell fogadnod az adatkezelési tájékoztatót."
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (formSuccess) {
      formSuccess.textContent =
        "Köszönjük az üzeneted! Hamarosan felvesszük veled a kapcsolatot (fiktív példa).";
    }
    contactForm.reset();
  });
}
