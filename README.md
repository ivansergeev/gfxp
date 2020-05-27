# GFXP

GFXP is a small library with a collection of patterns for Panic Playdate. Includes a visual [GFXP Editor](http://www.ivansergeev.com/gfxp/) for modern browsers (no internet required) for quickly creating and using patterns.

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

Run GFXP.pdx on your Playdate device or in your Playdate Simulator.

Without a device you can view gfxp-demo.gif


### Using GFXP Editor

Online version: [GFXP Editor](http://www.ivansergeev.com/gfxp/)

Local / offline version: open gfxp-editor.html from the 'Tools' folder in any modern browser.


### Using GFXP lib

Before you begin, import 'gfxp.lua' from 'Source/helpers/' folder into the source folder of your project.

```sh
import 'helpers/gfxp'
```


### Use cases GFXP lib

The library includes 100 ready-made patterns. To use any of them, all you need is to indicate its name.

Option 1:

```sh
local gfxp = GFXP

-- in the code, specified pattern name
gfxp.set('gray')

-- or the specified pattern table
gfxp.set({0xE7, 0xDB, 0xBD, 0x7E, 0x7E, 0xBD, 0xDB, 0xE7})

-- or the specified pattern name
playdate.graphics.setPattern(gfxp.gray)
```

Option 2:

```
-- in the code, specified pattern name
GFXP.set('gray')

-- or the specified pattern table
GFXP.set({0xE7, 0xDB, 0xBD, 0x7E, 0x7E, 0xBD, 0xDB, 0xE7})
```

Option 3:

```
playdate.graphics.setPattern(GFXP.gray)	
```


### License

The MIT License (MIT)


### Trademarks

[Playdate](https://play.date/) is a trademark of [Panic](https://panic.com/)
