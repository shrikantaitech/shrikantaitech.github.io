/* ShrikantAI Innovation — main.js (vanilla JS, no dependencies) */

(function () {
  "use strict";

  /* ---------- mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- dynamic copyright year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- enquiry form: validate, then hand off to WhatsApp ---------- */
  var WHATSAPP_NUMBER = "919890964512";
  var form = document.querySelector(".enquiry");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var fields = {
        name: form.querySelector("#name"),
        business: form.querySelector("#business"),
        email: form.querySelector("#email"),
        phone: form.querySelector("#phone"),
        requirement: form.querySelector("#requirement")
      };

      var isValid = true;

      function markInvalid(input, invalid) {
        var wrapper = input.closest(".field");
        if (!wrapper) return;
        wrapper.classList.toggle("invalid", invalid);
      }

      function isEmpty(input) {
        return !input || input.value.trim().length === 0;
      }

      function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      function isValidPhone(value) {
        var digits = value.replace(/[^0-9]/g, "");
        return digits.length >= 10;
      }

      // Required: name, email, requirement. Business + phone optional but validated if filled.
      if (isEmpty(fields.name)) {
        markInvalid(fields.name, true);
        isValid = false;
      } else {
        markInvalid(fields.name, false);
      }

      if (isEmpty(fields.email) || !isValidEmail(fields.email.value.trim())) {
        markInvalid(fields.email, true);
        isValid = false;
      } else {
        markInvalid(fields.email, false);
      }

      if (fields.phone && fields.phone.value.trim().length > 0 && !isValidPhone(fields.phone.value.trim())) {
        markInvalid(fields.phone, true);
        isValid = false;
      } else if (fields.phone) {
        markInvalid(fields.phone, false);
      }

      if (isEmpty(fields.requirement)) {
        markInvalid(fields.requirement, true);
        isValid = false;
      } else {
        markInvalid(fields.requirement, false);
      }

      if (!isValid) {
        var firstInvalid = form.querySelector(".field.invalid input, .field.invalid textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var name = fields.name.value.trim();
      var business = fields.business ? fields.business.value.trim() : "";
      var email = fields.email.value.trim();
      var phone = fields.phone ? fields.phone.value.trim() : "";
      var requirement = fields.requirement.value.trim();

      var lines = [
        "New enquiry from the ShrikantAI Innovation website",
        "",
        "Name: " + name
      ];
      if (business) lines.push("Business: " + business);
      lines.push("Email: " + email);
      if (phone) lines.push("Phone: " + phone);
      lines.push("", "Project requirement:", requirement);

      var message = lines.join("\n");
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);

      var successBox = form.querySelector(".form-success");
      if (successBox) {
        successBox.classList.add("show");
        successBox.setAttribute("tabindex", "-1");
        successBox.focus();
      }

      window.open(url, "_blank", "noopener");
    });
  }
})();
