import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  IconButton,
  ScaleFade,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
  Image,
} from '@chakra-ui/react';
import _ from 'lodash';
import { memo, useState } from 'react';
import { useTaskDragAndDrop } from './hooks/useTaskDragAndDrop';
import { TaskModel } from './utils/models';
import { AutoResizeTextarea } from './AutoResizeTextArea';
import { FaChargingStation, FaChartArea, FaChartBar, FaChartLine, FaChartPie, FaCheck, FaCheckCircle, FaCheckDouble, FaCheckSquare, FaCheese, FaChess, FaChessBishop, FaEdit, FaTrash } from 'react-icons/fa';

type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel['id'], updatedTask: TaskModel) => void;
  onDelete: (id: TaskModel['id']) => void;
  onDropHover: (i: number, j: number) => void;
};

function Task({
  index,
  task,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
  onDropHover: handleDropHover,
}: TaskProps) {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>(
    { task, index: index },
    handleDropHover,
  );

  const [showPreview, setShowPreview] = useState(false);
  const [showNewType, setShowNewType] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    handleUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    handleDelete(task.id);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handlePreviewClick = () => {
    setShowPreview(!showPreview);
  };

  const handleChangeTypeClick = () => {
    setShowNewType(!showNewType);
  };

  // Define an array of icon components to choose from
  const icons = [FaChargingStation, FaChartArea, FaChartBar, FaChartLine, FaChartPie, FaCheck, FaCheckCircle, FaCheckDouble, FaCheckSquare, FaCheese, FaChess, FaChessBishop];

  // Define a function to choose a random icon from the array
  function getRandomIcon() {
    const randomIndex = Math.floor(Math.random() * icons.length);
    const IconComponent = icons[randomIndex];
    return <IconComponent />;
  }

  // Define a function to toggle the background color of an IconButton
  function handleButtonClick(index: number, setButtonStates: React.Dispatch<React.SetStateAction<boolean[]>>) {
    setButtonStates((prev) => {
      const newButtonStates = [...prev];
      newButtonStates[index] = !newButtonStates[index];
      return newButtonStates;
    });
  }

  // Define an array of boolean state values for each IconButton
  const [buttonStates, setButtonStates] = useState([false, false, false, false]);

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        w={126}
        pl={2}
        pr={7}
        pt={2}
        pb={1}
        boxShadow="xl"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        bgColor={task.color}
        opacity={isDragging ? 0.5 : 1}
      >
        {!showPreview ?
          <AutoResizeTextarea
            value={task.title}
            fontWeight="semibold"
            //cursor="inherit"
            border="none"
            p={0}
            fontSize="10px"
            overflow="hidden"
            resize="none"
            minH={'44px'}
            maxH={200}
            focusBorderColor="none"
            color="gray.700"
            {...(showPreview ? { readOnly: true } : {})}
            onChange={handleTitleChange}
          /> :
          <Box p={0} fontSize="10px" minH={10} noOfLines={3} position={"relative"}>
            <Box style={{ position: "absolute", left: 30, top: 8 }}>
              <FaCheck size={'3em'} color='green' />
            </Box>
            <Text opacity={0.3} color='black'>{task.title}</Text>
          </Box>
        }
        <IconButton
          position="absolute"
          top={0}
          right={0}
          zIndex={100}
          aria-label="delete-task"
          size="xs"
          colorScheme="solid"
          color={'gray.700'}
          icon={<DeleteIcon />}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={handleDeleteClick}
        />
        <IconButton
          position="absolute"
          top={4}
          right={0}
          zIndex={100}
          aria-label="finish-task"
          size="xs"
          colorScheme="solid"
          color="gray.700"
          icon={<FaCheck />}
          fontSize={12}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={handlePreviewClick}
        />
        <IconButton
          position="absolute"
          top={8}
          right={0}
          zIndex={100}
          aria-label="finish-task"
          size="xs"
          colorScheme="solid"
          color="gray.700"
          icon={<FaEdit />}
          fontSize={12}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={handleChangeTypeClick}
        />
        <Modal isOpen={showDeleteModal} onClose={handleDeleteCancel}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Task</ModalHeader>
            <ModalBody>Are you sure you want to delete this task?</ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDeleteConfirm}>
                Delete
              </Button>
              <Button variant="ghost" onClick={handleDeleteCancel}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      {/* Experimental Emoji Task */}
      {showNewType &&
        <><Box mt={1} zIndex={100} w={126} bg={'gray.200'} rounded="lg">
          {[1, 2, 3, 4].map((i) =>
            <IconButton key={i} aria-label={`i`} icon={getRandomIcon()} ml={1} mt={1} mb={1} color={"black"} size={'xs'}
              onClick={() => handleButtonClick(i - 1, setButtonStates)} bg={buttonStates[i - 1] ? 'green.500' : 'gray.50'} />)}
        </Box>
          <Box
            w={126}
            bg="gray.900"
            rounded="lg"
            boxShadow="md"
            mt={1}
          >
            <Flex direction="column" align="center">
              <Text fontWeight="bold" color={'white'}>
                New York City
              </Text>
              <Image src="https://assets.onlinelabels.com/images/clip-art/nicubunu/nicubunu_Weather_Symbols_Cloudy_Day_simple.png" alt="Weather Icon" boxSize={'25px'} />
              <Text fontWeight="bold" color={'white'}>
                20°C
              </Text>
              <Text color="gray.500">
                Partly cloudy
              </Text>
            </Flex>
          </Box>
        </>
      }

    </ScaleFade>
  );
}

export default memo(Task, (prev, next) => {
  if (
    _.isEqual(prev.task, next.task) &&
    _.isEqual(prev.index, next.index) &&
    prev.onDelete === next.onDelete &&
    prev.onDropHover === next.onDropHover &&
    prev.onUpdate === next.onUpdate
  ) {
    return true;
  }

  return false;
});