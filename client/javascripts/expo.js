(function(){

  // Initialize foundation
  $(document).foundation();

  var currentModal;

  var router = function(){
    var teamName = location.hash && location.hash.slice(1);

    if(teamName){
      // There is a team
      console.log("team", teamName);
      currentModal = $('#modal-'+teamName);
      currentModal.foundation('reveal', 'open', {});
    }else{
      // Close modal and unset currentModal
      console.log("unset team");
      if(currentModal){
        currentModal.foundation('reveal', 'close', {});
      }
      currentModal = null;
    }
  };

  // Remove hash when modal is closed
  // Reference: http://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-with-javascript-without-page-refresh
  $(document).on('closed', '[data-reveal]', function () {
    var scrollTop = document.body.scrollTop;

    location.hash = ""; // Triggers router(), but should have no side-effects.

    document.body.scrollTop = scrollTop;
  });

  window.onhashchange = router;
  router();


}());