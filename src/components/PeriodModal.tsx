import React from 'react'
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import { changePeriod } from "../Events";
import { PeriodDimension } from "@dhis2/analytics";
import { $store } from "../Store";
import { useState } from "react";

const PeriodModal = () => {
  const store = useStore($store)
  const [selectedPeriods, setSelectedPeriods] = useState<any[]>(store.period);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const onOk = () => {
    changePeriod(selectedPeriods);
    onClose()
  };

  const onSelect = ({ items }: any) => {
    setSelectedPeriods(items);
  };
  return (
    <>
      <Box style={{ paddingRight: 10 }}>
        <Button onClick={onOpen}>
          Select period
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Period</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PeriodDimension
              selectedPeriods={selectedPeriods}
              onSelect={onSelect}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={() => onOk()}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PeriodModal
