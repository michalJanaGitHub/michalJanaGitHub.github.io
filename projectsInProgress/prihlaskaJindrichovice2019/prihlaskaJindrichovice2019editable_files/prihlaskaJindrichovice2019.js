//check if document is ready
let stateCheck = setInterval(() => {
  if(document.readyState ==='complete'){
      pageInit();
      clearInterval(stateCheck);
  }
}, 100);

function removeElement(id)
{
    if(typeof id === "object")
        return id.parentNode.removeChild(id);
    else
        return (elem=document.getElementById(id)).parentNode.removeChild(elem);
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
  document.getElementById("legalRep2Relation").value = "Matka";
  document.getElementById("legalRep2Tel").value = "+421732003552";
  document.getElementById("legalRep2Email").value = "josef.novak@gmail.com";
  
  removeElement("frmRegChildPersonalData");   
  removeElement("frmRegContactPersons"); 
  // removeElement("frmRegEyeSight");
  removeElement("frmRegHealth");
  removeElement("frmRegGDPR");
  removeElement("frmRegAdditionalInfo");
  removeElement("frmRegSignature");

  

  // document.querySelector('#frmRegistration').addEventListener('submit', validateForm);
 }