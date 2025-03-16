"use strict";
var KTSigninGeneral = (function () {
  var t, e, r;
  return {
    init: function () {
      (t = document.querySelector("#kt_sign_in_form")),
        (e = document.querySelector("#kt_sign_in_submit")),
        (r = FormValidation.formValidation(t, {
          fields: {
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
              validators: { notEmpty: { message: "The password is required" } },
            },
          },
          plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
              rowSelector: ".fv-row",
              eleInvalidClass: "",
              eleValidClass: "",
            }),
          },
        })),
        !(function (t) {
          try {
            return new URL(t), !0;
          } catch (t) {
            return !1;
          }
        })(e.closest("form").getAttribute("action"))
          ? e.addEventListener("click", function (i) {
              i.preventDefault(),
                r.validate().then(function (r) {
                  "Valid" == r
                    ? (e.setAttribute("data-kt-indicator", "on"),
                      (e.disabled = !0),
                      setTimeout(function () {
                        e.removeAttribute("data-kt-indicator"),
                          (e.disabled = !1),
                          Swal.fire({
                            text: "You have successfully logged in!",
                            icon: "success",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: { confirmButton: "btn btn-primary" },
                          }).then(function (e) {
                            if (e.isConfirmed) {
                              (t.querySelector('[name="email"]').value = ""),
                                (t.querySelector('[name="password"]').value =
                                  "");
                              var r = t.getAttribute("data-kt-redirect-url");
                              r && (location.href = r);
                            }
                          });
                      }, 2e3))
                    : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: { confirmButton: "btn btn-primary" },
                      });
                });
            })
          : e.addEventListener("click", function (i) {
              i.preventDefault(),
                r.validate().then(function (r) {
                    let formData = new FormData(t);
                    // Log form data for debugging
                    console.log("Form Data:");
                    for (let pair of formData.entries()) {
                      console.log(`${pair[0]}: ${pair[1]}`);
                    }
                    console.log(t.closest("form").getAttribute("action"));
                    console.log(e.closest("form").getAttribute("action"))

                  "Valid" == r
                    ? (e.setAttribute("data-kt-indicator", "on"),
                      (e.disabled = !0),
                      axios
                        .post(
                          t.closest("form").getAttribute("action"),
                          new URLSearchParams(formData),
                          {
                            headers: {
                              "Content-Type":
                                "application/x-www-form-urlencoded",
                            },
                          }
                        )
                        .then(function (response) {
                          // Debugging: Log the response from the server
                          console.log("Response from server:", response);
                          if (response.data) {
                            // Debugging: Log the data being sent
                            console.log("Data sent to server:", response.data);
                            t.reset(),
                              Swal.fire({
                                text: "You have successfully logged in!",
                                icon: "success",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                  confirmButton: "btn btn-primary",
                                },
                              });
                            const redirectUrl = t.getAttribute(
                              "data-kt-redirect-url"
                            );
                            redirectUrl && (location.href = redirectUrl);
                          } else Swal.fire({ text: "Sorry, the email or password is incorrect, please try again.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } });
                        })
                        .catch(function (error) {
                          // Debugging: Log the error
                          console.error("Error during Axios request:", error);
                          Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: { confirmButton: "btn btn-primary" },
                          });
                        })
                        .then(() => {
                          e.removeAttribute("data-kt-indicator"),
                            (e.disabled = !1);
                        }))
                    : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: { confirmButton: "btn btn-primary" },
                      });
                });
            });
    },
  };
})();
KTUtil.onDOMContentLoaded(function () {
  KTSigninGeneral.init();
});
