"use strict";

var KTSignupGeneral = (function () {
  var e, t, r, a;

  var isPasswordStrong = function () {
    return a.getScore() > 50;
  };

  return {
    init: function () {
      e = document.querySelector("#kt_sign_up_form");
      t = document.querySelector("#kt_sign_up_submit");
      a = KTPasswordMeter.getInstance(
        e.querySelector('[data-kt-password-meter="true"]')
      );

      var validateForm = function () {
        return FormValidation.formValidation(e, {
          fields: {
            "first-name": {
              validators: {
                notEmpty: { message: "First Name is required" },
              },
            },
            "last-name": {
              validators: {
                notEmpty: { message: "Last Name is required" },
              },
            },
            email: {
              validators: {
                regexp: {
                  regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "The value is not a valid email address",
                },
                notEmpty: { message: "Email address is required" },
              },
            },
            password: {
              validators: {
                notEmpty: { message: "The password is required" },
                callback: {
                  message: "Please enter a valid password",
                  callback: function (e) {
                    return e.value.length > 0 ? isPasswordStrong() : false;
                  },
                },
              },
            },
            "confirm-password": {
              validators: {
                notEmpty: { message: "Password confirmation is required" },
                identical: {
                  compare: function () {
                    return e.querySelector('[name="password"]').value;
                  },
                  message: "Passwords do not match",
                },
              },
            },
            toc: {
              validators: {
                notEmpty: {
                  message: "You must accept the terms and conditions",
                },
              },
            },
          },
          plugins: {
            trigger: new FormValidation.plugins.Trigger({
              event: { password: false },
            }),
            bootstrap: new FormValidation.plugins.Bootstrap5({
              rowSelector: ".fv-row",
              eleInvalidClass: "",
              eleValidClass: "",
            }),
          },
        });
      };

      r = validateForm();

      t.addEventListener("click", function (s) {
        s.preventDefault();
        r.revalidateField("password");

        r.validate().then(function (validationStatus) {
          if (validationStatus === "Valid") {
            t.setAttribute("data-kt-indicator", "on");
            t.disabled = true;

            let formData = new FormData(e);

            // Log form data for debugging
            console.log("Form Data:");
            for (let pair of formData.entries()) {
              console.log(`${pair[0]}: ${pair[1]}`);
            }
            axios
              .post(
                t.closest("form").getAttribute("action"),
                new URLSearchParams(formData),
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then(function (response) {
                if (response.data.success) {
                  e.reset();
                  const redirectUrl = e.getAttribute("data-kt-redirect-url");
                  if (redirectUrl) {
                   location.href = redirectUrl;
                  }
                } else {
                  Swal.fire({
                    text:
                      response.data.message ||
                      "Sorry, there was an error. Please try again.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: { confirmButton: "btn btn-primary" },
                  });
                }
              })
              .catch(function (error) {
                console.error("Error submitting form:", error);
                Swal.fire({
                  text: "Sorry, an error occurred. Please try again.",
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: { confirmButton: "btn btn-primary" },
                });
              })
              .finally(() => {
                t.removeAttribute("data-kt-indicator");
                t.disabled = false;
              });
          } else {
            Swal.fire({
              text: "There are validation errors. Please check your inputs.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: { confirmButton: "btn btn-primary" },
            });
          }
        });
      });

      e.querySelector('input[name="password"]').addEventListener(
        "input",
        function () {
          if (this.value.length > 0) {
            r.updateFieldStatus("password", "NotValidated");
          }
        }
      );
    },
  };
})();

KTUtil.onDOMContentLoaded(function () {
  KTSignupGeneral.init();
});
