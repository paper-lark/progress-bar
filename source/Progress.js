/**
 * Progress class
 */

/**
 * Progress constructor
 * @param anchor : HTMLElement | String - anchor element on which the progress bar will be attached. Can be passed as an element or its ID.
 * @param progress : Number - starting progress value
 * @param mode : 'animated' | 'normal' | 'hidden' - starting progress bar state
 * @param thickness : Number - stroke width. Default is 2.
 * @param expandSpeed : Number - progress bar expansion animation speed. Default is 20.
 * @param rotateSpeed : Number - rotation animation angle speed. Default is 5.
 * @param bgColor : String - color of empty space in progress bar. Default is '#E0E0E0'.
 * @param fgColor : String - color of progress bar. Default is '#FDD835'.
 */
function Progress(
  anchor,
  progress,
  mode,
  thickness = 2,
  expandSpeed = 20,
  rotateSpeed = 5,
  bgColor = '#E0E0E0',
  fgColor = '#FDD835'
) {
  // resolve anchor property
  if (typeof anchor === 'string') {
    this._anchor = document.getElementById(anchor);
  } else {
    this._anchor = anchor;
  }

  // set parameters
  this._animationID = 0; // animation frame request ID (used to cancel animations)
  this._updateID = 0; // update animation frame request ID (used to cancel animations)
  this._thickness = thickness; // line thickness
  this._speed = {
    rotate: rotateSpeed,
    expand: expandSpeed
  }; // animations speed
  this._value = progress; // progress value
  this._current = 0; // current position of the progress (used for animation)
  this._state = {
    hidden: mode === 'hidden',
    animated: mode === 'animated'
  }; // state property
  this._fgColor = fgColor; // progress color
  this._bgColor = bgColor; // bar color
  // render the progress bar
  this.render();
}

/**
 * Method updates progress value
 * @param progress : Number - progress value
 */
Progress.prototype.setValue = function(progress) {
  console.log('> value updated');
  this._value = progress;
  this.render();
};

/**
 * Method sets progress bar mode.
 * Value of 'yes' sets mode, value of 'no' or '' unsets it.
 * Progress bar is re-rendered automatically.
 * @param mode : 'animated' | 'hidden'
 * @param value : 'yes' | 'no' | ''
 */
Progress.prototype.setMod = function(mode, value) {
  console.log('> mode updated');
  // update state
  this._state[mode] = value === 'yes';
  // re-render the view
  this.render();
};

/**
 * Method renders the progress bar depending on its state.
 */
Progress.prototype.render = function() {
  if (this._state.hidden) {
    // Hidden progress bar
    this._anchor.innerHTML = '';
    // cancel any animations
    if (this._animationID !== 0) {
      window.cancelAnimationFrame(this._animationID);
      this._animationID = 0;
      console.log('> animation cancelled');
    }
    if (this._updateID !== 0) {
      window.cancelAnimationFrame(this._updateID);
      this._updateID = 0;
      console.log('> animation cancelled');
    }
  } else {
    // Show progress bar
    this._display(); // show element in case element was hidden
    this._updateAnimation();
    if (this._state.animated) {
      // Animate progress bar if necessary
      if (this._animationID === 0) {
        this._rotateAnimation();
      }
    } else {
      // Cancel animation if there is one planned and reset anchor rotation
      if (this._animationID !== 0) {
        window.cancelAnimationFrame(this._animationID);
        this._animationID = 0;
        this._anchor.style.transform = '';
        console.log('> animation cancelled');
      }
    }
  }
  console.log('> component rendered');
};

/**
 * Updates progress on the progress bar.
 */
Progress.prototype._updateAnimation = function() {
  let previous = Date.now();
  function update() {
    // keep updating the progress bar until it reaches desired value
    if (this._current !== this._value) {
      let current = Date.now();
      let delta = this._speed.expand * (current - previous) / 1000;
      if (this._current > this._value) {
        // reduce
        this._current = Math.max(this._current - delta, this._value);
      } else {
        // expand
        this._current = Math.min(this._current + delta, this._value);
      }
      previous = current;
      this._display();
      this._updateID = window.requestAnimationFrame(update.bind(this));
    }
  }
  // cancel previous animations if present
  if (this._updateID !== 0) {
    window.cancelAnimationFrame(this._updateID);
  }
  // create new request
  this._updateID = window.requestAnimationFrame(update.bind(this));
};

/**
 * Rotate progress wheel.
 */
Progress.prototype._rotateAnimation = function() {
  // derive angle from anchor state if it's already rotated
  let angle = 0;
  if (this._anchor.style.transform) {
    let value = this._anchor.style.transform;
    let pattern = /rotate\(([0-9]*.[0-9]*)((deg)|(rad))\)/;
    let matches = pattern.exec(value);
    if (matches && matches.length > 1) {
      angle = Number(matches[1]);
      console.log(`> angle derived: ${angle}`);
    }
  }
  let previous = Date.now();

  function rotate() {
    let current = Date.now();
    angle += (current - previous) * this._speed.rotate / 1000;
    previous = current;
    this._anchor.style.transform = `rotate(${angle}rad)`;
    this._animationID = window.requestAnimationFrame(rotate.bind(this));
  }
  this._animationID = window.requestAnimationFrame(rotate.bind(this));
};

/**
 * Display progress bar depending on the size of anchor element.
 */
Progress.prototype._display = function() {
  // create props object
  const width = this._anchor.clientWidth;
  const height = this._anchor.clientHeight;
  const radius = (Math.min(width, height) - this._thickness) / 2;
  const props = {
    radius,
    width,
    height,
    thickness: this._thickness,
    fgColor: this._fgColor,
    bgColor: this._bgColor,
    centerX: width / 2,
    centerY: height / 2,
    progress: this._current
  };
  // create path
  const path = createPath(props);
  // put path on the anchor element
  this._anchor.innerHTML = path;
};

/**
 * Create path based on properties object
 * @param props : Object - properties object
 */
function createPath(props) {
  // create path for the bar
  let path = `
    <g stroke="${props.bgColor}" stroke-width="${props.thickness}" fill="none">
      <path 
        d="
          M ${props.centerX},${props.centerY - props.radius}
          a ${props.radius},${props.radius} 0 0,1 0,${2 * props.radius}
          a ${props.radius},${props.radius} 0 0,1 0,${-2 * props.radius}
        "
      />
    </g>
  `;
  // calculate end coordinates of the progress
  const angle = props.progress * Math.PI * 2 / 100;
  const x = Math.sin(angle) * props.radius + props.centerX;
  const y = props.centerY - Math.cos(angle) * props.radius;
  // append path for progress
  if (props.progress > 50) {
    // make a progress path out of two arcs
    path += `
      <g stroke="${props.fgColor}" stroke-width="${
      props.thickness
    }" fill="none">
        <path
          d="
            M ${props.centerX},${props.centerY - props.radius}
            a ${props.radius},${props.radius} 0 0,1 0,${2 * props.radius}
            A ${props.radius},${props.radius} 0 0,1 ${x},${y}
          "
        />
      </g>
    `;
  } else {
    // make a progress path with one arc
    path += `
      <g stroke="${props.fgColor}" stroke-width="${
      props.thickness
    }" fill="none">
        <path
          d="
            M ${props.centerX},${props.centerY - props.radius}
            A ${props.radius},${props.radius} 0 0,1 ${x},${y}
          "
        />
      </g>
    `;
  }

  // create svg element for the path
  let rendered = `
    <svg width="${props.width}" height="${props.height}" version="1.1">
      ${path}
    </svg>
  `;
  return rendered;
}

export default Progress;
