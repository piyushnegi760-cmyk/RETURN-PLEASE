let currentQRId = null;
let currentQRUrl = null;


/* Generate unique RETURN PLEASE ID */

function generateUniqueID() {

  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let randomPart = "";

  for (let i = 0; i < 6; i++) {

    const randomIndex =
      Math.floor(Math.random() * characters.length);

    randomPart += characters[randomIndex];
  }

  return "RP-" + randomPart;
}


/* Generate QR */

function generateQR() {

  const itemName =
    document.getElementById("itemName").value.trim();

  const finderMessage =
    document.getElementById("finderMessage").value.trim();


  if (!itemName) {

    alert("Please enter your item name.");

    return;
  }


  /* Generate new ID */

  currentQRId = generateUniqueID();


  /*
    IMPORTANT:

    Change this domain when your real
    RETURN PLEASE website is live.
  */

  currentQRUrl =
    "https://returnplease.in/f/" + currentQRId;


  /* Clear previous QR */

  const qrArea =
    document.getElementById("qrArea");

  qrArea.innerHTML = "";


  /* QR wrapper */

  const qrBox =
    document.createElement("div");

  qrBox.className = "qr-box";

  qrBox.id = "generatedQR";


  /* Brand */

  const brand =
    document.createElement("div");

  brand.className = "qr-brand";

  brand.innerText = "RETURN PLEASE";


  /* QR */

  const qr =
    document.createElement("div");

  qr.id = "qrcode";


  qrBox.appendChild(brand);

  qrBox.appendChild(qr);

  qrArea.appendChild(qrBox);


  /* Create QR */

  new QRCode(qr, {

    text: currentQRUrl,

    width: 220,

    height: 220,

    colorDark: "#182033",

    colorLight: "#ffffff",

    correctLevel: QRCode.CorrectLevel.H

  });


  /* Update information */

  document.getElementById("qrId").innerText =
    currentQRId;

  document.getElementById("displayItem").innerText =
    itemName;


  document.getElementById("status").innerText =
    "Generated";


  document.getElementById("qrInfo")
    .classList.remove("hidden");


  /*
    Save locally for testing.
  */

  const qrData = {

    id: currentQRId,

    itemName: itemName,

    finderMessage: finderMessage,

    url: currentQRUrl,

    createdAt: new Date().toISOString()

  };


  localStorage.setItem(
    "returnPlease_" + currentQRId,
    JSON.stringify(qrData)
  );


  localStorage.setItem(
    "returnPleaseLatest",
    JSON.stringify(qrData)
  );


  /* Scroll to QR */

  document.getElementById("qrArea")
    .scrollIntoView({

      behavior: "smooth",

      block: "center"

    });

}


/* Copy QR ID */

function copyQRId() {

  if (!currentQRId) {

    alert("Generate a QR first.");

    return;
  }


  navigator.clipboard
    .writeText(currentQRId)
    .then(() => {

      alert(
        "QR ID copied: " + currentQRId
      );

    })
    .catch(() => {

      alert("Could not copy QR ID.");

    });

}


/* Download QR */

function downloadQR() {

  if (!currentQRId) {

    alert("Generate a QR first.");

    return;
  }


  const canvas =
    document.querySelector("#qrcode canvas");


  if (!canvas) {

    alert("QR is not ready yet.");

    return;
  }


  const link =
    document.createElement("a");


  link.download =
    "RETURN-PLEASE-" +
    currentQRId +
    ".png";


  link.href =
    canvas.toDataURL("image/png");


  link.click();

}


/* Reset */

function resetGenerator() {

  currentQRId = null;

  currentQRUrl = null;


  document.getElementById("itemName").value = "";

  document.getElementById("finderMessage").value = "";


  document.getElementById("qrArea").innerHTML = `

    <div class="empty-state">

      <div class="qr-placeholder">
        QR
      </div>

      <p>Your QR will appear here</p>

    </div>

  `;


  document.getElementById("qrInfo")
    .classList.add("hidden");


  document.getElementById("status")
    .innerText = "Ready";

}