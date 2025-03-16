"use strict";

var KTCustomersList = (function () {
  var t, e;

  // Function to initialize the delete action
  var o = () => {
    e.querySelectorAll('[data-kt-customer-table-filter="delete_row"]').forEach(
      (e) => {
        e.addEventListener("click", function (e) {
          e.preventDefault();
          const o = e.target.closest("tr"),
            n = o.querySelectorAll("td")[1].innerText;
          Swal.fire({
            text: "Are you sure you want to delete " + n + "?",
            icon: "warning",
            showCancelButton: !0,
            buttonsStyling: !1,
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn fw-bold btn-danger",
              cancelButton: "btn fw-bold btn-active-light-primary",
            },
          }).then(function (e) {
            if (e.value) {
              // Make an API request to delete the record from the database
              fetch(`/api/customers/delete/${o.dataset.id}`, {
                method: "DELETE",
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success) {
                    Swal.fire({
                      text: "You have deleted " + n + "!",
                      icon: "success",
                      buttonsStyling: !1,
                      confirmButtonText: "Ok, got it!",
                      customClass: { confirmButton: "btn fw-bold btn-primary" },
                    }).then(function () {
                      t.row($(o)).remove().draw();
                    });
                  }
                });
            } else {
              Swal.fire({
                text: n + " was not deleted.",
                icon: "error",
                buttonsStyling: !1,
                confirmButtonText: "Ok, got it!",
                customClass: { confirmButton: "btn fw-bold btn-primary" },
              });
            }
          });
        });
      }
    );
  };

  // Checkbox handling
  var n = () => {
    const o = e.querySelectorAll('[type="checkbox"]'),
      n = document.querySelector(
        '[data-kt-customer-table-select="delete_selected"]'
      );

    o.forEach((t) => {
      t.addEventListener("click", function () {
        setTimeout(() => c(), 50);
      });
    });

    n.addEventListener("click", function () {
      Swal.fire({
        text: "Are you sure you want to delete selected customers?",
        icon: "warning",
        showCancelButton: !0,
        buttonsStyling: !1,
        confirmButtonText: "Yes, delete!",
        cancelButtonText: "No, cancel",
        customClass: {
          confirmButton: "btn fw-bold btn-danger",
          cancelButton: "btn fw-bold btn-active-light-primary",
        },
      }).then(function (n) {
        if (n.value) {
          const idsToDelete = [];
          o.forEach((e) => {
            if (e.checked) {
              idsToDelete.push(e.dataset.id);
            }
          });

          fetch("/api/customers/delete-multiple", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: idsToDelete }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                Swal.fire({
                  text: "You have deleted all selected customers!",
                  icon: "success",
                  buttonsStyling: !1,
                  confirmButtonText: "Ok, got it!",
                  customClass: { confirmButton: "btn fw-bold btn-primary" },
                }).then(function () {
                  idsToDelete.forEach((id) => {
                    t.row($(`[data-id="${id}"]`))
                      .remove()
                      .draw();
                  });
                  e.querySelectorAll('[type="checkbox"]')[0].checked = !1;
                });
              }
            });
        } else {
          Swal.fire({
            text: "Selected customers were not deleted.",
            icon: "error",
            buttonsStyling: !1,
            confirmButtonText: "Ok, got it!",
            customClass: { confirmButton: "btn fw-bold btn-primary" },
          });
        }
      });
    });
  };

  const c = () => {
    const t = document.querySelector('[data-kt-customer-table-toolbar="base"]'),
      o = document.querySelector('[data-kt-customer-table-toolbar="selected"]'),
      n = document.querySelector(
        '[data-kt-customer-table-select="selected_count"]'
      ),
      c = e.querySelectorAll('tbody [type="checkbox"]');

    let r = !1,
      l = 0;
    c.forEach((t) => {
      t.checked && ((r = !0), l++);
    });

    r
      ? ((n.innerHTML = l),
        t.classList.add("d-none"),
        o.classList.remove("d-none"))
      : (t.classList.remove("d-none"), o.classList.add("d-none"));
  };

  return {
    init: function () {
      e = document.querySelector("#kt_customers_table");
      if (e) {
        t = $(e)
          .DataTable({
            info: !1,
            order: [],
            processing: true,
            serverSide: true,
            ajax: {
              url: "/admin/api/users", // 🔹 Fetch data from server
              type: "GET",
              dataSrc: function (json) {
                console.log("Fetched data from API:", json); // Log the fetched data
                return json.data; // Assuming the data is in json.data
              }
            },
            columns: [
              { data: "checkbox", orderable: false },
              { data: "name" },
              { data: "email" },
              { data: "phone" },
              { data: "status" },
              { data: "created_at" },
              { data: "actions", orderable: false },
            ],
            columnDefs: [
              { targets: 0, orderable: false },
              { targets: 6, orderable: false },
            ],
          })
          .on("draw", function () {
            n();
            o();
            c();
          });

        // 🔎 Search filter
        document
          .querySelector('[data-kt-customer-table-filter="search"]')
          .addEventListener("keyup", function (e) {
            t.search(e.target.value).draw();
          });

        n();
        o();
      }
    },
  };
})();

// Initialize when the page loads
KTUtil.onDOMContentLoaded(function () {
  KTCustomersList.init();
});
