//check if document is ready
let stateCheck = setInterval(() => {
  if(document.readyState ==='complete'){
    pageInit();
    createTestingVersion();
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


function pageInit() {
  hideElement("frmRegSignature"); 
}


function createTestingVersion() {

  var el = document.getElementsByTagName('h1')[0],
    elChild = document.createElement('h4');
  elChild.innerHTML = 'TESTOVACÍ VERZE !!!';
  // Prepend it
  el.insertBefore(elChild, el.firstChild);

  document.getElementById("diteJmeno").value = "Anička Nováková";
  document.getElementById("diteRC").value = "080512/1234";
  document.getElementById("ditePojistovna").value = "Hasičská zdravotní pojišťovna";
  document.getElementById("diteadresa").value = "Dolní 5, 123 45 Havířov";

  document.getElementById("zakZastJmeno").value = "Anna Nováková";
  document.getElementById("zakZastVztah").value = "Matka";
  document.getElementById("zakZasTel").value = "732003551";
  document.getElementById("zakZasEmail").value = "anna.novakova@gmail.com";
  document.getElementById("zakZast2Jmeno").value = "Josef Novák";
  document.getElementById("zakZast2Vztah").value = "Otec";
  document.getElementById("zakZast2Tel").value = "+421732003552";
  document.getElementById("zakZast2Email").value = "josef.novak@gmail.com";

  document.getElementsByName("jakDiteVidi")[0].checked = true;  
  document.getElementsByName("umiBraille")[0].checked = true;
  document.getElementsByName("umiSBilouHoli")[0].checked = true;
  document.getElementsByName("budeMitBilouHul")[0].checked = true;
  document.getElementById("zrakDetaily").value = "bez brýlí toho moc nevidí";
  document.getElementById("omezeniSkrZrakVadu").value = "ne";
  
  document.getElementById("uzivaneLeky").value = "ne";
  document.getElementById("ostatniAlergieDetaily").value = "ne";
  document.getElementById("zakazanePotraviny").value = "ne";  
  document.getElementById("ostatniNemoci").value = "ne";
  document.getElementById("jesteNecoBychomMeliVedet").value = "ne";
  document.getElementById("doctorContact").value = "Mudr. Jiří Novák, 987 777 554, Havířov";

  document.getElementsByName("pomocovani")[0].checked = true;  
  document.getElementsByName("canSleepInBunkBed")[0].checked = true;
  document.getElementsByName("canSwim")[0].checked = true;
  document.getElementsByName("nightBattleGame")[0].checked = true;
  document.getElementById("diteCharakterizuj").value = "Anička je super"

  document.getElementsByName("gdprSouhlasSeZverejnenim")[0].checked = true;  
  document.getElementsByName("gdprMuzemOznacit")[0].checked = true;
  
  // removeElement("frmRegChildPersonalData");   
  // removeElement("frmRegContactPersons");
  // removeElement("frmRegEyeSight");
  // removeElement("frmRegHealth");
  // removeElement("frmRegAdditionalInfo");
  // removeElement("frmRegGDPR");
  // removeElement("frmRegSignature");

  // document.querySelector('#frmRegistration').addEventListener('submit', validateForm);
}
 
function printForm() {
  unHideElement("frmRegSignature");
  hideElement("frmRegCheckAndPrint");
  window.print();
  unHideElement("frmRegCheckAndPrint");
  hideElement("frmRegSignature");
}