// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

AddressBook.prototype.addHomePhone = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};


// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumbers, newEmail, newAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumbers = phoneNumbers;
  this.newEmail = newEmail;
  this.newAddress = newAddress;
}

function multiPhone(home, work, emergencycontact, other) {
  this.home = home;
  this.work = work;
  this.emergencycontact = emergencycontact;
  this.other = other;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".new-email").html(contact.newEmail);
  $(".new-address").html(contact.newAddress);
  let buttons = $("#buttons");

  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", ".updateButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedAddEmail = $("input#new-email").val();
    const inputtedSchool = $("input#school").val();
    const inputtedWork = $("input#work").val();
    const inputtedEmergencyContact = $("input#emergencyContact").val();
    const inputtedOther = $("input#other").val();
    const inputtedAddress = $("input#new-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-email").val("");
    $("input#new-address").val("");
    const phoneNumbers = new multiPhone(inputtedSchool, inputtedWork, inputtedEmergencyContact, inputtedOther);
    const newContact = new Contact(inputtedFirstName, inputtedLastName, phoneNumbers, inputtedAddEmail, inputtedAddress);
    console.log(phoneNumbers);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});