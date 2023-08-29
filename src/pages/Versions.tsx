import { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import ReactDom from 'react-dom';

export default function Versions() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('../../README.md')
      .then((res) => res.text())
      .then((text) => {
        const startIndex = text.indexOf('## Versions') + '## Versions'.length;
        setContent(text.substring(startIndex));
      });
  }, []);

  return (
    <Box padding={10}>
      <Heading>Versions</Heading>
      <ReactMarkdown children={content} />
    </Box>
  );
}