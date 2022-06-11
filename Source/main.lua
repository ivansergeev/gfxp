import 'CoreLibs/graphics'
import 'lib/gfxp'

local gfx <const> = playdate.graphics
local gfxp <const> = GFXP


-- Some use cases

-- Pattern by name
gfxp.set('emoji-smile')

-- Inverted pattern by name
-- gfxp.set('wave-2i')

-- Random pattern
-- gfxp.set('white-r')

-- Inverted pattern with transparency
-- gfxp.set('vline-2it')

-- Pattern with transparency	
-- gfxp.set('dline-1t')

-- Custom pattern
-- gfxp.set({0xff, 0xe7, 0xc3, 0x99, 0x99, 0xc3, 0xe7, 0xff})

-- Custom pattern w/mask
-- gfxp.set({0x5F, 0xEE, 0x77, 0xBB, 0xDD, 0xEE, 0xF5, 0xBB, 160, 17, 136, 68, 34, 17, 10, 68})

gfx.fillCircleAtPoint(250, 120, 100)

gfxp.set('dline-1t')
gfx.fillCircleAtPoint(150, 120, 100)

function playdate.update() end