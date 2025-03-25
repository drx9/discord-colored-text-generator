import { MantineProvider, createTheme } from '@mantine/core';
import ANSIColorGenerator from '@/components/ANSIColorGenerator';

const theme = createTheme({
  
});

export default function Home() {
  return (
    <MantineProvider theme={theme}>
      <ANSIColorGenerator />
    </MantineProvider>
  );
}