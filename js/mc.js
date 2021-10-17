(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='MMERGE3';ftypes[3]='text';fnames[4]='MMERGE4';ftypes[4]='text';}(jQuery));var $mcj = jQuery.noConflict(true);

let errorInlineResponse = null;

document.addEventListener('DOMContentLoaded', () => {
  const myInput = document.getElementById('my-email-input');
  const mySubmit = document.getElementById('my-signup-button');
  const myError = document.getElementById('my-signup-error');
  const myThankYou = document.getElementById('my-thank-you');

  const mcInput = document.getElementById('mce-EMAIL');
  const mcSubmit = document.getElementById('mc-embedded-subscribe');

  const errorResponse = document.getElementById('mce-error-response');
  
  const successResponse = document.getElementById('mce-success-response');
  const inputGroup = document.getElementById('mc-input-group');

  const showError = (errorMessage) => {
    myError.style.opacity = '1';
    myError.innerHTML = errorMessage;
  };

  const successObserver = new MutationObserver((mutationsList, observer) => {
    if (!successResponse.style.display.includes('none')) {
      myInput.value = '';
      setTimeout(() => {
        myThankYou.classList.remove('hidden');
        myThankYou.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  });

  const errorObserver = new MutationObserver((mutationsList, observer) => {
    console.log('error display: ' + errorResponse.style.display);
    if (!errorResponse.style.display.includes('none')) {
      console.log('error!!');
      showError(errorResponse.innerHTML);
    }
  });

  const errorInlineObserver = new MutationObserver((mutationsList, observer) => {
    console.log('error inline display: ' + errorInlineResponse.style.display);
    if (!errorInlineResponse.style.display.includes('none')) {
      console.log('inline error!!');
      showError(errorInlineResponse.innerHTML);
    }
  });

  const inputGroupObserver = new MutationObserver((mutationsList, observer) => {
    const errorInline = document.querySelector('div.mce_inline_error');

    if ((errorInline) && (errorInlineResponse == null)) {
      errorInlineResponse = errorInline;
      errorInlineObserver.observe(errorInlineResponse, { attributes : true });
      if (!errorInline.style.display.includes('none')) {
        console.log('first inline error!!');
        showError(errorInlineResponse.innerHTML);
      }
    }
  });

  successObserver.observe(successResponse, { attributes : true, attributeFilter : ['style'] });
  errorObserver.observe(errorResponse, { attributes : true, attributeFilter : ['style'] });
  inputGroupObserver.observe(inputGroup, { childList : true });

  myInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
      mcSubmit.click();
    } else {
      mcInput.value = myInput.value;
      myError.style.opacity = '0';
    }
  });

  mySubmit.addEventListener('click', () => {
    mcSubmit.click();
  });
});
