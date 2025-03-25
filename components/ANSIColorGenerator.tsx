'use client';

import { useState } from 'react';
import {
  Container,
  Textarea,
  CopyButton,
  Button,
  Title
} from '@mantine/core';
import '@/app/ansi-button-styles.css' 

type ColorItem = {
  code: string;
  color: string;
};

export default function DiscordColorGenerator() {
  const [inputText, setInputText] = useState<string>('');
  const [selectedFg, setSelectedFg] = useState<string | null>(null);
  const [selectedBg, setSelectedBg] = useState<string | null>(null);
  const [activeStyles, setActiveStyles] = useState<string[]>([]);

  const foregroundColors: ColorItem[] = [
    { code: '30', color: '#4f545c' },
    { code: '31', color: '#dc322f' },
    { code: '32', color: '#859900' },
    { code: '33', color: '#b58900' },
    { code: '34', color: '#268bd2' },
    { code: '35', color: '#d33682' },
    { code: '36', color: '#2aa198' },
    { code: '37', color: '#ffffff' }
  ];

  const backgroundColors: ColorItem[] = [
    { code: '40', color: '#002b36' },
    { code: '41', color: '#cb4b16' },
    { code: '42', color: '#586e75' },
    { code: '43', color: '#657b83' },
    { code: '44', color: '#839496' },
    { code: '45', color: '#6c71c4' },
    { code: '46', color: '#93a1a1' },
    { code: '47', color: '#fdf6e3' }
  ];

  const generateAnsiCode = () => {
    const codes: string[] = [];
    
  
    if (activeStyles.includes('Bold')) codes.push('1');
    if (activeStyles.includes('Line')) codes.push('4');
    
    
    if (selectedFg) codes.push(selectedFg);
    
    
    if (selectedBg) codes.push(selectedBg);

    return codes.length > 0 
      ? `\x1b[${codes.join(';')}m${inputText}\x1b[0m`
      : inputText;
  };

  const resetAll = () => {
    setInputText('');
    setSelectedFg(null);
    setSelectedBg(null);
    setActiveStyles([]);
  };

  const toggleStyle = (style: string) => {
    setActiveStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  return (
    <Container 
      style={{ 
        backgroundColor: '#36393f', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <h1 style={{fontWeight:'bold', marginBottom: '50px'}}>Discord <span style={{color:"#5865F2"}}>Colored </span>Text Generator</h1>
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '500px', 
          backgroundColor: '#36393f', 
          borderRadius: '5px' 
        }}
      >
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <Button 
            onClick={resetAll}
            className='btn' 
            style={{ 
              backgroundColor: '#4f545c', 
              color: 'white',
              textTransform: 'uppercase',
              height: '30px',
              marginLeft:'40px'
      
            }}
          >
            Reset All
          </Button>
            <Button 
              onClick={() => toggleStyle('Bold')}
              className='btn' 
              style={{ 
                backgroundColor: activeStyles.includes('Bold') ? '#7289da' : '#4f545c', 
                color: 'white',
                textTransform: 'uppercase',
                height: '30px',
                width:"60px",
                marginLeft: "20px"
              }}
            >
              Bold
            </Button>
            <Button 
              onClick={() => toggleStyle('Line')} 
              className='btn'
              style={{ 
                backgroundColor: activeStyles.includes('Line') ? '#7289da' : '#4f545c', 
                color: 'white',
                textTransform: 'uppercase',
                height: '30px',
                width:"60px",
                marginLeft:"15px"
              }}
            >
              Line
            </Button>
          </div>
        

        <div style={{ display: 'flex', marginBottom: '10px',}}>
          {foregroundColors.map((color) => (
            <button
              key={color.code}
              data-ansi={color.code}
              className={`style-button ansi-${color.code}-bg ${selectedFg === color.code ? 'active' : ''}`}
              onClick={() => setSelectedFg(color.code)}
            >
              &nbsp;
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', marginBottom: '10px' }}>
          {backgroundColors.map((color) => (
            <button
              key={color.code}
              data-ansi={color.code}
              className={`style-button ansi-${color.code}-bg ${selectedBg === color.code ? 'active' : ''}`}
              onClick={() => setSelectedBg(color.code)}
            >
              &nbsp;
            </button>
          ))}
        </div>

        <Textarea
          className='text-area'
          value={inputText}
          onChange={(e) => setInputText(e.currentTarget.value)}
          placeholder="Welcome to Discord Colored Text Generator!"
          minRows={6}
          styles={{
            input: {
              width:'600px',
              height:'200px',
              borderRadius:'5px',
              resize:'both',
              overflow:'auto',
              textAlign:'left',
              fontFamily:'monospace',
              border:'#202225 1px solid',
              padding:'5px',
              display:'inline-block',
              whiteSpace: 'pre-wrap',
              fontSizeAdjust:'0.875rem',
              lineHeight:'1.125rem',
              textIndent:'0',
              backgroundColor: '#2F3136',
              color: '#B9BBBE',
              fontSize: '16px'
            }
          }}
        />

        <CopyButton value={generateAnsiCode()}>
          {({ copied, copy }) => (
            <Button
              fullWidth
              onClick={copy}
              style={{
                backgroundColor: copied ? '#3aa370' : '#43b581',
                color: 'white',
                padding:'2px 16px',
                borderRadius:'5px',
                border:'none',
                textTransform: 'uppercase',
                marginTop: '10px',
                height: '40px'
              }}
            >
              {copied ? 'Copied!' : 'Copy text as Discord formatted'}
            </Button>
          )}
        </CopyButton>

        <div 
          style={{ 
            textAlign: 'center', 
            marginTop: '10px',
            color: '#b9bbbe',
            fontSize: '12px'
          }}
        >
          This is an unofficial tool, it is not made or endorsed by Discord.
        </div>
      </div>
    </Container>
  );
}