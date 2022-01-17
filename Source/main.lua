import 'CoreLibs/graphics'
import 'lib/gfxp'

local gfx <const> = playdate.graphics
local gfxp <const> = GFXP

-- Some use cases of the patterns
function playdate.update()

	-- Pattern by name
		gfxp.set('wave-2')

	-- Inverted pattern by name
	-- gfxp.set('wave-2i')

	-- Custom pattern
	-- gfxp.set({0xff, 0xe7, 0xc3, 0x99, 0x99, 0xc3, 0xe7, 0xff})

	-- Custom pattern w/mask
	-- gfxp.set({0x5F, 0xEE, 0x77, 0xBB, 0xDD, 0xEE, 0xF5, 0xBB, 160, 17, 136, 68, 34, 17, 10, 68})

	gfx.fillCircleAtPoint(200, 120, 100)
end
