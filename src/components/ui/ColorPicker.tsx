
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-8 h-8 rounded border border-input flex-shrink-0"
            style={{ backgroundColor: color }}
            aria-label="Pick a color"
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <HexColorPicker color={color} onChange={onChange} />
        </PopoverContent>
      </Popover>
      <Input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono"
      />
    </div>
  );
};

export default ColorPicker;
