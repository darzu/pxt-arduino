// Auto-generated. Do not edit.


    /**
     * Creation, manipulation and display of LED images.
     */
    //% color=#5C2D91 weight=31
declare namespace images {

    /**
     * Creates an image that fits on the LED screen.
     */
    //% weight=75 help=images/create-image
    //% blockId=device_build_image block="create image" imageLiteral=1 shim=images::createImage
    function createImage(leds: string): Image;

    /**
     * Creates an image with 2 frames.
     */
    //% weight=74 help=images/create-big-image
    //% blockId=device_build_big_image block="create big image" imageLiteral=2 shim=images::createBigImage
    function createBigImage(leds: string): Image;
}


declare interface Image {
    /**
     * Plots the image at a given column to the screen
     */
    //% help=images/plot-image xOffset.defl=0 shim=ImageMethods::plotImage
    plotImage(xOffset?: number): void;

    /**
     * Shows an frame from the image at offset ``x offset``.
     * @param xOffset column index to start displaying the image
     */
    //% help=images/show-image weight=80 blockNamespace=images
    //% blockId=device_show_image_offset block="show image %sprite|at offset %offset" blockGap=8 shim=ImageMethods::showImage
    showImage(xOffset: number): void;

    /**
     * Draws the ``index``-th frame of the image on the screen.
     * @param xOffset column index to start displaying the image
     */
    //% help=images/plot-frame weight=80 shim=ImageMethods::plotFrame
    plotFrame(xOffset: number): void;

    /**
     * Scrolls an image .
     * @param frameOffset x offset moved on each animation step, eg: 5, 1, -1
     * @param interval time between each animation step in milli seconds, eg: 200
     */
    //% help=images/show-image weight=79 async blockNamespace=images
    //% blockId=device_scroll_image block="scroll image %sprite|with offset %frameoffset|and interval (ms) %delay" blockGap=8 shim=ImageMethods::scrollImage
    scrollImage(frameOffset: number, interval: number): void;

    /**
     * Sets all pixels off.
     */
    //% help=images/clear shim=ImageMethods::clear
    clear(): void;

    /**
     * Sets a specific pixel brightness at a given position
     */
    //% shim=ImageMethods::setPixelBrightness
    setPixelBrightness(x: number, y: number, value: number): void;

    /**
     * Gets the pixel brightness ([0..255]) at a given position
     */
    //% shim=ImageMethods::pixelBrightness
    pixelBrightness(x: number, y: number): number;

    /**
     * Gets the width in columns
     */
    //% help=functions/width shim=ImageMethods::width
    width(): number;

    /**
     * Gets the height in rows (always 5)
     */
    //% shim=ImageMethods::height
    height(): number;

    /**
     * Set a pixel state at position ``(x,y)``
     * @param x TODO
     * @param y TODO
     * @param value TODO
     */
    //% help=images/set-pixel shim=ImageMethods::setPixel
    setPixel(x: number, y: number, value: boolean): void;

    /**
     * Get the pixel state at position ``(x,y)``
     * @param x TODO
     * @param y TODO
     */
    //% help=images/pixel shim=ImageMethods::pixel
    pixel(x: number, y: number): boolean;

    /**
     * Shows a particular frame of the image strip.
     * @param frame TODO
     */
    //% weight=70 help=images/show-frame shim=ImageMethods::showFrame
    showFrame(frame: number): void;
}


    /**
     * Provides access to basic micro:bit functionality.
     */
    //% color=#0078D7 weight=100
declare namespace basic {

    /**
     * Scroll a number on the screen. If the number fits on the screen (i.e. is a single digit), do not scroll.
     * @param interval speed of scroll; eg: 150, 100, 200, -100
     */
    //% help=basic/show-number
    //% weight=96
    //% blockId=device_show_number block="show|number %number" blockGap=8 icon="\uf1ec"
    //% async interval.defl=150 shim=basic::showNumber
    function showNumber(value: number, interval?: number): void;

    /**
     * Draws an image on the LED screen.
     * @param leds the pattern of LED to turn on/off
     * @param interval time in milliseconds to pause after drawing
     */
    //% help=basic/show-leds 
    //% weight=95 blockGap=8
    //% imageLiteral=1 async
    //% blockId=device_show_leds
    //% block="show leds" icon="\uf00a" interval.defl=400 shim=basic::showLeds
    function showLeds(leds: string, interval?: number): void;

    /**
     * Display text on the display, one character at a time. If the string fits on the screen (i.e. is one letter), does not scroll.
     * @param text the text to scroll on the screen, eg: "Hello!"
     * @param interval how fast to shift characters; eg: 150, 100, 200, -100
     */
    //% help=basic/show-string 
    //% weight=87 blockGap=8
    //% block="show|string %text" icon="\uf031" 
    //% async
    //% blockId=device_print_message interval.defl=150 shim=basic::showString
    function showString(text: string, interval?: number): void;

    /**
     * Turn off all LEDs
     */
    //% help=basic/clear-screen weight=79
    //% blockId=device_clear_display block="clear screen" icon="\uf12d" shim=basic::clearScreen
    function clearScreen(): void;

    /**
     * Shows a sequence of LED screens as an animation.
     * @param leds pattern of LEDs to turn on/off
     * @param interval time in milliseconds between each redraw
     */
    //% help=basic/show-animation imageLiteral=1 async interval.defl=400 shim=basic::showAnimation
    function showAnimation(leds: string, interval?: number): void;

    /**
     * Draws an image on the LED screen.
     * @param leds pattern of LEDs to turn on/off
     */
    //% help=basic/plot-leds weight=80 imageLiteral=1 shim=basic::plotLeds
    function plotLeds(leds: string): void;

    /**
     * Repeats the code forever in the background. On each iteration, allows other codes to run.
     * @param body code to execute
     */
    //% help=basic/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" icon="\uf01e" shim=basic::forever
    function forever(a: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=basic/pause weight=54
    //% async block="pause (ms) %pause"
    //% blockId=device_pause icon="\uf110" shim=basic::pause
    function pause(ms: number): void;
}



    //% color=300 weight=99
declare namespace input {

    /**
     * Do something when a button (``A``, ``B`` or both ``A+B``) is pressed
     * @param button TODO
     * @param body TODO
     */
    //% help=input/on-button-pressed weight=85 blockGap=8
    //% blockId=device_button_event block="on button|%NAME|pressed" icon="\uf192" shim=input::onButtonPressed
    function onButtonPressed(button: Button, body: () => void): void;

    /**
     * Get the button state (pressed or not) for ``A`` and ``B``.
     */
    //% help=input/button-is-pressed weight=57
    //% block="button|%NAME|is pressed"
    //% blockId=device_get_button2
    //% icon="\uf192" blockGap=8 shim=input::buttonIsPressed
    function buttonIsPressed(button: Button): boolean;

    /**
     * Gets the number of milliseconds elapsed since power on.
     */
    //% help=input/running-time weight=50
    //% blockId=device_get_running_time block="running time (ms)" icon="\uf017" shim=input::runningTime
    function runningTime(): number;

    /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate weight=0 shim=input::calibrate
    function calibrate(): void;
}



    //% weight=1 color="#333333"
declare namespace control {

    /**
     * Schedules code that run in the background.
     */
    //% help=control/in-background
    //% blockId="control_in_background" block="run in background" blockGap=8 shim=control::inBackground
    function inBackground(a: () => void): void;

    /**
     * Resets the BBC micro:bit.
     */
    //% weight=30 async help=control/reset
    //% blockId="control_reset" block="reset" shim=control::reset
    function reset(): void;

    /**
     * Raises an event in the event bus.
     * @param src ID of the MicroBit Component that generated the event e.g. MICROBIT_ID_BUTTON_A.
     * @param value Component specific code indicating the cause of the event.
     * @param mode optional definition of how the event should be processed after construction (default is CREATE_AND_FIRE).
     */
    //% weight=21 blockGap=12 blockId="control_raise_event" block="raise event|from source %src=control_event_source_id|with value %value=control_event_value_id" blockExternalInputs=1
    //% mode.defl=1 shim=control::raiseEvent
    function raiseEvent(src: number, value: number, mode?: EventCreationMode): void;

    /**
     * Raises an event in the event bus.
     */
    //% weight=20 blockGap=8 blockId="control_on_event" block="on event|from %src=control_event_source_id|with value %value=control_event_value_id" 
    //% blockExternalInputs=1 shim=control::onEvent
    function onEvent(src: number, value: number, handler: () => void): void;

    /**
     * Gets the value of the last event executed on the bus
     */
    //% blockId=control_event_value" block="event value"
    //% weight=18 shim=control::eventValue
    function eventValue(): number;

    /**
     * Gets the timestamp of the last event executed on the bus
     */
    //% blockId=control_event_timestamp" block="event timestamp"
    //% weight=19 blockGap=8 shim=control::eventTimestamp
    function eventTimestamp(): number;

    /**
     * Gets a friendly name for the device derived from the its serial number
     */
    //% blockId="control_device_name" block="device name" weight=10 blockGap=8 shim=control::deviceName
    function deviceName(): string;

    /**
     * Derive a unique, consistent serial number of this device from internal data.
     */
    //% blockId="control_device_serial_number" block="device serial number" weight=9 shim=control::deviceSerialNumber
    function deviceSerialNumber(): number;
}



    //% color=3 weight=35
declare namespace led {

    /**
     * Turn on the specified LED using x, y coordinates (x is horizontal, y is vertical). (0,0) is upper left.
     * @param x TODO
     * @param y TODO
     */
    //% help=led/plot weight=78
    //% blockId=device_plot block="plot|x %x|y %y" icon="\uf205" blockGap=8 shim=led::plot
    function plot(x: number, y: number): void;

    /**
     * Turn off the specified LED using x, y coordinates (x is horizontal, y is vertical). (0,0) is upper left.
     * @param x TODO
     * @param y TODO
     */
    //% help=led/unplot weight=77
    //% blockId=device_unplot block="unplot|x %x|y %y" icon="\uf204" blockGap=8 shim=led::unplot
    function unplot(x: number, y: number): void;

    /**
     * Get the on/off state of the specified LED using x, y coordinates. (0,0) is upper left.
     * @param x TODO
     * @param y TODO
     */
    //% help=led/point weight=76
    //% blockId=device_point block="point|x %x|y %y" icon="\uf10c" shim=led::point
    function point(x: number, y: number): boolean;

    /**
     * Get the screen brightness from 0 (off) to 255 (full bright).
     */
    //% help=led/brightness weight=60
    //% blockId=device_get_brightness block="brightness" icon="\uf042" blockGap=8 shim=led::brightness
    function brightness(): number;

    /**
     * Set the screen brightness from 0 (off) to 255 (full bright).
     * @param value the brightness value, eg:255, 127, 0
     */
    //% help=led/set-brightness weight=59
    //% blockId=device_set_brightness block="set brightness %value" icon="\uf042" shim=led::setBrightness
    function setBrightness(value: number): void;

    /**
     * Cancels the current animation and clears other pending animations.
     */
    //% weight=50 help=led/stop-animation
    //% blockId=device_stop_animation block="stop animation" icon="\uf04d" shim=led::stopAnimation
    function stopAnimation(): void;

    /**
     * Sets the display mode between black and white and greyscale for rendering LEDs.
     * @param mode TODO
     */
    //% weight=1 help=/led/set-display-mode shim=led::setDisplayMode
    function setDisplayMode(mode: DisplayMode): void;

    /**
     * Takes a screenshot of the LED screen and returns an image.
     */
    //% help=led/screenshot shim=led::screenshot
    function screenshot(): Image;
}



    //% color=351 weight=30
declare namespace pins {

    /**
     * Create a new zero-initialized buffer.
     * @param size number of bytes in the buffer
     */
    //% shim=pins::createBuffer
    function createBuffer(size: number): Buffer;

    /**
     * Read `size` bytes from a 7-bit I2C `address`.
     */
    //% repeat.defl=0 shim=pins::i2cReadBuffer
    function i2cReadBuffer(address: number, size: number, repeat?: boolean): Buffer;

    /**
     * Write bytes to a 7-bit I2C `address`.
     */
    //% repeat.defl=0 shim=pins::i2cWriteBuffer
    function i2cWriteBuffer(address: number, buf: Buffer, repeat?: boolean): void;
}



    //% weight=2 color=30
declare namespace serial {

    /**
     * Reads a line of text from the serial port.
     */
    //% help=serial/read-line
    //% blockId=serial_read_line block="serial read line"
    //% weight=20 shim=serial::readLine
    function readLine(): string;

    /**
     * Sends a piece of text through Serial connection.
     */
    //% help=serial/write-string
    //% weight=87
    //% blockId=serial_writestring block="serial write string %text" shim=serial::writeString
    function writeString(text: string): void;

    /**
     * Dynamically configuring the serial instance to use pins other than USBTX and USBRX.
     * @param tx the new transmission pins
     * @param rx the new reception pin
     * @param baud the new baud rate. eg: 115200
     */
    //% weight=10
    //% help=serial/redirect
    //% blockId=serial_redirect block="serial redirect to|TX %tx|RX %rx|at baud rate %rate"
    //% blockExternalInputs=1 shim=serial::redirect
    function redirect(tx: SerialPin, rx: SerialPin, rate: BaudRate): void;
}



    //% indexerGet=BufferMethods::getByte indexerSet=BufferMethods::setByte
declare interface Buffer {
    /**
     * Write a number in specified format in the buffer.
     */
    //% shim=BufferMethods::setNumber
    setNumber(format: NumberFormat, offset: number, value: number): void;

    /**
     * Read a number in specified format from the buffer.
     */
    //% shim=BufferMethods::getNumber
    getNumber(format: NumberFormat, offset: number): number;

    /** Returns the length of a Buffer object. */
    //% property shim=BufferMethods::length
    length: number;

    /**
     * Fill (a fragment) of the buffer with given value.
     */
    //% offset.defl=0 length.defl=-1 shim=BufferMethods::fill
    fill(value: number, offset?: number, length?: number): void;

    /**
     * Return a copy of a fragment of a buffer.
     */
    //% offset.defl=0 length.defl=-1 shim=BufferMethods::slice
    slice(offset?: number, length?: number): Buffer;

    /**
     * Shift buffer left in place, with zero padding.
     * @param offset number of bytes to shift; use negative value to shift right
     */
    //% shim=BufferMethods::shift
    shift(offset: number): void;

    /**
     * Rotate buffer left in place.
     * @param offset number of bytes to shift; use negative value to shift right
     */
    //% shim=BufferMethods::rotate
    rotate(offset: number): void;

    /**
     * Write contents of `src` at `dstOffset` in current buffer.
     */
    //% shim=BufferMethods::write
    write(dstOffset: number, src: Buffer): void;
}

// Auto-generated. Do not edit. Really.