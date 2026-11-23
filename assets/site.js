(function(){
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
  var btn=document.querySelector('.menu-btn'), nav=document.getElementById('nav');
  if(btn&&nav) btn.addEventListener('click',function(){
    var o=nav.classList.toggle('open'); btn.setAttribute('aria-expanded',o);
  });

  // No backend yet: forms open the visitor's email app addressed to the association.
  // Replace with a form service endpoint (e.g. Formspree) when ready.
  var TO='info@independentbrokersassociation.org';
  function wire(id,subject){
    var f=document.getElementById(id); if(!f) return;
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=f.querySelector('.form-msg'); msg.className='form-msg';
      if(!f.checkValidity()){ msg.classList.add('err'); msg.textContent='Please complete all required fields.'; f.reportValidity(); return; }
      var lines=[];
      new FormData(f).forEach(function(v,k){ if(v) lines.push(k+': '+v); });
      location.href='mailto:'+TO+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
      msg.classList.add('ok'); msg.textContent='Opening your email app to send this. Thank you!';
    });
  }
  wire('join-form','Membership application');
  wire('contact-form','Website inquiry');
})();
