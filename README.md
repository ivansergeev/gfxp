# GFXP

GFXP is a small library with a collection of patterns for Panic Playdate. Includes a visual [GFXP Editor](https://ivansergeev.com/gfxp/) for modern browsers (no internet required) for quickly creating and using patterns.

- Draw something in the visual editor and see the finished patterns
- Copy the pattern in any code format or download PNG (for design and programming) or share it with your friends
- Easy! Simply! Magic!

### Types of patterns that are included in the GFXP lib

- Grayscale
- Dots
- Flakes
- Crosses
- Vertical Lines
- Horizontal Lines
- Diagonal Lines
- Net
- Bricks
- Tins
- Decor
- Noise
- Emojis
- Misc

### Demo

Build project from "Source" folder and run "GFXP.pdx" on your Playdate device or in your Playdate Simulator.

Without a device you can view gfxp-demo.gif

Or you can view gfxp-demo.gif

### Using GFXP Editor

Online version: [GFXP Editor](https://ivansergeev.com/gfxp/)

Local / offline version: open "index.html" from the "Editor/dist" folder in any modern browser. The folder with images is required.

### Using GFXP lib

! The source code is temporarily closed. You can request it in the Discord.

Before you begin, import 'gfxp.lua' from 'Source/helpers/' folder into the source folder of your project.

Before you begin, import "gfxp.lua" from "Source/lib" folder into the source folder of your project.

```
import 'lib/gfxp'
```

### Use cases GFXP lib

The library includes 117 ready-made patterns. To use any of them, all you need is to indicate its name.

Option 1:

```
    local gfxp = GFXP
```

in the code, specified pattern name

```
    gfxp.set('gray')
```

or the specified pattern table

```
    gfxp.set({0xE7, 0xDB, 0xBD, 0x7E, 0x7E, 0xBD, 0xDB, 0xE7})
```

or the specified pattern name

```
    playdate.graphics.setPattern(gfxp.gray)
```

Option 2:
in the code, specified pattern name

```
    GFXP.set('gray')
```

or the specified pattern table

```
    GFXP.set({0xE7, 0xDB, 0xBD, 0x7E, 0x7E, 0xBD, 0xDB, 0xE7})
```

Option 3:

```
    playdate.graphics.setPattern(GFXP.gray)
```

### Use cases GFXP animation

Class GFXP.animate allows you to create an animation of patterns.

Examples:

```
	import 'lib/gfxp'

	local a = GFXP.animate:new(gfxp.getPatterns(true))

	function playdate.update()
		a:draw()
		playdate.graphics.fillRect(0, 0, 200, 120) -- for example
	end

```

How to use:
Step 1: import lib

```
	import 'lib/gfxp'
	local gfxp = GFXP
```

Step 2: create animation instance
There are two possible uses: animate a single pattern or animate multiple patterns
Multiple patterns:
Usage:

```
	local a = gfxp.animate:new(patterns)
```

or

```
	local a = gfxp.animate:new(patterns, ticks)
```

Options:
patterns = table with patterns, required

```
	patterns = {{0x7F, 0xFF, 0xFF, 0xFF, 0xF7, 0xFF, 0xFF, 0xFF},
				{0x55, 0xAA, 0x55, 0xAA, 0x55, 0xAA, 0x55, 0xAA},
				{0x0, 0x22, 0x0, 0x88, 0x0, 0x22, 0x0, 0x88}}
```

or

```
	patterns = {gfxp.dots4, gfxp.gray, gfxp.darkgray}
```

ticks = the rate of change, int, optional

```
	ticks = 1 -- changes will occur every frame, default option
	ticks = 2 -- changes will occur every second frame
	ticks = 10 -- changes will occur every 10 frame
	-- etc
```

Examples:

```
	local a = gfxp.animate:new(gfxp.getPatterns(true))
```

or

```
	local a = gfxp.animate:new({gfxp.dots4, gfxp.gray, gfxp.darkgray}, 10)
```

Single pattern:
Usage:

```
    local a = gfxp.animate:new(pattern, direction, ticks)
```

Options:
pattern = table with one pattern, required

```
	pattern = {0x0, 0xDF, 0xDF, 0xDF, 0x0, 0xFD, 0xFD, 0xFD}
```

or

```
	pattern = gfxp.bricks1
```

direction = direction of movement of the pattern, string, required

```
	direction = 'up'
	direction = 'right'
	direction = 'down'
	direction = 'left'
```

ticks = the rate of change, int, optional

Examples:

```
	local a = gfxp.animate:new(gfxp.bricks1, 'right', 2)
```

or

```
	local a = gfxp.animate:new({0x0, 0xDF, 0xDF, 0xDF, 0x0, 0xFD, 0xFD, 0xFD}, 'down')
```

Step 3: call when you update and draw some graphics
Usage:

```
	a:draw()
```

Example:

```
	function playdate.update()
		a:draw()
		playdate.graphics.fillRect(0, 0, 200, 120)
	end
```

### License

The MIT License (MIT)

### Trademarks

[Playdate](https://play.date/) is a trademark of [Panic](https://panic.com/)
