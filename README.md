# GFXP

GFXP is a small library with a collection of patterns for Panic Playdate console. Includes a visual [GFXP Editor](https://dev.playdate.store/tools/gfxp/) for modern browsers for quickly creating and using patterns.

- Draw something in the visual editor and see the finished patterns
- Copy the pattern in any code format or download PNG (for design and programming) or share it with your friends
- Easy! Simply! Magic!

### Types of patterns that are included in the GFXP lib

- Grayscale
- Dots
- Crosses
- Vertical Lines
- Horizontal Lines
- Diagonal Lines
- Waves
- Grid
- Bricks
- Rects
- Flakes
- Decor
- Noise
- Emojis
- Misc


### Demo

Build project from `Source` folder and run `GFXP.pdx` on your Playdate console or in your Playdate Simulator.


### Using GFXP Editor

Online version: [GFXP Editor](https://dev.playdate.store/tools/gfxp/)


### Using GFXP lib

Before you begin, import `gfxp.lua` from `Source/lib` folder into the source folder of your project.

```
import 'lib/gfxp'
```

It is enough to do this once, for example in `main.lua`


### Use cases GFXP lib

The library includes 136 ready-made patterns (w/o inverted versions). To use any of them, all you need is to indicate its name.
In any file with your code:

###### Option 1:
Declare a local variable
```
local gfxp <const> = GFXP
```
then specify the name of the pattern
```
gfxp.set('gray')
```
or
```
gfxp.set('dot-1')
```
or the inverted version, just add an `i` at the end, for example:
```
gfxp.set('dot-1i')
```
or a custom pattern table
```
gfxp.set({0x55, 0xAA, 0x55, 0xAA, 0x55, 0xAA, 0x55, 0xAA})
```
or with mask
```
gfxp.set({0x55, 0xAA, 0x55, 0xAA, 0x55, 0xAA, 0x55, 0xAA, 170, 85, 170, 85, 170, 85, 170, 85})
```


###### Option 2: set only
Declare a local variable
```
local gfxp <const> = GFXP.set
```
then specify the name of the pattern
```
gfxp('dot-1')
```
or a custom pattern table
```
gfxp({0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF})
```

###### Option 3: lib only
Declare a local variable
```
local gfxpLib <const> = GFXP.lib
```
then specify the name of the pattern
```
playdate.graphics.setPattern(gfxpLib.gray)
```
or
```
playdate.graphics.setPattern(gfxpLib['dot-1'])
```


### License

The MIT License (MIT)

### Trademarks

[Playdate](https://play.date/) is a trademark of [Panic](https://panic.com/)
