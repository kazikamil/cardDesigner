import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor, setF, setSize, setTxt, setWeight } from "./Store/features/textSlice";
import { ChromePicker } from 'react-color';

type FontStyle = [string, string];
interface FontData {
  [key: string]: FontStyle[];
}

const fonts: FontData = {
  "Roboto_Mono": [
    ['100', 'Thin'],
    ['200', 'Extra-light'],
    ['300', 'Light'],
    ['400', 'Regular'],
    ['500', 'Medium'],
    ['600', 'Semi-Bold'],
    ['700', 'Bold'],
  ],
  "Cairo": [
    ['200', 'Extra-light'],
    ['300', 'Light'],
    ['400', 'Regular'],
    ['500', 'Medium'],
    ['600', 'Semi-Bold'],
    ['700', 'Bold'],
    ['800', 'Extra-Bold'],
    ['900', 'Black'],
  ],
};
const zplFonts = {
  A: "Arial, sans-serif",
  B: "'Courier New', monospace",
  C: "'Times New Roman', serif",
  D: "Helvetica, sans-serif",
  E: "Verdana, sans-serif",
  F: "Courier, monospace",
  G: "'Lucida Console', monospace",
  H: "Calibri, sans-serif"
};
const Ttool: React.FC = () => {
  const color = useSelector((state: any) => state.text.color);
  const text = useSelector((state: any) => state.text.text);
  const font = useSelector((state: any) => state.text.font);
  const size = useSelector((state: any) => state.text.size);
  const [fontKey, setFontKey] = useState<string>('');
  const [weights, setWeights] = useState<FontStyle[]>([]);
  const [display, setDisplay] = useState<string>('hidden');
  const dispatch = useDispatch();

  useEffect(() => {
    const newFontKey = font.replace(/ /g, "_");
    setFontKey(newFontKey);
  }, [font]);

  useEffect(() => {
    if (fontKey) {
      setWeights(fonts[fontKey] || []);
    }
  }, [fontKey]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTxt(event.target.value));
  };

  const handleP = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSize(event.target.value));
  };

  const handleF = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setF(event.target.value));
  };

  const handleC = () => {
    setDisplay(display === 'hidden' ? '' : 'hidden');
  };

  const handleCo = (newC: any) => {
    dispatch(setColor(newC.hex));
  };

  const handleW = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setWeight(event.target.value));
  };

  return (
    <form className="w-full h-full flex justify-center">
      <div className="flex items-center border-b border-slate-500 w-50 m-1 mr-10">
        <input
          value={text}
          onChange={handleChange}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="text"
          aria-label="Full name"
        />
      </div>
      <div className="flex items-center border-b border-slate-500 w-20 m-1 mr-10">
        <input
          onChange={handleP}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="number"
          placeholder={size+'px'}
          aria-label="Full name"
        />
      </div>
      <select
        onChange={handleF}
        className="block appearance-none w-30 border-b border-slate-500 hover:border-gray-500 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline m-1"
      >
        <option value="Arial, sans-serif">Zebra A</option>
        <option value="'Courier New', monospace">Zebra B</option>
        <option value="'Times New Roman', serif">Zebra C</option>
        <option value="Helvetica, sans-serif">Zebra D</option>
        <option value="Verdana, sans-serif">Zebra E</option>
        <option value="Courier, monospace">Zebra F</option>
        <option value="'Lucida Console', monospace">Zebra G</option>
        <option value="Calibri, sans-serif">Zebra H</option>
      </select>
      <div className="inline-block relative w-30">
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {/*<select
        onChange={handleW}
        className="block ml-10 appearance-none w-30 border-b border-slate-500 hover:border-gray-500 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline m-1"
      >
        {weights.map(([weight, label], index) => (
          <option key={index} value={weight}>
            {label}
          </option>
        ))}
      </select>*/}
      <div className="inline-block relative w-30">
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center mt-1.5 h-5 w-5 w-50 ml-10">
        <div
          onClick={handleC}
          className="h-5 w-5"
          style={{
            backgroundColor: color === '#ffffff' ? 'black' : color,
            border: 'solid',
            borderColor: 'black',
            borderWidth: '1px'
          }}
        />
        <ChromePicker
          onChange={handleCo}
          color={color}
          className={display === 'hidden' ? 'hidden' : 'chrome'}
        />
      </div>
    </form>
  );
};

export default Ttool;
