import Progress from './Progress';
import '../stylesheets/style.scss';

/**
 * Create handlers for all used elements
 */
const animate = document.getElementById('animate');
const hidden = document.getElementById('hide');
const value = document.getElementById('value');
const anchor = document.getElementById('progress');

/**
 * Create progress bar once content of the page is loaded
 * and styles are applied.
 */
window.addEventListener('load', function() {
  const progress = new Progress(anchor, 10, 'normal', 10, 20, 5);
  animate.addEventListener('change', function() {
    console.dir(this);
    console.log('> animation toggled');
    progress.setMod('animated', this.checked ? 'yes' : 'no');
  });
  hidden.addEventListener('change', function() {
    console.log('> hidden toggled');
    progress.setMod('hidden', this.checked ? 'yes' : 'no');
  });
  value.addEventListener('keypress', function(event) {
    // update progress value on Enter
    if (event.keyCode === 13) {
      event.preventDefault(); // prevent form submission
      let value = Number(this.value);
      console.log(`> progress set to ${value}`);
      progress.setValue(value);
    }
  });
});
