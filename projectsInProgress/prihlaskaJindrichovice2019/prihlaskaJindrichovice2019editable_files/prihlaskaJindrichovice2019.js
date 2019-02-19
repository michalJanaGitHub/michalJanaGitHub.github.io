//check if document is ready
let stateCheck = setInterval(() => {
  if(document.readyState ==='complete'){
      pageInit();
      document.querySelector('#frmRegistration').addEventListener('submit', printForm);
      clearInterval(stateCheck);
  }
}, 100);

// Remove an element
function removeElement(id)
{
    if(typeof id === "object")
        return id.parentNode.removeChild(id);
    else
        return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}
// Hide an element
function hideElement(id) { 
  if(typeof id === "object")
    id.style.display = 'none';
else
    document.getElementById(id).style.display = 'none';
}
// Unhide an element
function unHideElement(id) { 
  if(typeof id === "object")
    id.style.display = 'block';
else
    document.getElementById(id).style.display = 'block';
}

//add submit event listener to form
function pageInit() {
  document.getElementById("childName").value = "Anička Nováková";
  document.getElementById("childPIN").value = "080512/1234";
  document.getElementById("childInsuranceCompany").value = "Hasičská zdravotní pojišťovna";
  document.getElementById("childAddress").value = "Dolní 5, 123 45 Havířov";

  document.getElementById("legalRepName").value = "Anna Nováková";
  document.getElementById("legalRepRelation").value = "Matka";
  document.getElementById("legalRepTel").value = "732003551";
  document.getElementById("legalRepEmail").value = "anna.novakova@gmail.com";
  document.getElementById("legalRep2Name").value = "Josef Novák";
  document.getElementById("legalRep2Relation").value = "Otec";
  document.getElementById("legalRep2Tel").value = "+421732003552";
  document.getElementById("legalRep2Email").value = "josef.novak@gmail.com";

  document.getElementsByName("howAboutEyeSight")[0].checked = true;  
  document.getElementsByName("canBraille")[0].checked = true;
  document.getElementsByName("canWhiteCane")[0].checked = true;
  document.getElementsByName("bringWhiteCane")[0].checked = true;
  document.getElementById("eyesightDetails").value = "bez brýlí toho moc nevidí";
  document.getElementById("movementRestrictionsEyeSight").value = "ne";
  
  document.getElementById("legalRep2Email").value = "josef.novak@gmail.com";
  
  
  // removeElement("frmRegChildPersonalData");   
  // removeElement("frmRegContactPersons");
  // removeElement("frmRegEyeSight");
  removeElement("frmRegHealth");
  removeElement("frmRegGDPR");
  removeElement("frmRegAdditionalInfo");
  hideElement("frmRegSignature");

  

  // document.querySelector('#frmRegistration').addEventListener('submit', validateForm);
}
 
function printForm() {
  unHideElement("frmRegSignature");
  hideElement("frmRegCheckAndPrint");
  window.print();
  unHideElement("frmRegCheckAndPrint");
  hideElement("frmRegSignature");
}