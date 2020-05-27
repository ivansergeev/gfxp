# GFXP

GFXP is a small library with a collection of patterns for Playdate. Includes a visual editor for modern browsers (no internet required) for quickly creating and using patterns.

- Draw something in the visual editor and see the finished pattern
- Copy the pattern in any code format or download PNG (for design or programming)
- Easy! Simply! Magic!

### Using GFXP Editor

Open gfxp-editor.html from the 'Tools' folder in any modern browser.


### Using GFXP lib

Before you begin, you must import the lib into the source folder of your project.

```sh
import 'helpers/gfxp'
```


### Use cases GFXP lib

The library includes 100 ready-made patterns, for the use of which it is enough to indicate their name.

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
----

The MIT License (MIT)

