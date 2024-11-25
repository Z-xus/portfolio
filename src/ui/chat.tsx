import React from 'react';
import { ArrowUp, Bot, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

// Define the types for the props
interface AnimatedChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnimatedChat: React.FC<AnimatedChatProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-4 w-80 z-50"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 animate-pulse rounded-full" />
                  <h3 className="font-semibold">Nauf Support</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center my-8">
                <Bot className="mx-auto h-12 w-12 mb-4" />
                <p className="text-sm text-gray-600">Send a message to start the chat!</p>
                <p className="text-xs text-gray-500 mt-2">
                  You can ask the bot anything about me and it will help to find the relevant information!
                </p>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Ask something..." />
                <Button variant="secondary" size="icon">
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Define the types for CollapsedChat props
interface CollapsedChatProps {
  onClick: () => void;
}

const CollapsedChat: React.FC<CollapsedChatProps> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Button
        variant="ghost"
        className="w-full max-w-[280px] bg-background border rounded-md p-3 flex items-center gap-2 hover:bg-accent"
        onClick={onClick}
      >
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 bg-green-500 animate-pulse rounded-full" />
          <span className="font-medium">Nauf Support</span>
        </div>
        <div className="ml-auto">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-muted-foreground"
          >
            <path
              d="M2.10317 4.06641L6.00017 7.96341L9.89717 4.06641L10.6042 4.77341L6.00017 9.37741L1.39617 4.77341L2.10317 4.06641Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </Button>
    </motion.div>
  );
};

export { AnimatedChat, CollapsedChat };
