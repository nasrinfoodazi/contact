const fields = [
  {
    type: "text",
    key: "first_name",
    isRequired: true,
    errors: {
      isRequired: "this field is required",
    },
  },
  {
    type: "text",
    key: "last_name",
    isRequired: true,
    errors: {
      isRequired: "this field is required",
    },
  },
  {
    type: "email",
    key: "email",
    isRequired: true,
    isEmail: true,
    errors: {
      isRequired: "please enter a valid email address",
      isEmail: "email is invalid",
    },
  },
  {
    type: "radio",
    key: "option",
    isRequired: true,
    errors: {
      isRequired: "please select a quary type",
    },
  },
  {
    type: "checkbox",
    key: "agree",
    isRequired: true,
    errors: {
      isRequired: "to submit this form.please consent to being contacted",
    },
  },
  {
    type: "text",
    key: "message",
    isRequired: true,
    errors: {
      isRequired: "this field is required",
    },
  },
];

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

fields.forEach((item) => {
  if (["text", "email"].includes(item.type)) {
    let element = document.querySelector("#" + item.key);
    element.addEventListener("input", (event) => {
      checkValidation(item, event.target.value);
    });
  } else if (item.type === "radio") {
    let element = document.getElementsByName(item.key);
    element.forEach((radioEle) => {
      radioEle.addEventListener("click", (event) => {
        [...document.getElementsByClassName("radio_type")].forEach((i) => {
          i.style.backgroundColor = "var(--white)";
        });
        if (event.target.value) {
          document.querySelector(
            "#" + event.target.getAttribute("id") + "_parent"
          ).style.backgroundColor = "var(--green-200)";
        }
        checkValidation(item, event.target.value);
      });
    });
  } else if (item.type === "checkbox") {
    let element = document.querySelector("#" + item.key);
    element.addEventListener("change", (event) => {
      checkValidation(item, event.target.checked);
    });
  }
});
/*******notification*********/
function showNotification() {
  let notification = document.querySelector("#notification");
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}
function checkValidation(item, value) {
  let error = null;
  if (item.isRequired && !value) {
    error = item?.errors?.isRequired;
  } else if (item.isEmail && !validateEmail(value)) {
    error = item?.errors?.isEmail;
  }
  if (error) {
    document.querySelector("#" + item.key + "_error").innerText = error;
  } else {
    document.querySelector("#" + item.key + "_error").innerText = "";
  }
  return error;
}

document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
  e.preventDefault();
  let errors = {};
  let data = {};
  fields.forEach((item) => {
    if (["text", "email"].includes(item.type)) {
      value = document.querySelector("#" + item.key).value;
      errors[item.key] = checkValidation(item, value);
    } else if (item.type === "radio") {
      let element = document.getElementsByName(item.key);
      option = Array.from(element).find((radio) => radio.checked);
      value = option?.value;
      errors[item.key] = checkValidation(item, value);
    } else if (item.type === "checkbox") {
      value = document.querySelector("#" + item.key).checked;
      errors[item.key] = checkValidation(item, value);
    }
    if (!errors[item.key]) {
      Reflect.deleteProperty(errors, item.key);
    }
    data[item.key] = value;
  });
  console.log("errors", errors, data);
  if (!Object.keys(errors).length) {
    showNotification();
  }
});
