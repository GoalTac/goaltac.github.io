import { Box } from '@chakra-ui/react';

const Feedback = () => {
  return (
    <div>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdmLoYgC3LQVWWsMzGded-Ur3KBqtRYy5kfZ04fFrioeyMp0g/viewform?embedded=true"
        // frameBorder="0"
        // marginHeight="0"
        // marginWidth="0"
      >
        Loading…
      </iframe>
    </div>
  );
};

export default function FeedbackPage() {
  return (
    <Box width={"100%"} bgColor={"white"}>
      <Feedback />
    </Box>
  );
}
