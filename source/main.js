/*
 * Main script.
 */

import Progress from './Progress';
import '../stylesheets/style.scss';

/*
 * Create handlers for all used elements.
 */
const animate = document.getElementById('animate');
const hidden = document.getElementById('hide');
const value = document.getElementById('value');
const anchor = document.getElementById('progress');

/*
 * Create progress bar once content of the page is loaded
 * and styles are applied.
 */
window.addEventListener('load', function() {
  const progress = new Progress(anchor, 10, 'normal', 10, 20, 5);
  /* Toggle animation state */
  animate.addEventListener('change', function() {
    progress.setMod('animated', this.checked ? 'yes' : 'no');
  });
  /* Toggle hidden state */
  hidden.addEventListener('change', function() {
    progress.setMod('hidden', this.checked ? 'yes' : 'no');
  });
  /* Update progress on Enter */
  value.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault(); // prevent form submission
      let value = Number(this.value);
      progress.setValue(value);
    }
  });
  /* Re-render on window resize */
  window.addEventListener('resize', function() {
    progress.render();
  });
});
