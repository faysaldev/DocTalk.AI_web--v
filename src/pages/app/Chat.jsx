import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaBookOpen, FaPaperPlane } from "react-icons/fa";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { cn } from "../../utils/cn";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AnimatedText from "../../components/AnimatedText";

const Chat = () => {
  const { subjects } = useSelector((state) => state.subjects);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  const [inputMessage, setInputMessage] = useState("");
  const axiosSecure = useAxiosSecure();

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      content:
        "Welcome to DocTalk! Select a subject and ask a question to get started.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!selectedSubject || !inputMessage.trim()) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const requestBody = {
        query: inputMessage || "", // Default to an empty string if not provided
        category: selectedSubject || "", // Default to an empty string if not provided
      };
      const res = await axiosSecure.post(
        `/api/documents/search-doctalk`,
        requestBody
      );
      if (res?.data) {
        const content  = res?.data?.data?.teaching_response;
        console.log(content, "msg response data");
        // const selectedSubjectName = subjects.find(s => s.name === selectedSubject)?.name || "Unknown";

        const botMessage = {
          id: `bot-${Date.now()}`,
          content: content,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e.message);
    }

    // Simulate AI response after a delay
    // setTimeout(() => {

    //   const botMessage = {
    //     id: `bot-${Date.now()}`,
    //     content: getMockResponse(inputMessage, selectedSubjectName),
    //     sender: "bot",
    //     timestamp: new Date(),
    //   };

    // }, 1500);
  };



  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">AI Chat</h1>
        <select
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="w-[200px] h-10 rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  )}
                >

                                         


                       <AnimatedText
                        text={message.content}
                        className="text-md break-words whitespace-pre-wrap"
                        setIsWriting={setIsWriting}
                      />

      
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100">
                  <div className="flex space-x-2 items-center">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask about your ${selectedSubject} documents...`}
              disabled={isLoading || !selectedSubject}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading || !selectedSubject || !inputMessage.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
            >
              <FaPaperPlane className="h-4 w-4" />
            </Button>
          </div>
          {!selectedSubject && (
            <p className="text-sm text-amber-600 mt-2 flex items-center">
              <FaBookOpen className="h-3 w-3 mr-1" />
              Please select a subject to start chatting
            </p>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Chat;


  // const getMockResponse = (question, subjectName) => {
  //   // Mock responses based on the question and subject
  //   if (
  //     question.toLowerCase().includes("definition") ||
  //     question.toLowerCase().includes("what is")
  //   ) {
  //     return `Based on your ${subjectName} documents, ${question.replace(
  //       "?",
  //       ""
  //     )} refers to a fundamental concept that's covered in chapter 3 of your uploaded materials. The documents describe it as a key principle that helps explain the relationship between different elements in the subject.`;
  //   }

  //   if (
  //     question.toLowerCase().includes("example") ||
  //     question.toLowerCase().includes("instance")
  //   ) {
  //     return `Looking at your ${subjectName} documents, I found several examples. One notable example shown on page 42 demonstrates how this concept is applied in practical scenarios. The example walks through the process step-by-step and includes a detailed explanation of each stage.`;
  //   }

  //   if (
  //     question.toLowerCase().includes("difference") ||
  //     question.toLowerCase().includes("compare")
  //   ) {
  //     return `According to your ${subjectName} documents, there are several key differences to note. The first material highlights that X is characterized by A, B, and C, while Y differs in that it focuses on D, E, and F. Your lecture notes from last month provide additional context on page 7, explaining how these differences manifest in practical applications.`;
  //   }

  //   return `Based on the documents you've uploaded for ${subjectName}, I can see that your question touches on topics covered in several materials. The main textbook explores this concept in chapter 4, while your lecture notes provide additional context. In summary, the key points are: (1) This concept is fundamental to understanding the broader subject area, (2) It relates to several other important principles discussed in your materials, and (3) Recent research has expanded our understanding of how it applies in various contexts.`;
  // };