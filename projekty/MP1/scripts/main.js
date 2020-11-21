const addNewAddressButton = document.getElementById("add-address");
const addressForm = document.getElementById("address-form");
const addressSelect = document.getElementsByClassName("address-select");

addNewAddressButton.onclick = e => {
  addressSelect[0].style.display = 'none';
  addressForm.style.display = 'grid';
}
