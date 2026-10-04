/* =========================================
   RETURN PLEASE
   RESERVATION WEBSITE
   ========================================= */


/*
  IMPORTANT:

  Yahan apna WhatsApp number daalo.

  India ke liye:
  91 + 10 digit number

  Example:
  const WHATSAPP_NUMBER = "919876543210";
*/

const WHATSAPP_NUMBER = "919762463324";


/* ================= MOBILE MENU ================= */

const menuBtn =
  document.getElementById("menuBtn");

const nav =
  document.getElementById("nav");


if (menuBtn) {

  menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

  });

}


/* Close mobile menu after clicking link */

document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", () => {

    nav.classList.remove("active");

  });

});


/* ================= RESERVATION FORM ================= */

const reservationForm =
  document.getElementById("reservationForm");

const successMessage =
  document.getElementById("successMessage");

const whatsappButton =
  document.getElementById("whatsappButton");


reservationForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    /* Get form values */

    const name =
      document.getElementById("name")
        .value
        .trim();


    const phone =
      document.getElementById("phone")
        .value
        .trim();


    const city =
      document.getElementById("city")
        .value
        .trim();


    const quantity =
      document.getElementById("quantity")
        .value;


    const item =
      document.getElementById("item")
        .value;


    const message =
      document.getElementById("message")
        .value
        .trim();


    /* ================= VALIDATION ================= */


    if (name.length < 2) {

      alert("Please enter your name.");

      return;

    }


    /* Indian mobile number validation */

    const phonePattern =
      /^[6-9][0-9]{9}$/;


    if (!phonePattern.test(phone)) {

      alert(
        "Please enter a valid 10-digit mobile number."
      );

      return;

    }


    if (city.length < 2) {

      alert("Please enter your city.");

      return;

    }


    /* ================= PRICE ================= */

    const pricePerQR = 49;

    const totalPrice =
      Number(quantity) * pricePerQR;


    /* ================= RESERVATION ID ================= */

    const reservationId =
      createReservationID();


    /* ================= DATE ================= */

    const currentDate =
      new Date();


    const date =
      currentDate.toLocaleDateString(
        "en-IN"
      );


    const time =
      currentDate.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit"
        }
      );


    /* ================= WHATSAPP MESSAGE ================= */

    const whatsappMessage =

`🔵 RETURN PLEASE — NEW RESERVATION

Reservation ID: ${reservationId}

👤 Customer Details
Name: ${name}
Mobile: ${phone}
City: ${city}

📦 Order Details
Quantity: ${quantity}
Item: ${item}
Price: ₹${totalPrice}

📝 Message:
${message || "No additional message"}

📅 Date: ${date}
⏰ Time: ${time}

Please confirm my RETURN PLEASE reservation.`;


    /* Encode message */

    const encodedMessage =
      encodeURIComponent(
        whatsappMessage
      );


    /* WhatsApp URL */

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


    /* ================= SAVE LOCALLY ================= */

    const reservation = {

      reservationId: reservationId,

      name: name,

      phone: phone,

      city: city,

      quantity: quantity,

      item: item,

      totalPrice: totalPrice,

      message: message,

      date: date,

      time: time

    };


    localStorage.setItem(

      "returnPleaseReservation_" +
      reservationId,

      JSON.stringify(reservation)

    );


    localStorage.setItem(

      "returnPleaseLatestReservation",

      JSON.stringify(reservation)

    );


    /* ================= SHOW SUCCESS ================= */

    reservationForm.classList.add(
      "hidden"
    );


    successMessage.classList.remove(
      "hidden"
    );


    whatsappButton.href =
      whatsappURL;


    /* Scroll */

    successMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }
);


/* ================= CREATE RESERVATION ID ================= */

function createReservationID() {

  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


  let random =
    "";


  for (let i = 0; i < 6; i++) {

    const index =
      Math.floor(
        Math.random() *
        characters.length
      );


    random +=
      characters[index];

  }


  return "RP-RES-" + random;

}


/* ================= NEW RESERVATION ================= */

function newReservation() {

  reservationForm.reset();


  successMessage.classList.add(
    "hidden"
  );


  reservationForm.classList.remove(
    "hidden"
  );


  document
    .getElementById("reserve")
    .scrollIntoView({

      behavior: "smooth",

      block: "start"

    });

}