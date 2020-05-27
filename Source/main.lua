--[[ 
	Example of use GFXP lib

	Option 1:
		local gfxp = GFXP
		
		-- in the code, specified pattern name
		gfxp.set('gray')
		
		-- or the specified pattern table
		gfxp.set({0xE7, 0xDB, 0xBD, 0x7E, 0x7E, 0xBD, 0xDB, 0xE7})
		
		-- or the specified pattern name
		playdate.graphics.setPattern(gfxp.gray)
		
	Option 2:
		
		-- in the code, specified pattern name
		GFXP.set('gray')
		
		-- or the specified pattern table
		GFXP.set({0xE7, 0xDB, 0xBD, 0x7E, 0x7E, 0xBD, 0xDB, 0xE7})
	
	Option 3:
	
		-- the specified pattern name
		playdate.graphics.setPattern(GFXP.gray)	
	
]]--


import 'CoreLibs/graphics'
import 'CoreLibs/sprites'
import 'CoreLibs/ui'
import 'CoreLibs/ui/gridview'
import 'CoreLibs/utilities/printer'
import 'helpers/gfxp'

local gfx = playdate.graphics
local gfxp = GFXP

local patternviewHeight = 240
local showLabel = true
local patterns = {}
local patternview

function init()

	for key, val in pairs(gfxp) do
		if key ~= 'set' then 
			table.insert(patterns, key)
		end
	end

	table.sort(patterns, function (a,b) return a<b end)

	patternview = playdate.ui.gridview.new(400, 240)
	patternview:setNumberOfRows(#patterns)

	function patternview:drawCell(section, row, column, selected, x, y, width, height)

		gfxp.set(patterns[row])		
		gfx.fillRect(x, y, width, 240)

		if showLabel then
			gfx.setColor(gfx.kColorWhite)
			gfx.fillRoundRect(150, y+5, 100, 30, 10)
			gfx.drawTextInRect(patterns[row], x, y+11, width, height+30, nil, "", kTextAlignment.center)
		end
	end
end

init()

-- Buttons

function playdate.AButtonUp()
	showLabel = not showLabel
end

function playdate.upButtonUp()
	patternview:selectPreviousRow(false)
end

function playdate.downButtonUp()
	patternview:selectNextRow(false)
end

-- Update

function playdate.update()
	gfx.clear()
	patternview:drawInRect(0, 0, 400, patternviewHeight)
	playdate.timer.updateTimers()
end

-- Tips

print('Press the A button to show/hide the pattern label.')
print('Press the Up / Down buttons to navigate.')