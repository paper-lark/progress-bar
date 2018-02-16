/**
 * Progress bar module.
 * @module progress
 */

/**
 * Creates an instance of progress bar attached to the anchor element.
 * Automatically renders the progress bar once it's created.
 * @constructor
 * @param {HTMLElement | String} anchor - Anchor element on which the progress bar will be attached. Can be passed as an element or its ID.
 * @param {Number} progress - Starting progress value.
 * @param {'animated' | 'normal' | 'hidden'} mode - Starting progress bar state.
 * @param {Number} thickness - Stroke width. Default is 2.
 * @param {Number} expandSpeed - Progress expansion animation speed. Default is 20.
 * @param {Number} rotateSpeed - Rotation animation angle speed. Default is 5.
 * @param {String} bgColor - Background color of the progress bar. Default is '#E0E0E0'.
 * @param {String} fgColor - Main color of the progress bar. Default is '#FDD835'.
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
  /* Resolve anchor property */
  if (typeof anchor === 'string') {
    this._anchor = document.getElementById(anchor);
  } else {
    this._anchor = anchor;
  }

  /* Set parameters */
  this._ID = {
    animation: 0, // animation frame request ID (used to cancel animations)
    update: 0 // update animation frame request ID (used to cancel animations)
  };
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
  this._colors = {
    fg: fgColor,
    bg: bgColor
  }; // progress bar colors
  /* Render the progress bar */
  this.render();
}

/**
 * Update progress value.
 * Progress bar is re-rendered automatically.
 * @this {Progress}
 * @param {Number} progress - New progress value.
 */
Progress.prototype.setValue = function(progress) {
  this._value = progress;
  this.render();
};

/**
 * Change progress bar mode.
 * Value of 'yes' sets mode, value of 'no' or '' unsets it.
 * Progress bar is re-rendered automatically.
 * @this {Progress}
 * @param {animated' | 'hidden'} mode - Mode to change.
 * @param {'yes' | 'no' | ''} value - New value.
 */
Progress.prototype.setMod = function(mode, value) {
  this._state[mode] = value === 'yes';
  this.render();
};

/**
 * Renders progress bar.
 * @this {Progress}
 */
Progress.prototype.render = function() {
  if (this._state.hidden) {
    /* 
     * Hidden progress bar.
     * Cancel animations and hide element.
     */
    this._anchor.innerHTML = '';
    if (this._ID.animation !== 0) {
      window.cancelAnimationFrame(this._ID.animation);
      this._anchor.style.transform = '';
      this._ID.animation = 0;
    }
    if (this._ID.update !== 0) {
      window.cancelAnimationFrame(this._ID.update);
      this._ID.update = 0;
    }
  } else {
    /* 
     * Show progress bar.
     * State spinning animation if in 'animate' state.
     */
    this._display(); // show element in case element was hidden
    this._updateAnimation();
    if (this._state.animated) {
      if (this._ID.animation === 0) {
        this._rotateAnimation();
      }
    } else {
      /*
       * Cancel animation if there is one planned and reset anchor rotation.
       */
      if (this._ID.animation !== 0) {
        window.cancelAnimationFrame(this._ID.animation);
        this._ID.animation = 0;
        this._anchor.style.transform = '';
      }
    }
  }
};

/**
 * Starts routine that animates progress updates on the bar.
 * If a routine created before is still running, cancel it.
 * @private
 * @this {Progress}
 */
Progress.prototype._updateAnimation = function() {
  let previous = Date.now();
  function update() {
    /*
     * Keep updating the progress bar until it reaches desired value.
     */
    if (this._current !== this._value) {
      let current = Date.now();
      let delta = this._speed.expand * (current - previous) / 1000;
      if (this._current > this._value) {
        this._current = Math.max(this._current - delta, this._value); // reduce progress bar
      } else {
        this._current = Math.min(this._current + delta, this._value); // expand progress bar
      }
      previous = current;
      this._display();
      this._ID.update = window.requestAnimationFrame(update.bind(this));
    } else {
      /* 
       * Animation ended. Cleear ID field.
       */
      this._ID.update = 0;
    }
  }
  /*
   * Cancel previous animation if there is one.
   */
  if (this._ID.update !== 0) {
    window.cancelAnimationFrame(this._ID.update);
  }
  /*
   * Create new animation routine.
   */
  this._ID.update = window.requestAnimationFrame(update.bind(this));
};

/**
 * Starts routine that animated progress wheel rotation.
 * @private
 * @this {Progress}
 */
Progress.prototype._rotateAnimation = function() {
  /*
   * Derive angle from anchor state if it's already rotated.
   */
  let angle = 0;
  if (this._anchor.style.transform) {
    let value = this._anchor.style.transform;
    let pattern = /rotate\(([0-9]*.[0-9]*)((deg)|(rad))\)/;
    let matches = pattern.exec(value);
    if (matches && matches.length > 1) {
      angle = Number(matches[1]);
    }
  }
  let previous = Date.now();

  function rotate() {
    /*
     * Keep rotating the anchor element.
     */
    let current = Date.now();
    angle += (current - previous) * this._speed.rotate / 1000;
    previous = current;
    this._anchor.style.transform = `rotate(${angle}rad)`;
    this._ID.animation = window.requestAnimationFrame(rotate.bind(this));
  }
  /*
   * Cancel previous animation if there is one.
   */
  if (this._ID.animation !== 0) {
    window.cancelAnimationFrame(this._ID.animation);
  }
  /*
   * Create new animation routine.
   */
  this._ID.animation = window.requestAnimationFrame(rotate.bind(this));
};

/**
 * Displays progress bar on the anchor element
 * The size of the progress wheel is derived from the anchor element.
 * @private
 * @this {Progress}
 */
Progress.prototype._display = function() {
  /*
   * Create properties object.
   */
  const width = this._anchor.clientWidth;
  const height = this._anchor.clientHeight;
  const radius = (Math.min(width, height) - this._thickness) / 2;
  const props = {
    radius,
    width,
    height,
    thickness: this._thickness,
    fgColor: this._colors.fg,
    bgColor: this._colors.bg,
    centerX: width / 2,
    centerY: height / 2,
    progress: this._current
  };
  /*
   * Create an SVG path using it.
   */
  const path = createPath(props);
  /*
   * Put the path onto the anchor element.
   */
  this._anchor.innerHTML = path;
};

/**
 * Generates a path based on the passed properties.
 * @private
 * @param {Object} props - Properties object.
 * @return {String} - SVG element containing a path.
 */
function createPath(props) {
  /*
   * Create path for the bar background.
   */
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
  /*
   * Calculate end coordinates of the progress bar.
   */
  const angle = props.progress * Math.PI * 2 / 100;
  const x = Math.sin(angle) * props.radius + props.centerX;
  const y = props.centerY - Math.cos(angle) * props.radius;
  /*
   * Append path for the progress bar.
   */
  if (props.progress > 50) {
    /*
     * Use two arcs to make a path.
     */
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
    /*
     * Use two arcs to make a path.
     */
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

  /*
   * create SVG wrapper for the path and return it.
   */
  let rendered = `
    <svg width="${props.width}" height="${props.height}" version="1.1">
      ${path}
    </svg>
  `;
  return rendered;
}

export default Progress;
