# GFXP

GFXP is a small library with a collection of patterns for Panic Playdate console.

Online version: [GFXP Editor](https://dev.crankit.app/tools/gfxp/)

Playdate app: [GFXP Viewer](https://crankit.app/app/1008/gfxp-viewer/), developed by Foster Douglas.

For use in C SDK projects: [C library](https://gist.github.com/aschuhardt/ade117b95bb3f2ca99a608224165d4d4), by Addison Schuhardt.

A GFXP helper class for use with PlaydateKit: [Swift class](https://gist.github.com/mgrider/22044c4f3b05116c8478f038062338c3), by Martin Grider.

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
or the inverted version (with transformation), just add an `i` at the end, for example:
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


Available transformation flags for named patterns:

`i` - Invert

`r` - Random

`t` - Transparency

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
